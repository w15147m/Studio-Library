import React from 'react';
import ReactSelect from 'react-select';

const Select = ({
    options,
    value,
    onChange,
    onBlur,
    placeholder = 'Select...',
    isSearchable = true,
    isMulti = false,
    isDisabled = false,
    error = false,
    hint,
    className = '',
    id,
    name,
}) => {
    // Custom styles for react-select to match project's design system
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: '2.75rem', // h-11
            borderRadius: '0.5rem', // rounded-lg
            backgroundColor: 'transparent',
            borderColor: error 
                ? '#EF4444' // border-error-500
                : state.isFocused 
                    ? '#3B82F6' // border-brand-500 (approx)
                    : document.documentElement.classList.contains('dark') ? '#374151' : '#D1D5DB', // border-gray-700 : border-gray-300
            boxShadow: state.isFocused 
                ? error ? '0 0 0 3px rgba(239, 68, 68, 0.2)' : '0 0 0 3px rgba(59, 130, 246, 0.2)'
                : provided.boxShadow,
            '&:hover': {
                borderColor: error ? '#EF4444' : provided.borderColor,
            },
            padding: '0 0.5rem',
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '0.75rem',
            overflow: 'hidden',
            backgroundColor: document.documentElement.classList.contains('dark') ? '#111827' : '#FFFFFF',
            border: '1px solid',
            borderColor: document.documentElement.classList.contains('dark') ? '#1F2937' : '#E5E7EB',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: 9999,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected 
                ? '#3B82F6' 
                : state.isFocused 
                    ? document.documentElement.classList.contains('dark') ? '#1F2937' : '#F3F4F6'
                    : 'transparent',
            color: state.isSelected 
                ? '#FFFFFF' 
                : document.documentElement.classList.contains('dark') ? '#E5E7EB' : '#1F2937',
            cursor: 'pointer',
            padding: '0.625rem 1rem',
            fontSize: '0.875rem',
            '&:active': {
                backgroundColor: '#3B82F6',
                color: '#FFFFFF',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: document.documentElement.classList.contains('dark') ? '#F9FAFB' : '#111827',
            fontSize: '0.875rem',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: document.documentElement.classList.contains('dark') ? '#6B7280' : '#9CA3AF',
            fontSize: '0.875rem',
        }),
        input: (provided) => ({
            ...provided,
            color: document.documentElement.classList.contains('dark') ? '#F9FAFB' : '#111827',
            fontSize: '0.875rem',
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: document.documentElement.classList.contains('dark') ? '#9CA3AF' : '#6B7280',
            '&:hover': {
                color: document.documentElement.classList.contains('dark') ? '#F9FAFB' : '#111827',
            },
        }),
    };

    return (
        <div className={`w-full ${className}`}>
            <ReactSelect
                id={id}
                name={name}
                options={options}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                isSearchable={isSearchable}
                isMulti={isMulti}
                isDisabled={isDisabled}
                styles={customStyles}
            />
            {hint && (
                <p className={`mt-1.5 text-xs ${error ? 'text-error-500' : 'text-gray-500'}`}>
                    {hint}
                </p>
            )}
        </div>
    );
};

export default Select;
