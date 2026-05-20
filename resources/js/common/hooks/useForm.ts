import { useState, useCallback } from 'react';


const useForm = (initialValues, schema, onSubmit) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = useCallback(async (name, value) => {
        if (!schema) return;
        try {
            await schema.validateAt(name, { ...values, [name]: value });
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        } catch (err) {
            setErrors((prev) => ({
                ...prev,
                [name]: err.message,
            }));
        }
    }, [schema, values]);

    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        
        setValues((prev) => ({
            ...prev,
            [name]: fieldValue,
        }));

        // Optional: clear error on change
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    }, [errors]);

    const handleBlur = useCallback((e) => {
        const { name, value } = e.target;
        validateField(name, value);
    }, [validateField]);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            if (schema) {
                await schema.validate(values, { abortEarly: false });
            }
            if (onSubmit) {
                await onSubmit(values);
            }
        } catch (err) {
            if (err.inner) {
                const validationErrors = {};
                err.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            } else {
                console.error('Validation unexpected error:', err);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
    }, [initialValues]);

    const setFieldValue = useCallback((name, value) => {
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const setFieldError = useCallback((name, error) => {
        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    }, []);

    return {
        values,
        setValues,
        errors,
        setErrors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        setFieldValue,
        setFieldError,
    };
};

export default useForm;
