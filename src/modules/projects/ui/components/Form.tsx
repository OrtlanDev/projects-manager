import { Button } from "@/modules/core/ui/components/shadcn/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/modules/core/ui/components/shadcn/form";
import { Input } from "@/modules/core/ui/components/shadcn/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/modules/core/ui/components/shadcn/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createProject } from "../../api/projectServices";

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1).optional(),
    status: z.string(),
    end_date: z.coerce.date().optional(),
});

export default function ProjectForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            end_date: new Date(),
        },
    });
    const [startDate, setStartDate] = useState(new Date());

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const userId = localStorage.getItem("id");

        try {
            const project = await createProject({
                user: userId,
                name: data.name,
                description: data.description,
                // status: data.status,
            });
            console.log("Project created:", project);
        } catch (error) {
            console.error("Failed to create project:", error);
        }
    }
    // function onSubmit(values: z.infer<typeof formSchema>) {
    //     try {
    //         console.log(values);
    //         toast(
    //             <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //                 <code className="text-white">{JSON.stringify(values, null, 2)}</code>
    //             </pre>
    //         );
    //     } catch (error) {
    //         console.error("Form submission error", error);
    //         toast.error("Failed to submit the form. Please try again.");
    //     }
    // }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
                <p className="w-full text-xl text-center">Create New Project</p>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Project name" type="text" {...field} />
                            </FormControl>
                            <FormDescription>This is your public display name.</FormDescription>
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
                                <Input placeholder="My awersome project" type="text" {...field} />
                            </FormControl>
                            <FormDescription>This is your public display name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2">
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className="w-50">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="planing">planing</SelectItem>
                                        <SelectItem value="active">active</SelectItem>
                                        <SelectItem value="stopped">stopped</SelectItem>
                                        <SelectItem value="completed">completed</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="end_date"
                        render={() => (
                            <FormItem className="flex flex-col">
                                <FormLabel>End Date</FormLabel>
                                <DatePicker
                                    showIcon
                                    selected={startDate}
                                    onChange={(date) => date && setStartDate(date)}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="w-full">
                    Submit
                </Button>
            </form>
        </Form>
    );
}
