export interface Project {
    id: string;
    user: string;
    name: string;
    description: string | null;
    created_at: string;
    finished_at: string | null;
    end_date: string | null;
    status: "planning" | "active" | "completed" | "stopped";
    updated_at: string;
}
