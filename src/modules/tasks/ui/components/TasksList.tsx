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
import { CirclePlus, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { Button } from "@/modules/core/ui/components/shadcn/button";
import { Dialog, DialogContent, DialogTrigger } from "@/modules/core/ui/components/shadcn/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/modules/core/ui/components/shadcn/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/modules/core/ui/components/shadcn/table";
import { Tabs, TabsList, TabsTrigger } from "@/modules/core/ui/components/shadcn/tabs";
import { taskList_md } from "@/modules/projects/ui/mock/taskList";
import { TaskForm } from "./TaskForm";

export type TPriority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
    id: number;
    column: string;
    title: string;
    priority: TPriority;
    description: string | null;
};

export function TaskList() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [selectedTab, setSelectedTab] = React.useState("toDo");

    const columnNameMap: { [key: string]: string } = {
        toDo: "To Do",
        inProgress: "In Progress",
        completed: "Completed",
    };

    const data = React.useMemo(() => taskList_md, []);

    const filteredData = React.useMemo(
        () => data.filter((task) => task.column === columnNameMap[selectedTab]),
        [data, selectedTab]
    );

    const columns = React.useMemo<ColumnDef<Task>[]>(
        () => [
            {
                id: "details",
                header: "Details",
                cell: ({ row }) => {
                    const { title, description, priority } = row.original;
                    return (
                        <div className="flex items-center space-x-4">
                            <div className="p-2">
                                <div className="flex items-center gap-2 w-max mb-1">
                                    <div className="font-semibold text-[16px]">{title}</div>
                                    <div className="text-sm px-2 py-1 bg-gray-100 rounded-md">{priority}</div>
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
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(task.title)}>
                                    Copy Title
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
                <Tabs value={selectedTab} onValueChange={setSelectedTab} defaultValue="toDo" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="toDo">To Do</TabsTrigger>
                        <TabsTrigger value="inProgress">In Progress</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                </Tabs>
                <Dialog>
                    <DialogTrigger>
                        <Button>
                            <CirclePlus />
                            Add Task
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <TaskForm projectId="1" />
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
                                    No tasks in this category.
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
