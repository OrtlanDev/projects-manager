import { cn } from "@/modules/core/lib/utils";
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
import { findProjects } from "@/modules/projects/api/projectServices";
import { ChartPie, Folders } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserAccount from "./UserAccount";

const menuItems = [
    { title: "Analytics", url: "/dashboard/analytics", icon: ChartPie },
    { title: "Projects", url: "/dashboard/projects", icon: Folders },
];

function AppSidebar() {
    const location = useLocation();
    const currentPath = location.pathname;

    const [projectList, setProjectList] = useState<any[]>([]);

    useEffect(() => {
        async function loadProjects() {
            try {
                const projects = await findProjects();
                setProjectList(projects);
            } catch (error) {
                console.error("Error al cargar proyectos:", error);
            }
        }
        loadProjects();
    }, []);

    return (
        <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border h-15 flex justify-center pl-4">
                <div className="flex gap-2">
                    <img src="/src/assets/images/logo.svg" className="w-5" alt="Logo" />
                    <span className="font-black tracking-wider uppercase">Synchrony</span>
                </div>
            </SidebarHeader>

            {/* Menu */}
            <SidebarGroup>
                <SidebarGroupLabel>Menu</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {menuItems.map((item) => {
                            const isActive = currentPath === item.url;
                            return (
                                <SidebarMenuItem
                                    key={item.title}
                                    className={cn("rounded-md", isActive && "bg-sidebar-border/50")}
                                >
                                    <SidebarMenuButton asChild>
                                        <Link
                                            to={item.url}
                                            className={cn(
                                                "text-foreground",
                                                isActive && "rounded-md bg-sidebar-border/50 hover:bg-sidebar-border/50"
                                            )}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

            {/* Proyectos */}
            <SidebarGroupLabel className="-mb-2 ml-2">Projects</SidebarGroupLabel>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {projectList.map((item) => {
                                const isActive = currentPath === `/dashboard/projects/${item.id}`;
                                return (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                to={`/dashboard/projects/${item.id}`}
                                                className={cn(
                                                    "rounded-md",
                                                    isActive && "bg-sidebar-border/50 hover:bg-sidebar-border/50"
                                                )}
                                            >
                                                <span
                                                    className={cn(
                                                        "ml-5 before-point",
                                                        isActive && "before:bg-blue-700!"
                                                    )}
                                                >
                                                    {item.name}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border h-15 flex-center">
                <UserAccount />
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSidebar;
