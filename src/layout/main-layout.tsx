import { Button } from "@/components/ui/button";
import AppSidebar from "@/components/ui/navigation/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <SidebarProvider className="flex w-full">
            <AppSidebar />
            <div className="flex flex-col w-full">
                <div className="flex-between sticky w-full px-4 h-15 bg-sidebar border-b border-sidebar-border">
                    <SidebarTrigger />
                    <Button>New Project</Button>
                </div>
                <main className="w-full p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    );
}
