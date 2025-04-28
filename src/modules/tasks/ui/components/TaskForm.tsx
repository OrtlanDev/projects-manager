"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

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
import { createTask } from "../../api/tasksService";

const taskFormSchema = z.object({
    name: z.string().min(1, {
        message: "Task title must be at least 2 characters.",
    }),
    description: z.string(),
    priority: z.enum(["high", "medium", "low"]),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

export function TaskForm() {
    const { projectId } = useParams<{ projectId: string }>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const defaultValues: Partial<TaskFormValues> = {
        name: "",
        description: "",
        priority: "medium",
    };

    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskFormSchema),
        defaultValues,
    });

    const nameInputRef = form.register("name").ref;

    async function onSubmit(data: TaskFormValues) {
        setIsSubmitting(true);

        try {
            const taskData = { ...data, project: projectId };
            await createTask(taskData);
            console.log("Task created successfully:", taskData);

            form.reset();
            form.setFocus("name");
        } catch (error) {
            console.error("Error creating task:", error);
        }

        setIsSubmitting(false);
    }

    return (
        <Form {...form}>
            <h2 className="text-2xl text-center mb-2 font-medium">Add New Task</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Task Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter task title" {...field} ref={nameInputRef} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter task description" className="min-h-[120px]" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className="w-full">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
                        {isSubmitting ? "Creating..." : "Create Task"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
