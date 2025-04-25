import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Home, MailCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifiedEmailPage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { token } = useParams<{ token: string }>();

    useEffect(() => {
        const storedUser = localStorage.getItem("notVerifiedUser");

        if (!storedUser) {
            navigate("/auth/signup");
            return;
        }

        try {
            setUser(JSON.parse(storedUser));
        } catch (error) {
            console.error("Error parsing user data:", error);
        }
    }, [navigate]);

    const API_URL = "https://pid-todo-backend.onrender.com/api";

    useEffect(() => {
        if (token) {
            axios
                .get(`${API_URL}/auth/verify-email/${token}`)
                .then((response) => {
                    console.log("Response:", response.data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, [token]);

    const handleGoToDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <div className="flex-center min-h-screen">
            <div className="w-full max-w-md">
                <Card className="w-full border-none shadow-none">
                    <CardHeader className="space-y-1">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <MailCheck className="h-8 w-8 text-green-900" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">
                            Congratulations {user && user.username}!
                        </CardTitle>
                        <CardDescription className="text-center">
                            Your email, <span className="font-medium text-foreground">{user && user.email}</span> has
                            been verified.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="text-center text-sm">
                            <span className="text-left">
                                "All set to go! Head over to your dashboard and start organizing and managing your
                                projects right away."
                            </span>
                        </div>

                        <Button variant="outline" className="w-full" onClick={handleGoToDashboard}>
                            <Home className="mr-2 h-4 w-4" />
                            Go to Dashboard
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
