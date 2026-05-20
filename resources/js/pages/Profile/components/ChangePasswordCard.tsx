import React, { useState } from 'react';
import { useAuth } from '@/common/context/AuthContext';
import api from '@/common/services/api.service';

// Eye icon SVGs
const EyeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const EyeSlashIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
);

const ChangePasswordCard = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [errors, setErrors] = useState({});
    const [show, setShow] = useState({ currentPassword: false, newPassword: false, newPasswordConfirmation: false });
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
    });

    const toggleShow = (field) => setShow(prev => ({ ...prev, [field]: !prev[field] }));

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const errs = {};
        if (!form.currentPassword) errs.currentPassword = 'Current password is required.';
        if (!form.newPassword) errs.newPassword = 'New password is required.';
        else if (form.newPassword.length < 8) errs.newPassword = 'Password must be at least 8 characters.';
        if (form.newPassword !== form.newPasswordConfirmation)
            errs.newPasswordConfirmation = 'Passwords do not match.';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setLoading(true);
        setErrors({});
        try {
            await api.post('/profile/password', {
                current_password: form.currentPassword,
                password: form.newPassword,
                password_confirmation: form.newPasswordConfirmation,
            });
            setSuccess('Password updated successfully!');
            setForm({ currentPassword: '', newPassword: '', newPasswordConfirmation: '' });
            setIsOpen(false);
            setTimeout(() => setSuccess(''), 4000);
        } catch (err) {
            if (err.response?.data?.errors) {
                const apiErrors = {};
                const e = err.response.data.errors;
                if (e.current_password) apiErrors.currentPassword = e.current_password[0];
                if (e.password) apiErrors.newPassword = e.password[0];
                setErrors(apiErrors);
            } else {
                setErrors({ currentPassword: 'The current password is incorrect.' });
            }
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (field) =>
        `w-full px-4 py-3 rounded-xl border ${errors[field] ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors text-sm`;

    return (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Security</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage your password.</p>
                </div>
                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Change Password
                    </button>
                )}
            </div>

            {/* Success */}
            {success && (
                <div className="mx-6 mt-4 flex items-center gap-2 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 px-4 py-3 text-sm font-semibold text-teal-700 dark:text-teal-400">
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {success}
                </div>
            )}

            {isOpen ? (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Current Password */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Current Password</label>
                        <div className="relative">
                            <input type={show.currentPassword ? 'text' : 'password'} name="currentPassword" value={form.currentPassword} onChange={handleChange} placeholder="Enter current password" className={`${inputClass('currentPassword')} pr-11`} />
                            <button type="button" onClick={() => toggleShow('currentPassword')} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                {show.currentPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </button>
                        </div>
                        {errors.currentPassword && <p className="mt-1 text-xs text-red-500">{errors.currentPassword}</p>}
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">New Password</label>
                        <div className="relative">
                            <input type={show.newPassword ? 'text' : 'password'} name="newPassword" value={form.newPassword} onChange={handleChange} placeholder="Minimum 8 characters" className={`${inputClass('newPassword')} pr-11`} />
                            <button type="button" onClick={() => toggleShow('newPassword')} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                {show.newPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </button>
                        </div>
                        {errors.newPassword && <p className="mt-1 text-xs text-red-500">{errors.newPassword}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">Confirm New Password</label>
                        <div className="relative">
                            <input type={show.newPasswordConfirmation ? 'text' : 'password'} name="newPasswordConfirmation" value={form.newPasswordConfirmation} onChange={handleChange} placeholder="Re-enter new password" className={`${inputClass('newPasswordConfirmation')} pr-11`} />
                            <button type="button" onClick={() => toggleShow('newPasswordConfirmation')} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                {show.newPasswordConfirmation ? <EyeSlashIcon /> : <EyeIcon />}
                            </button>
                        </div>
                        {errors.newPasswordConfirmation && <p className="mt-1 text-xs text-red-500">{errors.newPasswordConfirmation}</p>}
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <button type="submit" disabled={loading}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold transition-all active:scale-95 shadow-sm disabled:opacity-60">
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                        <button type="button" onClick={() => { setIsOpen(false); setErrors({}); }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95">
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="px-6 py-5 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Password is set. Click "Change Password" to update it.
                </div>
            )}
        </div>
    );
};

export default ChangePasswordCard;
