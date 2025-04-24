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
import { ArrowDown, ArrowUp, ChevronDown, CirclePlus, MoreHorizontal, Paperclip } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PROJECT_TASKS_MD } from "@/mock/KanbanMockData";
import { TaskForm } from "./task-form";

export type TPriority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
    column: string;
    title: string;
    priority: TPriority;
    description: string | undefined;
    dueDate: string;
    attachments: number;
};

export function TaskList() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

    const data = React.useMemo(
        () =>
            PROJECT_TASKS_MD.flatMap((column) =>
                column.items.map((item) => ({
                    column: column.name,
                    title: item.title,
                    priority: item.priority,
                    description: item.description,
                    dueDate: item.dueDate ? new Date(item.dueDate).toLocaleDateString() : "No date",
                    attachments: item.attachments?.length || 0,
                }))
            ),
        []
    );

    const handleToggleSort = (id: string) => {
        const currentSort = sorting[0];
        if (currentSort && currentSort.id === id) {
            setSorting([{ id, desc: !currentSort.desc }]);
        } else {
            setSorting([{ id, desc: false }]);
        }
    };

    // Agregamos accessorFn en cada columna para cumplir con la definición interna
    const columns = React.useMemo<ColumnDef<Task>[]>(
        () => [
            {
                accessorKey: "column",
                accessorFn: (row: Task) => row.column,
                header: "Column",
                cell: ({ row }) => <div className="font-medium">{row.getValue("column")}</div>,
            },
            {
                id: "details",
                header: "Details",
                cell: ({ row }) => {
                    const { title, description, attachments } = row.original;
                    return (
                        <div className="flex items-center space-x-4">
                            <div className="p-2">
                                <div className="font-semibold text-[16px] mb-1">{title}</div>
                                <div className="text-sm text-muted-foreground">
                                    <p className="w-140 text-wrap line-clamp-2">{description}</p>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <Button variant="secondary" size={"sm"}>
                                        <Paperclip /> {attachments}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: "priority",
                accessorFn: (row: Task) => row.priority,
                header: "Priority",
                cell: ({ row }) => <div className="capitalize">{row.getValue("priority")}</div>,
            },
            {
                accessorKey: "dueDate",
                accessorFn: (row: Task) => row.dueDate,
                header: "Due Date",
                cell: ({ row }) => <div>{row.getValue("dueDate")}</div>,
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
        data,
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

    const sortOptions = [
        { id: "column", label: "Column" },
        { id: "priority", label: "Priority" },
        { id: "dueDate", label: "Due Date" },
    ];

    return (
        <div className="w-full">
            <div className="flex items-center justify-end w-full py-4 gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Sort <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {sortOptions.map((option) => {
                            const currentSort = sorting[0];
                            const isActive = currentSort && currentSort.id === option.id;
                            return (
                                <DropdownMenuItem
                                    key={option.id}
                                    onClick={() => handleToggleSort(option.id)}
                                    className="flex justify-between items-center"
                                >
                                    <span>{option.label}</span>
                                    {isActive &&
                                        (currentSort.desc ? (
                                            <ArrowDown className="h-4 w-4" />
                                        ) : (
                                            <ArrowUp className="h-4 w-4" />
                                        ))}
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="ml-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

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
                                    No results.
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
