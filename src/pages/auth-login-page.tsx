// LoginPage.tsx
import PasswordRecovery from "@/components/auth/password-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(username, password);
        console.log(success);

        if (success) {
            navigate("/dashboard/projects");
        } else {
            setError("Incorrect username or password");
        }
    };

    useEffect(() => {
        if (error && usernameRef.current) {
            usernameRef.current.focus();
        }
    }, [error]);

    const handleInputChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) setError("");
        setter(e.target.value);
    };

    const inputErrorClass = error ? "border-red-500" : "";

    return (
        <div className="flex-center h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-100 p-4 md:w-100">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <a href="#" className="flex flex-col items-center gap-2 font-medium">
                            <div className="flex h-12 w-12 items-center justify-center rounded-md">
                                <img src="/logo.svg" alt="logo" />
                            </div>
                        </a>
                        <h1 className="text-xl font-extrabold uppercase tracking-wider">Synchrony</h1>
                        <div className="text-center text-sm text-muted-foreground">
                            Project planning and monitoring tool
                            <br />
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <div className="relative">
                                <Input
                                    ref={usernameRef}
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={handleInputChange(setUsername)}
                                    required
                                    className={cn(inputErrorClass, "pr-10")}
                                />
                                {error && (
                                    <XCircle
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500"
                                        size={16}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <div className="flex-between items-center">
                                <Label htmlFor="password">Password</Label>
                                <PasswordRecovery>
                                    <button
                                        type="button"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline bg-transparent border-none p-0 cursor-pointer text-muted-foreground"
                                    >
                                        Forgot your password?
                                    </button>
                                </PasswordRecovery>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={handleInputChange(setPassword)}
                                    required
                                    className={cn(inputErrorClass, "pr-10")}
                                />
                                {error && (
                                    <XCircle
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500"
                                        size={16}
                                    />
                                )}
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            Log In
                        </Button>
                        <div className="text-sm flex-center gap-1">
                            <span className="text-muted-foreground">Don't have an account?</span>
                            <Link to="/auth/signup" className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
