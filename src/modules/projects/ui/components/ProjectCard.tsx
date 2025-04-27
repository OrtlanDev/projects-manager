import { Button } from "@/modules/core/ui/components/shadcn/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/modules/core/ui/components/shadcn/card";

import StatusBadge, { Status } from "@/modules/projects/ui/components/ProjectStatus";

import { Separator } from "@radix-ui/react-separator";
import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import RadialChart from "../../../core/ui/components/RadialChart";
import OptionsMenu from "./OptionsMenu";

// ─── PROJECT CARD ─────────────────────────────────────────────────

export interface ProjectCardProps {
    projectId: string;
    title: string;
    status: Status;
    description: string;
    dueDate: string;
    remainingDays: number;
    tasksCompleted: number;
    tasksTotal: number;
    onEdit?: () => void;
    onDelete?: () => void;
    onFavorite?: () => void;
}

const ProjectCard = ({
    projectId,
    title,
    status,
    description,
    dueDate,
    remainingDays,
    tasksCompleted,
    tasksTotal,
    onEdit,
    onDelete,
    onFavorite,
}: ProjectCardProps) => {
    const progressPercentage = (100 * tasksCompleted) / tasksTotal;

    return (
        <Link to={`/dashboard/projects/${projectId}`} className="z-0">
            <Card className="w-full border border-border shadow-none hover:border-ring transition-colors">
                <CardContent>
                    <section>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <CardTitle>{title}</CardTitle>
                                    <StatusBadge status={status} />
                                </div>
                                <div className="flex gap-2">
                                    <OptionsMenu onEdit={onEdit} onDelete={onDelete} onFavorite={onFavorite}>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical />
                                        </Button>
                                    </OptionsMenu>
                                </div>
                            </div>
                            <CardDescription className="line-clamp-3">{description}</CardDescription>
                        </div>

                        <div className="flex-center w-min mt-4">
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col text-sm">
                                    <span className="-mb-1">{dueDate}</span>
                                    <p className="text-nowrap">
                                        <span className="text-xs text-foreground">{remainingDays}</span>
                                        <span className="text-xs text-muted-foreground"> days remaining</span>
                                    </p>
                                </div>
                            </div>
                            <Separator className="w-0.25 h-6 bg-sidebar-border mx-4" />
                            <div className="flex items-center gap-2">
                                <RadialChart percentage={progressPercentage} />
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
        </Link>
    );
};

export default ProjectCard;
