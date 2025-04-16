import { createContext, useState } from "react";

export interface User {
    username: string;
    email: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
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

    const [user, setUser] = useState<User | null>(() => {
        const storedUser = storage.getItem("authenticatedUser");
        return storedUser ? JSON.parse(storedUser) : null;
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
                setUser({ username: storedUser.username, email: storedUser.email });
                storage.setItem("isAuthenticated", "true");
                storage.setItem(
                    "authenticatedUser",
                    JSON.stringify({ username: storedUser.username, email: storedUser.email })
                );
                return true;
            }
        }

        if (username === "admin" && password === "1234") {
            const adminUser = { username: "admin", email: "admin@synchrony.dev" };
            setIsAuthenticated(true);
            setUser(adminUser);
            storage.setItem("isAuthenticated", "true");
            storage.setItem("authenticatedUser", JSON.stringify(adminUser));
            return true;
        }

        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        storage.removeItem("isAuthenticated");
        storage.removeItem("authenticatedUser");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };
