import React, { createContext, useContext, useState } from 'react';

type Role = 'user' | 'admin';

interface AuthContextType {
    user: string | null;
    role: Role;
    login: (username: string, role: Role) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [role, setRole] = useState<Role>('user');

    const login = (username: string, role: Role) => {
        setUser(username);
        setRole(role);
    };

    const logout = () => {
        setUser(null);
        setRole('user');
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};