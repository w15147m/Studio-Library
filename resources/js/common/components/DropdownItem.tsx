import React from "react";
// Since we don't have react-router yet, we'll use simple links for now or placeholders
// If the user wants routing later, we can swap this for Link from react-router-dom

export const DropdownItem = ({
    tag = "button",
    href,
    onClick,
    onItemClick,
    baseClassName = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
    className = "",
    children,
}) => {
    const combinedClasses = `${baseClassName} ${className}`.trim();

    const handleClick = (event) => {
        if (tag === "button") {
            event.preventDefault();
        }
        if (onClick) onClick();
        if (onItemClick) onItemClick();
    };

    if (tag === "a" && href) {
        return (
            <a href={href} className={combinedClasses} onClick={handleClick}>
                {children}
            </a>
        );
    }

    return (
        <button onClick={handleClick} className={combinedClasses}>
            {children}
        </button>
    );
};
