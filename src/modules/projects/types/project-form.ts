import { z } from "zod";

export const projectFormSchema = z.object({
    id: z.string(),
    user: z.string().min(1, { message: "User is required." }),
    name: z.string().min(1, { message: "Project name must be at least 1 character." }),
    description: z.string().nullable().optional(),
    status: z.enum(["planning", "active", "stopped", "completed"]).default("planning").optional(),
    favorite: z.boolean().default(false).optional(),
    completed_tasks: z.string().optional(),
    total_tasks: z.string().optional(),
    due_days: z.string().optional(),
    end_date: z.date().nullable().optional(),
    finished_at: z.date().nullable().optional(),
    created_at: z.date().optional().readonly(),
    updated_at: z.date().optional().readonly(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
