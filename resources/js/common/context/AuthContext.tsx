import React, { createContext, useContext, useState, ReactNode } from 'react';
import { authUser as initialUser, accessToken as initialToken, csrf } from '../config';

interface User {
    id: number | string;
    name: string;
    email: string;
    image?: string;
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User, token: string) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(initialUser);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!initialToken);

    const login = (userData: User, token: string) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('accessToken', token);
        localStorage.setItem('authUser', JSON.stringify(userData));
    };

    const logout = async () => {
        try {
            await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrf || ''
                }
            });
        } catch (e) {
            console.error("Backend logout failed", e);
        }
        
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('authUser');
        window.location.href = '/signin';
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
