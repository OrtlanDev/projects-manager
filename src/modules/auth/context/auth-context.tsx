import { getUserId } from "@/modules/account/api/load-user-data";
import { API_URL } from "@/modules/core/api/apiConfig";
import axios, { AxiosResponse } from "axios";
import { createContext, useState } from "react";
import { startAutoRefreshToken } from "../hooks/use-auto-refresh-token";

export interface User {
    username: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;

    tokenLogin: (username: string, response: AxiosResponse) => boolean;

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
        const username = storage.getItem("authenticatedUser");
        return username ? { username } : null;
    });

    const tokenLogin = (username: string, response: AxiosResponse): boolean => {
        console.log(response);
        if (isValidUser(response)) {
            updateUserStatus(username, response);
            return true;
        }
        return false;
    };

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const response = await axios.post(`${API_URL}/auth/login/`, { username, password });

            if (isValidUser(response)) {
                updateUserStatus(username, response);
                const id = await getUserId();
                localStorage.setItem("id", id);
                startAutoRefreshToken();

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

    function isValidUser({ data }: AxiosResponse): boolean {
        return Boolean(data?.access && data?.refresh);
    }

    function updateUserStatus(username: string, { data }: AxiosResponse): void {
        const token = data.access;
        const refreshToken = data.refresh;

        setIsAuthenticated(true);
        setUser({ username });

        storage.setItem("accessToken", token);
        storage.setItem("refreshToken", refreshToken);
        storage.setItem("authenticatedUser", username);
        storage.setItem("isAuthenticated", "true");
        storage.removeItem("notVerifiedUser");
    }

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
        storage.removeItem("refreshToken");
        storage.removeItem("token");
        storage.removeItem("id");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, tokenLogin, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };
