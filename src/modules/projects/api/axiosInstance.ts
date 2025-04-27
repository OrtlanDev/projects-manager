import { API_URL } from "@/modules/core/api/apiConfig";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const getTokens = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    return { accessToken, refreshToken };
};

let isTokenRefreshing = false;
let failedRequestsQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
    config: AxiosRequestConfig;
}> = [];

const refreshAccessToken = async () => {
    try {
        const { refreshToken } = getTokens();
        const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
            refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        return accessToken;
    } catch (error) {
        console.error(error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return null;
    }
};

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const { accessToken } = getTokens();
        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isTokenRefreshing) {
                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({
                        resolve,
                        reject,
                        config: originalRequest,
                    });
                });
            }

            isTokenRefreshing = true;

            try {
                const newAccessToken = await refreshAccessToken();

                failedRequestsQueue.forEach((request) => {
                    if (request.config.headers) {
                        request.config.headers.Authorization = `Bearer ${newAccessToken}`;
                    }
                    request.resolve(axiosInstance(request.config));
                });

                failedRequestsQueue = [];

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                failedRequestsQueue.forEach((request) => {
                    request.reject(refreshError);
                });
                failedRequestsQueue = [];
                return Promise.reject(refreshError);
            } finally {
                isTokenRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
