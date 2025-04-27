import { useEffect, useState } from "react";
import { deleteProject, findProjects } from "../../api/projectServices";
import ProjectCard from "../components/ProjectCard";

function ProjectsPage() {
    const [projectList, setProjectList] = useState<any[]>([]);

    useEffect(() => {
        async function loadProjects() {
            try {
                const projects = await findProjects();
                setProjectList(projects);
            } catch (error) {
                console.error("Error al cargar proyectos:", error);
            }
        }
        loadProjects();
    }, []);

    const handleDelete = async (projectId: string) => {
        try {
            await deleteProject(projectId);
            setProjectList(projectList.filter((project) => project.id !== projectId));
        } catch (error) {
            console.error("Error al eliminar el proyecto:", error);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <p className="text-xl">Favorite Projects</p>
            {projectList.map(
                (project) =>
                    project.favorite && (
                        <ProjectCard
                            projectId={project.id}
                            key={project.id}
                            title={project.name}
                            status={project.status}
                            description={project.description}
                            favorite={project.favorite}
                            tasksCompleted={project.completed_tasks}
                            tasksTotal={project.total_tasks}
                            onEdit={() => console.log("Edit project")}
                            onDelete={() => handleDelete(project.id)}
                        />
                    )
            )}
            <p className="text-xl">All Projects</p>
            {projectList.map(
                (project) =>
                    !project.favorite && (
                        <ProjectCard
                            projectId={project.id}
                            key={project.id}
                            title={project.name}
                            status={project.status}
                            description={project.description}
                            favorite={project.favorite}
                            tasksCompleted={project.completed_tasks}
                            tasksTotal={project.total_tasks}
                            onEdit={() => console.log("Edit project")}
                            onDelete={() => handleDelete(project.id)}
                        />
                    )
            )}
        </div>
    );
}

export default ProjectsPage;
