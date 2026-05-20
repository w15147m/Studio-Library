import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSidebar } from "@/common/context/SidebarContext";
import { GridIcon, CalenderIcon, UserCircleIcon, ListIcon, TableIcon, PageIcon, ChevronDownIcon, HorizontaLDots, BoxIcon } from "@/common/components/Icons";

const AppSidebar = () => {
    const { isExpanded, isHovered, setIsHovered, isMobileOpen, openSubmenu, toggleSubmenu } = useSidebar();

    const navItems = [
        // { name: "Dashboard", icon: <GridIcon className="h-5 w-5" />, path: "/admin" },
        { 
            name: "Videos", 
            icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            ), 
            path: "/admin" 
        },
        { 
            name: "Audios", 
            icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
            ), 
            path: "/admin/audios" 
        },

        { name: "Products", icon: <BoxIcon className="h-5 w-5" />, path: "/admin/products" },
        { name: "Catalog", icon: <TableIcon className="h-5 w-5" />, path: "/admin/catalog" },
        { name: "Hero Slider", icon: <PageIcon className="h-5 w-5" />, path: "/admin/hero-slider" },
    ];

    return (
        <aside
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900
                ${isExpanded || isHovered ? "w-[280px]" : "w-[80px]"}
                ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0`}
        >
            {/* Sidebar Header (Logo) */}
            <div className={`flex h-20 items-center px-6 ${!isExpanded && !isHovered ? "justify-center" : "justify-start"}`}>
                <Link to="/admin" className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white font-bold">
                        P
                    </div>
                    {(isExpanded || isHovered) && (
                        <span className="text-xl font-bold text-gray-900 dark:text-white">PrintDesign</span>
                    )}
                </Link>
            </div>

            {/* Sidebar Navigation */}
            <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4 no-scrollbar">
                <nav className="flex flex-col gap-2">
                    <div className={`mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400 ${!isExpanded && !isHovered ? "text-center" : ""}`}>
                        {isExpanded || isHovered ? "Menu" : <HorizontaLDots className="h-4 w-4 mx-auto" />}
                    </div>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                                ${!isExpanded && !isHovered ? "justify-center" : "justify-start"}
                                ${isActive ? "bg-gray-100 text-brand-500 dark:bg-gray-800 dark:text-white" : "hover:bg-gray-100 hover:text-brand-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"}`}
                        >
                            {item.icon}
                            {(isExpanded || isHovered) && <span>{item.name}</span>}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Sidebar Footer */}
            {(isExpanded || isHovered) && (
                <div className="border-t border-gray-200 p-4 dark:border-gray-800">
                    <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">Need Help?</h4>
                        <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">Check our documentation for quick start guide.</p>
                    </div>
                </div>
            )}
        </aside>
    );
};

export default AppSidebar;
