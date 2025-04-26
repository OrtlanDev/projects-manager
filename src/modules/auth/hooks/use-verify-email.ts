import { API_URL } from "@/modules/core/api/apiConfig";
import axios from "axios";
import { useEffect, useState } from "react";

export function useVerifyEmail(token: string | undefined) {
    const [isVerified, setIsVerified] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<unknown>(null); //

    useEffect(() => {
        if (token) {
            axios
                .get(`${API_URL}/auth/verify-email/${token}`)
                .then((response) => {
                    setResponse(response.data);
                    setIsVerified(response.status === 200);
                })
                .catch((err) => {
                    setError("There was an error verifying your email. Please try again.");
                    setIsVerified(false);
                    console.error("Error verifying email:", err);
                });
        } else {
            setIsVerified(false);
        }
    }, [token]);

    return { isVerified, response, error };
}
