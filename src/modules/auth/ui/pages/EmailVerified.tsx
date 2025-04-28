import { Button } from "@/modules/core/ui/components/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/modules/core/ui/components/shadcn/card";
import { ArrowLeft, Home, MailCheck, MailWarning } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useVerifyEmail } from "../../hooks/use-verify-email";
import { User } from "../../types/user";

export default function VerifiedEmailPage() {
    const { token } = useParams<{ token: string }>();
    const [user, setUser] = useState<User | null>(null);
    const { error, response, isLoading } = useVerifyEmail(token);

    useEffect(() => {
        console.log(response);
        if (response?.user?.username && response?.user?.email) {
            setUser({ username: response.user.username, email: response.user.email });
        }
    }, [response]);

    if (isLoading) {
        return (
            <div className="flex-center min-h-screen">
                <div className="w-full max-w-md">
                    <Card className="w-full border-none shadow-none">
                        <CardContent className="text-center">
                            <span className="loader"></span>
                            <div className="mt-4 ">Loading...</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    console.log(" response: " + error, " response: " + response?.user, user!);
    if (error || !response?.user) {
        return ExpiredEmail();
    }

    return VerifiedEmail(user!);
}

const handleGoToDashboard = () => {
    console.log("login");
};

function VerifiedEmail(user: User) {
    return (
        <div className="flex-center min-h-screen">
            <div className="w-full max-w-md">
                <Card className="w-full border-none shadow-none">
                    <CardHeader className="space-y-1">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <MailCheck className="h-8 w-8 text-green-900" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">Congratulations!</CardTitle>
                        <CardDescription className="text-center">Your email,has been verified.</CardDescription>
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

const ExpiredEmail = () => {
    return (
        <div className="flex-center min-h-screen">
            <div className="w-full max-w-md">
                <Card className="w-full border-none shadow-none">
                    <CardHeader className="space-y-1">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                            <MailWarning className="h-8 w-8 text-red-900" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">Oops!</CardTitle>
                        <CardDescription className="text-center">The link you clicked has expired.</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="text-center text-sm">
                            <span className="text-left">
                                "Don't worry! You can register again, and a new verification email will be sent to you.
                                🙂"
                            </span>
                        </div>
                        <Link to={"/auth/login"}>
                            <Button variant="outline" className="w-full">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Go to Login
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
