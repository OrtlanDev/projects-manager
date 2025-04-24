import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";
export default function AuthLayout() {
    return (
        <div className="flex-center w-screen">
            <Outlet />
            <Toaster />
        </div>
    );
}
