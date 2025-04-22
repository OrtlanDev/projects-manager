import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { register } = useAuth();
    const navigate = useNavigate();
    const nameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const success = register(name, email, password);
        if (success) {
            navigate("/dashboard/projects");
        } else {
            setError("Registration failed. Please check your information and try again.");
        }
    };

    useEffect(() => {
        if (error && nameRef.current) {
            nameRef.current.focus();
        }
    }, [error]);

    const handleInputChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) setError("");
        setter(e.target.value);
    };

    const inputErrorClass = error ? "border-red-500" : "";

    return (
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
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Username</Label>
                        <div className="relative">
                            <Input
                                ref={nameRef}
                                id="name"
                                type="text"
                                placeholder="Enter your username"
                                value={name}
                                onChange={handleInputChange(setName)}
                                required
                                className={`${inputErrorClass} pr-10`}
                            />
                            {error && (
                                <XCircle className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500" size={16} />
                            )}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@domain.com"
                                value={email}
                                onChange={handleInputChange(setEmail)}
                                required
                                className={`${inputErrorClass} pr-10`}
                            />
                            {error && (
                                <XCircle className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500" size={16} />
                            )}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={handleInputChange(setPassword)}
                                required
                                className={`${inputErrorClass} pr-10`}
                            />
                            {error && (
                                <XCircle className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500" size={16} />
                            )}
                        </div>
                    </div>
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                    <div className="text-sm flex-center gap-1">
                        <span className="text-muted-foreground">Already have an account?</span>
                        <Link to="/auth/login" className="underline underline-offset-4">
                            Sign In
                        </Link>
                    </div>
                    {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
                </div>
            </div>
        </form>
    );
}

export default SignupPage;
