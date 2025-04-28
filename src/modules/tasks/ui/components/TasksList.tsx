import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { CircleCheck, CirclePlus, CircleX, Copy } from "lucide-react";
import * as React from "react";

import { Button } from "@/modules/core/ui/components/shadcn/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/modules/core/ui/components/shadcn/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/modules/core/ui/components/shadcn/table";
import { Tabs, TabsList, TabsTrigger } from "@/modules/core/ui/components/shadcn/tabs";
import { useParams } from "react-router-dom";
import { findTasks, updateTask } from "../../api/tasksService"; // Asegúrate de importar updateTask
import { TaskForm } from "./TaskForm";

export type TPriority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
    id: number;
    name: string;
    description: string | null;
    priority: TPriority;
    is_completed: boolean;
};

export function TaskList() {
    const { projectId } = useParams<{ projectId: string }>();
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [selectedTab, setSelectedTab] = React.useState<"todo" | "completed">("todo");
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const fetchTasks = async () => {
            if (!projectId) return;
            try {
                setIsLoading(true);
                const data = await findTasks(projectId);
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [projectId]);

    const handleToggleStatus = async (taskId: number, is_completed: boolean) => {
        if (!projectId) {
            return;
        }

        try {
            const updatedTask = await updateTask(taskId.toString(), projectId, { is_completed });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, is_completed: updatedTask.is_completed } : task
                )
            );
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    const filteredData = React.useMemo(() => {
        return tasks.filter((task) => (selectedTab === "todo" ? !task.is_completed : task.is_completed));
    }, [tasks, selectedTab]);

    const columns = React.useMemo<ColumnDef<Task>[]>(
        () => [
            {
                id: "details",
                header: "Details",
                cell: ({ row }) => {
                    const { name, description, priority } = row.original;
                    return (
                        <div className="flex items-center space-x-4">
                            <div className="p-2">
                                <div className="flex items-center gap-2 w-max mb-1">
                                    <div className="font-semibold text-[16px]">{name}</div>
                                    <div
                                        className={`text-sm px-2 py-1 rounded-md ${
                                            priority === "HIGH"
                                                ? "bg-red-100 text-red-800"
                                                : priority === "MEDIUM"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-green-100 text-green-800"
                                        }`}
                                    >
                                        {priority}
                                    </div>
                                </div>
                                {description && (
                                    <div className="text-sm text-muted-foreground">
                                        <p className="w-140 text-wrap line-clamp-2">{description}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                },
            },
            {
                id: "actions",
                enableHiding: false,
                cell: ({ row }) => {
                    const task = row.original;
                    return (
                        <div className="gap-2 flex">
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        task.name + "(" + task.priority + "): " + task.description
                                    )
                                }
                            >
                                <Copy />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => handleToggleStatus(task.id, !task.is_completed)}
                            >
                                {!task.is_completed ? (
                                    <CircleCheck className="text-green-900" />
                                ) : (
                                    <CircleX className="text-red-800" />
                                )}
                            </Button>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const table = useReactTable<Task>({
        data: filteredData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <div className="w-full">
            <div className="flex-between mb-2 mt-6">
                <Tabs
                    value={selectedTab}
                    onValueChange={(value) => setSelectedTab(value as "todo" | "completed")}
                    defaultValue="todo"
                    className="w-[300px]"
                >
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="todo">To Do</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                </Tabs>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <CirclePlus />
                            Add Task
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle className="hidden"></DialogTitle>
                        <DialogDescription className="hidden"></DialogDescription>
                        <TaskForm />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {!header.isPlaceholder &&
                                            flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {isLoading ? "Loading tasks..." : "No tasks in this category."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
