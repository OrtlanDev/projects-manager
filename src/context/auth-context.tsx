import { createContext, useState } from "react";

export interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const USER = "admin";
const PASSWORD = "1234";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const storage = window.localStorage;

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return storage.getItem("isAuthenticated") === "true";
    });

    const login = (username: string, password: string) => {
        if (username === USER && password === PASSWORD) {
            setIsAuthenticated(true);
            storage.setItem("isAuthenticated", "true");
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        storage.removeItem("isAuthenticated");
    };

    return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}

export { AuthContext };
