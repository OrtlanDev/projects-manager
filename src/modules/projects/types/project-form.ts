import { z } from "zod";

export const projectFormSchema = z.object({
    name: z.string().min(1, {
        message: "Project name must be at least 1 characters.",
    }),
    description: z.string(),
    status: z.enum(["planning", "active", "stopped"]),
    dueDate: z
        .date({
            required_error: "A due date is required.",
            invalid_type_error: "Invalid date.",
        })
        .nullable(),
});
export type ProjectFormValues = z.infer<typeof projectFormSchema>;
