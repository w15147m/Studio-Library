import React from "react";
import AppHeader from "./components/AppHeader";
import AppSidebar from "./components/AppSidebar";
import Backdrop from "./components/Backdrop";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";

interface Props {
    children: React.ReactNode;
}

const LayoutContent: React.FC<Props> = ({ children }) => {
    const { isExpanded, isHovered } = useSidebar();

    return (
        <div className="min-h-screen xl:flex bg-gray-50 dark:bg-gray-950">
            <AppSidebar />
            <Backdrop />

            <div
                className={`flex flex-1 flex-col transition-all duration-300 ease-in-out 
                    ${isExpanded || isHovered ? "lg:ml-[280px]" : "lg:ml-[80px]"}`}
            >
                <AppHeader />
                <main className="p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

const AppLayout: React.FC<Props> = ({ children }) => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <SidebarProvider>
                    <LayoutContent>{children}</LayoutContent>
                </SidebarProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default AppLayout;
