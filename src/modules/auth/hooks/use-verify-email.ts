import { API_URL } from "@/modules/core/api/apiConfig";
import axios from "axios";
import { useEffect, useState } from "react";

export function useVerifyEmail(token: string | undefined) {
    const [isVerified, setIsVerified] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (token) {
            axios
                .get(`${API_URL}/auth/verify-email/${token}`)
                .then((response) => setIsVerified(response.status === 200))
                .then((response) => console.log(response))
                .catch((err) => {
                    setError("There was an error verifying your email. Please try again.");
                    console.error("Error verifying email:", err);
                    setIsVerified(false);
                });
        } else {
            setIsVerified(false);
        }
    }, [token]);

    return { isVerified, error };
}
