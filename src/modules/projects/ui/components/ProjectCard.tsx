import { Button } from "@/modules/core/ui/components/shadcn/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/modules/core/ui/components/shadcn/card";

import StatusBadge, { Status } from "@/modules/projects/ui/components/ProjectStatus";

import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import RadialChart from "../../../core/ui/components/RadialChart";
import OptionsMenu from "./OptionsMenu";

export interface ProjectCardProps {
    projectId: string;
    title: string;
    status: Status;
    description: string;
    tasksCompleted: number;
    favorite: boolean;
    tasksTotal: number;
    onEdit?: () => void;
    onDelete?: () => void;
}

const ProjectCard = ({
    projectId,
    title,
    status,
    description,
    tasksCompleted,
    tasksTotal,
    favorite,
    onEdit,
    onDelete,
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
                                    <OptionsMenu
                                        projectId={projectId}
                                        favorite={favorite}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    >
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
