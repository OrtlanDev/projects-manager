import axios from "axios";
import { createContext, useState } from "react";

export interface User {
    username: string;
    email: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (username: string, email: string, password: string) => Promise<boolean>;
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

    const API_URL = "https://pid-todo-backend.onrender.com/api";

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const response = await axios.post(`${API_URL}/auth/login/`, { username, password });
            const token = response.data.access;
            const refreshToken = response.data.refresh;
            const userData = response.data.user;

            console.log(response);

            if (token) {
                storage.setItem("token", token);
                if (refreshToken) {
                    storage.setItem("refreshToken", refreshToken);
                }

                setIsAuthenticated(true);
                if (userData) {
                    setUser(userData);
                    storage.setItem("authenticatedUser", JSON.stringify(userData));
                }

                storage.setItem("isAuthenticated", "true");
                return true;
            }

            return false;
        } catch (error: unknown) {
            console.error(
                axios.isAxiosError(error)
                    ? `Axios Error in login: ${error.response?.status}, ${JSON.stringify(error.response?.data)}`
                    : `Unknown error: ${error}`
            );
            return false;
        }
    };

    const register = async (username: string, email: string, password: string): Promise<boolean> => {
        try {
            const response = await axios.post(`${API_URL}/auth/register/`, {
                username,
                email,
                password,
            });
            const userData = response.data.user;
            storage.setItem("notVerifiedUser", JSON.stringify(userData));
            return true;
        } catch (error: unknown) {
            console.error(
                axios.isAxiosError(error)
                    ? `Axios Error in register: ${error.response?.status}, ${JSON.stringify(error.response?.data)}`
                    : `Unknown error: ${error}`
            );
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        storage.removeItem("isAuthenticated");
        storage.removeItem("authenticatedUser");
        storage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };
