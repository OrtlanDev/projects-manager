import { cn } from "@/modules/core/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/modules/core/ui/components/shadcn/dropdown-menu";
import { Star } from "lucide-react";
import { ReactNode, useState } from "react";
import { setAsFavoriteProject } from "../../api/projectServices";

interface OptionsMenuProps {
    children: ReactNode;
    favorite: boolean;
    projectId: string;
    onEdit?: () => void;
    onDelete?: () => void;
    onFavorite?: () => void;
}

const handleToggleFavorite = async (projectId: string, currentFavoriteState: boolean) => {
    try {
        const updatedProject = await setAsFavoriteProject(projectId, currentFavoriteState);
        console.log("Proyecto actualizado:", updatedProject);
        return updatedProject.favorite;
    } catch (error) {
        console.error("Error alternando el estado de favorito:", error);
    }
};

function OptionsMenu({ children, favorite, projectId, onEdit, onDelete }: OptionsMenuProps) {
    const [isFavorite, setIsFavorite] = useState(favorite);

    const handleFavoriteClick = async () => {
        setIsFavorite(!isFavorite);
        const newFavoriteState = await handleToggleFavorite(projectId, isFavorite);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuItem
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleFavoriteClick();
                    }}
                >
                    <div className="flex-between w-full">
                        Favorite
                        <Star className={cn(isFavorite && "fill-foreground stroke-foreground")} />
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

export default OptionsMenu;
