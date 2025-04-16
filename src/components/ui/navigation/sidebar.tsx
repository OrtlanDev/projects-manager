import { Folders, LayoutGrid, ListTodo } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const items = [
    {
        title: "Dashboard",
        url: "#",
        icon: LayoutGrid,
    },
    {
        title: "Projects",
        url: "#",
        icon: Folders,
    },
    {
        title: "Tasks",
        url: "#",
        icon: ListTodo,
    },
];

const User = () => (
    <div className="flex items-center w-full gap-2 cursor-pointer">
        <Avatar className="border border-sidebar-border">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="text-sm">OT</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
            <p className="text-sm">Orlando Torres Rojas</p>
            <p className="text-muted-foreground text-xs">Full Stack Developer</p>
        </div>
    </div>
);
function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border h-15 flex justify-center pl-4">
                <div className="flex gap-2">
                    <img src="/src/assets/logo.svg" className="w-5" />
                    <span className="font-black tracking-wider uppercase">Synchrony</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
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
