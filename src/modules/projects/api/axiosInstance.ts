import { API_URL } from "@/modules/core/api/apiConfig";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

// Helper para obtener tokens
const getTokens = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    return { accessToken, refreshToken };
};

// Variables para manejar el refresco concurrente
let isTokenRefreshing = false;
let failedRequestsQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
    config: AxiosRequestConfig;
}> = [];

// Función de refresco de token
const refreshAccessToken = async () => {
    try {
        const { refreshToken } = getTokens();

        if (!refreshToken) {
            throw new Error("No hay refresh token disponible");
        }

        const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
            refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        return accessToken;
    } catch (error) {
        console.error("Error al refrescar token:", error);
        return null;
    }
};

// Creación de instancia Axios
export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor de solicitudes
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

// Interceptor de respuestas
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Verificar si no hay tokens
        const { accessToken, refreshToken } = getTokens();
        if (!accessToken || !refreshToken) {
            window.location.href = "/login";
            return Promise.reject(error);
        }

        // Manejar error 401
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

                if (!newAccessToken) {
                    throw new Error("Failed to refresh token");
                }

                // Reintentar solicitudes en cola
                failedRequestsQueue.forEach((request) => {
                    if (request.config.headers) {
                        request.config.headers.Authorization = `Bearer ${newAccessToken}`;
                    }
                    request.resolve(axiosInstance(request.config));
                });

                failedRequestsQueue = [];

                // Reintentar solicitud original
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Limpiar cola y tokens
                failedRequestsQueue.forEach((request) => {
                    request.reject(refreshError);
                });
                failedRequestsQueue = [];

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";

                return Promise.reject(refreshError);
            } finally {
                isTokenRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
