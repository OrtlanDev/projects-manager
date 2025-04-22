import AppSidebar from "@/components/navigation/sidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <SidebarProvider className="flex w-full">
            <AppSidebar />
            <div className="flex flex-col w-full">
                <Header />
                <main className="w-full p-4 lg:p-6 mt-15">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    );
}

const Header = () => (
    <div className="fixed flex-between w-full md:w-[calc(100vw-17rem)] px-4 h-15 bg-sidebar border-b border-sidebar-border z-20">
        <SidebarTrigger className="md:hidden" />
        <div></div>
        <Button>New Project</Button>
    </div>
);
