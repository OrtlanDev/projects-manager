import { UniqueIdentifier } from "@dnd-kit/core";
import { Attachment } from "./Attachment.interface";
import { TPriority } from "./Priority.type";

export type TaskList = {
    id: UniqueIdentifier;
    name: string;
    items: Task[];
};

export type Task = {
    id: UniqueIdentifier;
    title: string;
    priority: TPriority;
    description?: string;
    dueDate?: Date;
    attachments?: Attachment[];
};
