// src/components/ProjectTasksTable/utils.ts
import { PROJECT_TASKS_MD } from "@/mock/KanbanMockData";
import { Task } from "../common/TaskList.type";

export const transformData = (): Task[] => {
    return PROJECT_TASKS_MD.flatMap((list) =>
        list.items.map((item) => ({
            id: item.id,
            title: item.title,
            priority: item.priority,
            description: item.description,
            dueDate: item.dueDate,
            attachments: item.attachments || [],
        }))
    );
};
