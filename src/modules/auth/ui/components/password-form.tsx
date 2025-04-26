import { Button } from "@/modules/core/ui/components/shadcn/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/modules/core/ui/components/shadcn/dialog";
import { Input } from "@/modules/core/ui/components/shadcn/input";
import { Label } from "@/modules/core/ui/components/shadcn/label";
import { Mail } from "lucide-react";
import { useState } from "react";

interface PasswordRecoveryProps {
    children: React.ReactNode;
}

export default function PasswordRecovery({ children }: PasswordRecoveryProps) {
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);

    const handleRecovery = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        console.log("Recovery email sent to:", email);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Mail />
                        <span>Password Recovery</span>
                    </DialogTitle>
                    <DialogDescription>
                        Enter your email address and we'll send you a link to reset your password.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleRecovery} className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="example@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Send Email</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
