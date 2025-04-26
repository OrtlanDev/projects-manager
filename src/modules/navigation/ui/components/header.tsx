import { SidebarTrigger } from "../../../core/ui/components/shadcn/sidebar";

interface HeaderProps {
    children: React.ReactNode;
}

function Header({ children }: HeaderProps) {
    return (
        <div className="flex-between w-full px-4 h-15 bg-sidebar border-b border-sidebar-border">
            <SidebarTrigger />
            {children}
        </div>
    );
}

export default Header;
