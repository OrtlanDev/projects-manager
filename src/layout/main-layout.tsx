import AppSidebar from "@/components/navigation/sidebar";
import { ProjectForm } from "@/components/projects/project-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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

function Header() {
    return (
        <div className="fixed flex-between w-full md:w-[calc(100vw-17rem)] px-4 h-15 bg-sidebar border-b border-sidebar-border z-20">
            <SidebarTrigger className="md:hidden" />
            <div></div>
            <Dialog>
                <DialogTrigger>
                    <Button>New Project</Button>
                </DialogTrigger>
                <DialogContent>
                    <ProjectForm />
                </DialogContent>
            </Dialog>
        </div>
    );
}
