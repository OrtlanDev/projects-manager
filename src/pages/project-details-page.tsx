import { TaskList } from "@/components/tasks/tasks-list";

export default function TaskPage() {
    return (
        <div>
            <h2 className="font-bold text-2xl">My Project</h2>
            <TaskList />
        </div>
    );
}
