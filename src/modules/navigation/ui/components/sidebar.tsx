import { useAuth } from "@/modules/auth/hooks/use-auth";
import { cn } from "@/modules/core/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/modules/core/ui/components/shadcn/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/modules/core/ui/components/shadcn/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/modules/core/ui/components/shadcn/sidebar";
import { Folders, LayoutGrid, LogOut, UserRoundCog } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const items = [
    {
        title: "Dashboard",
        url: "/dashboard/analytics",
        icon: LayoutGrid,
    },
    {
        title: "Projects",
        url: "/dashboard/projects",
        icon: Folders,
    },
];

interface UserActionMenuProps {
    children: React.ReactNode;
    onLogout?: () => void;
}

const UserActionMenu = ({ children, onLogout }: UserActionMenuProps) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-[calc(18rem-16px)] md:w-[calc(16rem-16px)]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <UserRoundCog />
                Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout}>
                <LogOut className="text-destructive" />
                <span className="text-destructive">Log out</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

const User = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/auth/login");
    };

    return (
        <UserActionMenu onLogout={handleLogout}>
            <div className="flex items-center w-full gap-2 cursor-pointer">
                <Avatar className="border border-sidebar-border">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="text-sm">OT</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <p className="text-sm">{user?.username}</p>
                    {/* <p className="text-muted-foreground text-xs">{user?.email}</p> */}
                </div>
            </div>
        </UserActionMenu>
    );
};

function AppSidebar() {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border h-15 flex justify-center pl-4">
                <div className="flex gap-2">
                    <img src="/src/assets/logo.svg" className="w-5" alt="Logo" />
                    <span className="font-black tracking-wider uppercase">Synchrony</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                // Comprobamos si la ruta actual coincide con la URL del item
                                const isActive = currentPath === item.url;
                                return (
                                    <SidebarMenuItem
                                        key={item.title}
                                        className={cn(
                                            "text-muted-foreground",
                                            isActive && "bg-sidebar-border/50 text-foreground rounded-lg"
                                        )}
                                    >
                                        <SidebarMenuButton asChild>
                                            <a href={item.url} className="flex items-center gap-2">
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel asChild></SidebarGroupLabel>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-sidebar-border h-15 flex-center">
                <User />
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSidebar;
