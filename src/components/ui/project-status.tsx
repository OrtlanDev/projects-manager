import type { LucideIcon } from "lucide-react";
import { CircleCheck, CircleHelp, CirclePause, CirclePlay } from "lucide-react";
import React from "react";

export type Status = "planning" | "active" | "stopped" | "completed";

interface StatusBadgeProps {
    status: Status;
}

const statusConfig: Record<
    Status,
    {
        label: string;
        bgColor: string;
        textColor: string;
        border: string;
        Icon: LucideIcon;
    }
> = {
    planning: {
        label: "Planning",
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
        border: "border-gray-800/10",
        Icon: CircleHelp,
    },
    active: {
        label: "Active",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
        border: "border-blue-800/10",
        Icon: CirclePlay,
    },
    stopped: {
        label: "Stopped",
        bgColor: "bg-red-100",
        textColor: "text-red-800",
        border: "border-red-800/10",
        Icon: CirclePause,
    },
    completed: {
        label: "Completed",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        border: "border-green-800/10",
        Icon: CircleCheck,
    },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const config = statusConfig[status];

    if (!config) return null;

    const { label, bgColor, textColor, border, Icon } = config;

    return (
        <p
            className={`p-1 md:pr-2 rounded-full ${bgColor} ${textColor} text-xs font-medium flex-center gap-1 border ${border}`}
        >
            <Icon size={20} />
            <span className="hidden md:inline-block">{label}</span>
        </p>
    );
};

export default StatusBadge;
