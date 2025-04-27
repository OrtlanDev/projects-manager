import { Button } from "@/modules/core/ui/components/shadcn/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { createProject } from "../../api/projectServices";
import { projectFormSchema } from "../../types/project-form";

type ProjectFormValues = z.infer<typeof projectFormSchema>;
export function ProjectForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function onSubmit(data: ProjectFormValues) {
        setIsSubmitting(true); // Inicia el estado de submitting
        try {
            // Llamamos a la función de la API
            const project = await createProject({
                name: data.name,
                description: data.description,
                status: data.status,
            });
            console.log("Project created:", project);
            // Aquí podrías redirigir o mostrar un mensaje de éxito
        } catch (error) {
            console.error("Failed to create project:", error);
            // Aquí puedes mostrar un mensaje de error al usuario
        } finally {
            setIsSubmitting(false); // Termina el estado de submitting
        }
    }

    const defaultValues: Partial<ProjectFormValues> = {
        name: "",
        description: "",
        status: "planning",
        created_at: new Date(),
    };

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectFormSchema),
        defaultValues,
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectFormSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Project Name */}
            <div>
                <label>Project Name</label>
                <input {...register("name")} placeholder="Enter project name" />
                <p>{errors.name?.message}</p>
            </div>

            {/* User */}
            <div>
                <label>User</label>
                <input {...register("user")} placeholder="Enter user name" />
                <p>{errors.user?.message}</p>
            </div>

            {/* Status */}
            <div>
                <label>Status</label>
                <select {...register("status")}>
                    <option value="planning">Planning</option>
                    <option value="active">Active</option>
                    <option value="stopped">Stopped</option>
                    <option value="completed">Completed</option>
                </select>
                <p>{errors.status?.message}</p>
            </div>

            {/* Description */}
            <div>
                <label>Description</label>
                <textarea {...register("description")} placeholder="Enter project description" />
            </div>

            {/* Submit Button */}
            <Button type="submit">Submit</Button>
        </form>
    );
}
