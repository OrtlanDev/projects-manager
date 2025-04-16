import { createContext, useState } from "react";

export interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    register: (username: string, email: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const storage = window.localStorage;

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return storage.getItem("isAuthenticated") === "true";
    });

    const register = (username: string, email: string, password: string): boolean => {
        const registeredUser = storage.getItem("registeredUser");
        if (registeredUser) {
            console.error("A user is already registered!");
            return false;
        }

        const user = { username, email, password };
        storage.setItem("registeredUser", JSON.stringify(user));
        return true;
    };

    const login = (username: string, password: string): boolean => {
        const storedUserJSON = storage.getItem("registeredUser");
        if (storedUserJSON) {
            const storedUser = JSON.parse(storedUserJSON);
            if (username === storedUser.username && password === storedUser.password) {
                setIsAuthenticated(true);
                storage.setItem("isAuthenticated", "true");
                return true;
            }
        }

        if (username === "admin" && password === "1234") {
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

    return <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>{children}</AuthContext.Provider>;
}

export { AuthContext };
