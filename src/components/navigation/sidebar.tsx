import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Folders, LayoutGrid, ListTodo, LogOut, UserRoundCog } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const items = [
    {
        title: "Dashboard",
        url: "/dashboard/analytics", // Actualizar URL según corresponda
        icon: LayoutGrid,
    },
    {
        title: "Projects",
        url: "/dashboard/projects",
        icon: Folders,
    },
    {
        title: "Tasks",
        url: "/dashboard/tasks", // Actualizar URL según corresponda
        icon: ListTodo,
    },
];

interface UserActionMenuProps {
    children: React.ReactNode;
    onLogout?: () => void;
}

export const UserActionMenu = ({ children, onLogout }: UserActionMenuProps) => (
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
                    <p className="text-muted-foreground text-xs">{user?.email}</p>
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
