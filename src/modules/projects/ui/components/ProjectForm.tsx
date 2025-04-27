import DayPicker from "@/modules/core/ui/components/DayPicker";
import { Button } from "@/modules/core/ui/components/shadcn/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/modules/core/ui/components/shadcn/form";
import { Input } from "@/modules/core/ui/components/shadcn/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/modules/core/ui/components/shadcn/select";
import { Textarea } from "@/modules/core/ui/components/shadcn/textarea";
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
        setIsSubmitting(true);
        try {
            const project = await createProject(data);
            console.log("Project created:", project);
        } catch (error) {
            console.error("Failed to create project:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const defaultValues: Partial<ProjectFormValues> = {
        name: "",
        description: "",
        status: "planning",
        dueDate: new Date(),
    };

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectFormSchema),
        defaultValues,
    });

    return (
        <Form {...form}>
            <h2 className="text-2xl text-center mb-2 font-medium">Create New Project</h2>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Project Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                                <Input autoFocus placeholder="Enter project name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter project description"
                                    className="min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Status */}
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className="w-full">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="planning">Planning</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="stopped">Stopped</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={() => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Due Date</FormLabel>
                                <DayPicker />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Botón Submit */}
                <div className="flex justify-end gap-3">
                    <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
                        {isSubmitting ? "Creating..." : "Create Project"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
