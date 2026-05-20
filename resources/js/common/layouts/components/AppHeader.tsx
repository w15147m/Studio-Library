import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "@/common/context/SidebarContext";
import { useTheme } from "@/common/context/ThemeContext";
import { useAuth } from "@/common/context/AuthContext";
import { cdnUrl } from "@/common/config";
import { Dropdown } from "@/common/components/Dropdown";
import { DropdownItem } from "@/common/components/DropdownItem";

const AppHeader = () => {
    const { toggleSidebar, toggleMobileSidebar, isMobileOpen } = useSidebar();
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        if (window.innerWidth >= 1280) {
            toggleSidebar();
        } else {
            toggleMobileSidebar();
        }
    };

    return (
        <header className="sticky top-0 z-40 flex w-full bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900 lg:px-6">
            <div className="flex flex-1 items-center justify-between px-4 py-3 sm:px-6 lg:px-0">
                <div className="flex items-center gap-4">
                    {/* Sidebar Toggle */}
                    <button
                        onClick={handleToggle}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                        {isMobileOpen ? (
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="10" x2="17" y2="10"></line><line x1="3" y1="6" x2="17" y2="6"></line><line x1="3" y1="14" x2="17" y2="14"></line></svg>
                        )}
                    </button>

                    {/* Search Placeholder */}
                    <div className="hidden md:block">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </span>
                            <input
                                type="text"
                                className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400 sm:text-sm"
                                placeholder="Search..."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                        {theme === "dark" ? (
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        ) : (
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                        )}
                    </button>

                    {/* User Profile */}
                    <div className="relative flex items-center gap-3">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="dropdown-toggle flex items-center gap-3 hover:opacity-80 transition-opacity"
                        >
                            <div className="hidden text-right md:block">
                                <span className="block text-sm font-bold text-gray-900 dark:text-white">
                                    {user?.name || 'Admin User'}
                                </span>
                                <span className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                                    User
                                </span>
                            </div>

                            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-100 dark:border-gray-800 ring-2 ring-gray-50 dark:ring-gray-800/50">
                                <img 
                                    src={(() => {
                                        if (!user?.image) return "/images/user/owner.jpg";
                                        if (user.image.startsWith('http')) return user.image;
                                        const path = user.image.startsWith('uploads') ? `/storage/${user.image}` : user.image;
                                        return cdnUrl ? `${cdnUrl}/${user.image}` : path;
                                    })()} 
                                    alt="User Avatar"
                                    className="h-full w-full object-cover"
                                    onError={(e) => e.target.src = "/images/user/owner.jpg"}
                                />
                            </div>

                            <svg 
                                className={`hidden fill-current text-gray-400 lg:block transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                width="12" height="12" viewBox="0 0 12 12" fill="none"
                            >
                                <path d="M10.4335 4.10352C10.2812 3.95117 10.043 3.95117 9.89063 4.10352L6 7.99414L2.10938 4.10352C1.95703 3.95117 1.71875 3.95117 1.56641 4.10352C1.41406 4.25586 1.41406 4.49414 1.56641 4.64648L5.72852 8.80859C5.80469 8.88477 5.90234 8.92285 6 8.92285C6.09766 8.92285 6.19531 8.88477 6.27148 8.80859L10.4335 4.64648C10.5858 4.49414 10.5858 4.25586 10.4335 4.10352Z" />
                            </svg>
                        </button>

                        <Dropdown 
                            isOpen={isOpen} 
                            onClose={() => setIsOpen(false)}
                            className="w-60 p-2 mt-4 top-full"
                        >
                            <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-800/50">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name || 'Admin User'}</p>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">{user?.email || 'admin@example.com'}</p>
                            </div>

                            <ul className="mt-2 space-y-1">
                                <li>
                                    <Link 
                                        to="/admin/profile" 
                                        className="flex items-center gap-3.5 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-500 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition-all"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 11a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0H3z" />
                                        </svg>
                                        Edit Profile
                                    </Link>
                                </li>
                            </ul>

                            <button 
                                onClick={() => {
                                    logout();
                                    setIsOpen(false);
                                }}
                                className="mt-2 flex w-full items-center gap-3.5 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 dark:text-gray-300 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-all"
                            >
                                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 0 1 2 2v2h-2V4H5v16h9v-2h2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9z" />
                                </svg>
                                Sign out
                            </button>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
