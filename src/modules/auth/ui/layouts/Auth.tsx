import { Toaster } from "@/modules/core/ui/components/shadcn/sonner";
import { Outlet } from "react-router-dom";
export default function AuthLayout() {
    return (
        <div className="flex-center w-screen">
            <Outlet />
            <Toaster />
        </div>
    );
}
