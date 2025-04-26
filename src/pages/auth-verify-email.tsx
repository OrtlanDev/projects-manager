import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, MailQuestion, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyEmailPage() {
    type User = {
        username: string;
        email: string;
    };

    const [user, setUser] = useState<User | null>(null);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const navigate = useNavigate();

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
            navigate("/auth/signup");
        }
    }, [navigate]);

    const handleResendEmail = () => {
        setResendDisabled(true);
        setCountdown(60);

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setResendDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <div className="flex-center min-h-screen">
            <div className="w-full max-w-md">
                <Card className="w-full border-none shadow-none">
                    <CardHeader className="space-y-1">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                            <MailQuestion className="h-8 w-8 text-blue-900" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">
                            Hi {user && user.username}! <br /> Verify your email
                        </CardTitle>
                        <CardDescription className="text-center">
                            We've sent a verification link to{" "}
                            <span className="font-medium text-foreground">{user && user.email}</span>. If you don't see
                            the email, check your spam folder.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="text-center text-sm text-muted-foreground">
                            <p className="flex gap-2 text-yellow-800 p-2 bg-yellow-50 rounded-lg border border-yellow-800/10">
                                <span className="flex-center min-w-10 h-10 rounded-full">
                                    <Info size={20} />
                                </span>
                                <span className="text-left">
                                    If it is not in your spam folder either, click on the following button to forward
                                    the email.
                                </span>
                            </p>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleResendEmail}
                            disabled={resendDisabled}
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            {resendDisabled ? `Resend email (${countdown}s)` : "Resend verification email"}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
