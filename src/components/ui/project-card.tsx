import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProjectRadialChart from "@/components/ui/project-radial-chart";
import StatusBadge, { Status } from "@/components/ui/project-status";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { MoreVertical, Star } from "lucide-react";
import { HTMLAttributes, ReactNode, useState } from "react";

// ─── ACTION MENU ────────────────────────────────────────────────

interface ActionMenuProps {
    children: ReactNode;
    onEdit?: () => void;
    onDelete?: () => void;
}

const ActionMenu = ({ children, onEdit, onDelete }: ActionMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

// ─── FAVORITE BUTTON ────────────────────────────────────────────────

interface FavoriteButtonProps extends HTMLAttributes<HTMLButtonElement> {
    filled?: boolean;
}

const FavoriteButton = ({ filled = false, className, ...props }: FavoriteButtonProps) => {
    const [status, setStatus] = useState(filled);

    return (
        <Button variant="ghost" size="icon" className={cn(className)} {...props} onClick={() => setStatus(!status)}>
            <Star fill={status ? "currentColor" : "none"} />
        </Button>
    );
};

// ─── PROJECT CARD ─────────────────────────────────────────────────

interface ProjectCardProps {
    title: string;
    status: Status;
    description: string;
    dueDate: string;
    remainingDays: number;
    tasksCompleted: number;
    tasksTotal: number;
    progressPercentage: number;
    onEdit?: () => void;
    onDelete?: () => void;
}

const ProjectCard = ({
    title,
    status,
    description,
    dueDate,
    remainingDays,
    tasksCompleted,
    tasksTotal,
    progressPercentage,
    onEdit,
    onDelete,
}: ProjectCardProps) => {
    return (
        <Card className="w-full border border-border shadow-none">
            <CardContent>
                <section>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <CardTitle>{title}</CardTitle>
                                <StatusBadge status={status} />
                            </div>
                            <div className="flex gap-2">
                                <FavoriteButton />
                                <ActionMenu onEdit={onEdit} onDelete={onDelete}>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical />
                                    </Button>
                                </ActionMenu>
                            </div>
                        </div>
                        <CardDescription className="line-clamp-3">{description}</CardDescription>
                    </div>

                    <div className="flex md:items-center md:flex-row gap-4 md:gap-2 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="flex flex-col text-sm">
                                <span className="-mb-1">{dueDate}</span>
                                <p className="text-nowrap">
                                    <span className="text-xs text-foreground">{remainingDays}</span>
                                    <span className="text-xs text-muted-foreground"> days remaining</span>
                                </p>
                            </div>
                        </div>
                        <Separator className="hidden md:inline-block w-0.25 h-6 bg-sidebar-border mx-4" />
                        <div className="flex items-center gap-2">
                            <ProjectRadialChart percentage={progressPercentage} />
                            <div className="flex flex-col">
                                <p className="text-sm -mb-1">
                                    {tasksCompleted} / {tasksTotal}
                                </p>
                                <span className="text-xs text-muted-foreground text-nowrap">tasks completed</span>
                            </div>
                        </div>
                    </div>
                </section>
            </CardContent>
        </Card>
    );
};

export default ProjectCard;
