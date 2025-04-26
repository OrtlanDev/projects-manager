import { useAuth } from "@/modules/auth/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/modules/core/ui/components/shadcn/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/modules/core/ui/components/shadcn/dropdown-menu";
import { LogOut, UserRound, UserRoundCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface OptionsMenuProps {
    children: React.ReactNode;
    onLogout: () => void;
}

const UserAccount = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const getNameInitials = (name: string | undefined) => {
        if (!name) return "";

        const nameParts = name.split(" ");
        if (nameParts.length > 1) {
            return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
        }

        return name.slice(0, 2).toUpperCase();
    };

    return (
        <OptionsMenu
            onLogout={() => {
                logout();
                navigate("/auth/login");
            }}
        >
            <div className="flex items-center w-full gap-2 cursor-pointer">
                <Avatar className="border border-sidebar-border">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-sm font-medium">
                        {user ? getNameInitials(user.username) : <UserRound size={16} />}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <p className="text-sm">{user?.username}</p>
                </div>
            </div>
        </OptionsMenu>
    );
};

const OptionsMenu = ({ children, onLogout }: OptionsMenuProps) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-[calc(18rem-16px)] md:w-[calc(16rem-16px)]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/dashboard/account">
                <DropdownMenuItem>
                    <UserRoundCog />
                    Settings
                </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={onLogout}>
                <LogOut className="text-destructive" />
                <span className="text-destructive">Log out</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

export default UserAccount;
