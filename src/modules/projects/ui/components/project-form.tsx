import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/modules/core/lib/utils";
import { Button } from "@/modules/core/ui/components/shadcn/button";
import { Calendar } from "@/modules/core/ui/components/shadcn/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/modules/core/ui/components/shadcn/form";
import { Input } from "@/modules/core/ui/components/shadcn/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/modules/core/ui/components/shadcn/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/modules/core/ui/components/shadcn/select";
import { Textarea } from "@/modules/core/ui/components/shadcn/textarea";

// 🧩 Validación con Zod para el formulario
const projectFormSchema = z.object({
    name: z.string().min(2, {
        message: "Project name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    status: z.enum(["planning", "active", "completed", "stopped"]),
    dueDate: z
        .date({
            required_error: "A due date is required.",
            invalid_type_error: "Invalid date.",
        })
        .nullable(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

/**
 * Componente independiente para la selección de fecha.
 *
 * Se sincroniza su estado local con el valor recibido del formulario y
 * actualiza el cambio mediante la prop `onChange`, respetando las reglas de React Hooks.
 */
type DueDatePickerProps = {
    initialDate: Date | null;
    onChange: (date: Date | null) => void;
};

function DueDatePicker({ initialDate, onChange }: DueDatePickerProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);

    // Actualiza el estado local si el valor inicial cambia desde el formulario
    useEffect(() => {
        setSelectedDate(initialDate);
    }, [initialDate]);

    const handleDateSelect = (date: Date | null) => {
        setSelectedDate(date);
        onChange(date);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        className={cn("w-full pl-3 text-left font-normal", !selectedDate && "text-muted-foreground")}
                    >
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selectedDate || undefined}
                    onSelect={() => handleDateSelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

export function ProjectForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Valores por defecto del formulario
    const defaultValues: Partial<ProjectFormValues> = {
        name: "",
        description: "",
        status: "planning",
        dueDate: new Date(),
    };

    // Configuración de react-hook-form con Zod
    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectFormSchema),
        defaultValues,
    });

    async function onSubmit(data: ProjectFormValues) {
        setIsSubmitting(true);

        // Simula una llamada a una API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log(data);
        setIsSubmitting(false);
    }

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
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="stopped">Stopped</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Due Date */}
                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Due Date</FormLabel>
                                <DueDatePicker initialDate={field.value} onChange={field.onChange} />
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
