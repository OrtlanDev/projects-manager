import { useEffect } from "react";
import { refreshAuthToken } from "../services/refresh-token";

export function useAutoRefreshToken() {
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                console.log("Refreshing token...");
                await refreshAuthToken();
            } catch (error) {
                console.error("Failed to refresh token:", error);
            }
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);
}
