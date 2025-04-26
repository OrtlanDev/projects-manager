import { PROJECT_TASKS_MD } from "@/modules/projects/ui/mock/KanbanMockData";
import { Task } from "../../tasks/types/TaskList.type";

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
