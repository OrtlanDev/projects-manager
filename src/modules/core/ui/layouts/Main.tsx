import { Button } from "@/modules/core/ui/components/shadcn/button";
import { Dialog, DialogContent, DialogTrigger } from "@/modules/core/ui/components/shadcn/dialog";
import { SidebarProvider, SidebarTrigger } from "@/modules/core/ui/components/shadcn/sidebar";
import Sidebar from "@/modules/navigation/ui/components/Sidebar";
import { ProjectForm } from "@/modules/projects/ui/components/ProjectForm";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <SidebarProvider className="flex w-full">
            <Sidebar />
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
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <DialogTrigger asChild>
                    <Button>New Project</Button>
                </DialogTrigger>
                <DialogContent>
                    <ProjectForm />
                </DialogContent>
            </Dialog>
        </div>
    );
}
