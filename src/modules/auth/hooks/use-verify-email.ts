import { API_URL } from "@/modules/core/api/apiConfig";
import axios from "axios";
import { useEffect, useState } from "react";
import VerifyEmailData from "../types/api";

export function useVerifyEmail(token: string | undefined) {
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<VerifyEmailData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (token) {
            setIsLoading(true);
            axios
                .get<{ data: VerifyEmailData }>(`${API_URL}/auth/verify-email/${token}/`)
                .then((response) => {
                    setResponse(response.data.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError("There was an error verifying your email. Please try again.");
                    setIsLoading(false);
                    console.error("Error verifying email:", err);
                });
        }
    }, [token]);

    return { response, error, isLoading };
}
