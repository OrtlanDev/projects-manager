import { List, Star } from "lucide-react";
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
        <>
            <p className="text-xl flex mb-4 items-center gap-2 w-full">
                <Star size={20} /> Favorite Projects
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
            </div>
            <p className="text-xl flex mb-4 mt-8 items-center gap-2 w-full">
                <List size={20} />
                All Projects
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
        </>
    );
}

export default ProjectsPage;
