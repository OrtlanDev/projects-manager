import { projects } from "@/mock/projects";
import ProjectCard from "../components/project/project-card";

function ProjectsPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {projects.map((project, index) => (
                <ProjectCard
                    key={index}
                    title={project.title}
                    status={project.status}
                    description={project.description}
                    dueDate={project.dueDate}
                    remainingDays={project.remainingDays}
                    tasksCompleted={project.tasksCompleted}
                    tasksTotal={project.tasksTotal}
                    onEdit={() => console.log("Edit project")}
                    onDelete={() => console.log("Delete project")}
                />
            ))}
        </div>
    );
}

export default ProjectsPage;
