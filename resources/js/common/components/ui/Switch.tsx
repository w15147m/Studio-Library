import React from 'react';

const Switch = ({ checked, onChange, id, name, label, disabled = false }) => {
    return (
        <div className="flex items-center justify-between w-full gap-3">
            {label && (
                <span className="text-sm font-medium text-gray-800 dark:text-white/90 whitespace-nowrap">
                    {label}
                </span>
            )}
            <label className="relative inline-block w-[2.4em] h-[1.4em] text-[15px] cursor-pointer">
                <input
                    type="checkbox"
                    id={id}
                    name={name}
                    checked={checked}
                    onChange={(e) => !disabled && onChange(e)}
                    className="sr-only peer"
                    disabled={disabled}
                />
                <span className={`absolute inset-0 rounded-[50px] transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] 
                    bg-[#9fccfa] peer-checked:bg-[#0974f1]
                    before:absolute before:content-[''] before:flex before:items-center before:justify-center before:h-[1.4em] before:w-[1.4em] before:inset-0 before:bg-white before:rounded-[50px] before:shadow-[0_2px_5px_rgba(0,0,0,0.2)] before:transition-all before:duration-400 before:ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                    peer-checked:before:translate-x-[1em]`}>
                </span>
            </label>
        </div>
    );
};

export default Switch;
