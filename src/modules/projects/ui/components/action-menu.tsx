import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/modules/core/ui/components/shadcn/dropdown-menu";
import { Star } from "lucide-react";
import { ReactNode } from "react";
interface ActionMenuProps {
    children: ReactNode;
    onEdit?: () => void;
    onDelete?: () => void;
    onFavorite?: () => void;
}

function ActionMenu({ children, onEdit, onDelete, onFavorite }: ActionMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuItem
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onFavorite?.();
                    }}
                >
                    <div className="flex-between w-full">
                        Favorite
                        <Star />
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onEdit?.();
                    }}
                >
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete?.();
                    }}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ActionMenu;
