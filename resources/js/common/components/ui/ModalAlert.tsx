import React from "react";
import Modal from "./Modal";
import Button from "./Button";
import { 
    InfoIcon, 
    WarningIcon, 
    ErrorIcon, 
    SuccessIcon 
} from "../Icons";

const ModalAlert = ({
    isOpen,
    onClose,
    variant = "info", // success, info, warning, danger
    title,
    message,
    confirmText = "Okay, Got It",
    cancelText = "Cancel",
    onConfirm,
    showCancel = false
}) => {
    const variants = {
        success: {
            icon: <SuccessIcon className="w-10 h-10 text-success-500" />,
            bgColor: "bg-success-50 dark:bg-success-500/10",
            titleColor: "text-gray-800 dark:text-white/90",
            btnVariant: "primary", // Assuming custom success variant or just primary
        },
        info: {
            icon: <InfoIcon className="w-10 h-10 text-blue-500" />,
            bgColor: "bg-blue-50 dark:bg-blue-500/10",
            titleColor: "text-gray-800 dark:text-white/90",
            btnVariant: "primary",
        },
        warning: {
            icon: <WarningIcon className="w-10 h-10 text-warning-500" />,
            bgColor: "bg-warning-50 dark:bg-warning-500/10",
            titleColor: "text-gray-800 dark:text-white/90",
            btnVariant: "warning",
        },
        danger: {
            icon: <ErrorIcon className="w-10 h-10 text-error-500" />,
            bgColor: "bg-error-50 dark:bg-error-500/10",
            titleColor: "text-gray-800 dark:text-white/90",
            btnVariant: "error",
        }
    };

    const currentVariant = variants[variant] || variants.info;

    return (
        <Modal isOpen={isOpen} onClose={onClose} showCloseButton={true} className="max-w-[450px]">
            <div className="flex flex-col items-center p-6 text-center sm:p-10">
                <div className={`flex items-center justify-center w-20 h-20 mb-6 rounded-full ${currentVariant.bgColor}`}>
                    {currentVariant.icon}
                </div>
                
                <h3 className={`mb-3 text-xl font-semibold sm:text-2xl ${currentVariant.titleColor}`}>
                    {title}
                </h3>
                
                <p className="mb-8 text-base text-gray-500 dark:text-gray-400">
                    {message}
                </p>
                
                <div className="flex flex-wrap items-center justify-center w-full gap-3">
                    {showCancel && (
                        <Button 
                            variant="outline" 
                            onClick={onClose}
                            className="flex-1"
                        >
                            {cancelText}
                        </Button>
                    )}
                    <Button 
                        variant={currentVariant.btnVariant} 
                        onClick={() => {
                            if (onConfirm) onConfirm();
                            onClose();
                        }}
                        className={showCancel ? "flex-1" : "px-10"}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalAlert;
