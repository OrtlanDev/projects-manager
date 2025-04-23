import { ProjectTasksTable } from "@/components/projects/project-tasks-table";

export default function TaskPage() {
    return (
        <div>
            <h2 className="font-bold text-2xl">My Project</h2>
            <ProjectTasksTable />
        </div>
    );
}
