import ProjectCard from "@/components/ui/project-card";

function ProjectsPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ProjectCard
                title="Synchrony - Web App"
                status="completed"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis corporis perspiciatis enim accusamus cum eum! Vel quis sit consequuntur minima, tenetur odio doloremque itaque culpa quae? Et quaerat autem ipsam assumenda reiciendis unde nobis ab ex asperiores eaque! Necessitatibus deleniti quibusdam quaerat possimus laudantium laboriosam ducimus quidem itaque earum hic."
                dueDate="03/12/2025"
                remainingDays={15}
                tasksCompleted={4}
                tasksTotal={12}
                progressPercentage={50}
                onEdit={() => console.log("Edit project")}
                onDelete={() => console.log("Delete project")}
            />
            <ProjectCard
                title="Synchrony - Web App"
                status="completed"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis corporis perspiciatis enim accusamus cum eum! Vel quis sit consequuntur minima, tenetur odio doloremque itaque culpa quae? Et quaerat autem ipsam assumenda reiciendis unde nobis ab ex asperiores eaque! Necessitatibus deleniti quibusdam quaerat possimus laudantium laboriosam ducimus quidem itaque earum hic."
                dueDate="03/12/2025"
                remainingDays={15}
                tasksCompleted={4}
                tasksTotal={12}
                progressPercentage={50}
                onEdit={() => console.log("Edit project")}
                onDelete={() => console.log("Delete project")}
            />
            <ProjectCard
                title="Synchrony - Web App"
                status="completed"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis corporis perspiciatis enim accusamus cum eum! Vel quis sit consequuntur minima, tenetur odio doloremque itaque culpa quae? Et quaerat autem ipsam assumenda reiciendis unde nobis ab ex asperiores eaque! Necessitatibus deleniti quibusdam quaerat possimus laudantium laboriosam ducimus quidem itaque earum hic."
                dueDate="03/12/2025"
                remainingDays={15}
                tasksCompleted={4}
                tasksTotal={12}
                progressPercentage={50}
                onEdit={() => console.log("Edit project")}
                onDelete={() => console.log("Delete project")}
            />
            <ProjectCard
                title="Synchrony - Web App"
                status="completed"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis corporis perspiciatis enim accusamus cum eum! Vel quis sit consequuntur minima, tenetur odio doloremque itaque culpa quae? Et quaerat autem ipsam assumenda reiciendis unde nobis ab ex asperiores eaque! Necessitatibus deleniti quibusdam quaerat possimus laudantium laboriosam ducimus quidem itaque earum hic."
                dueDate="03/12/2025"
                remainingDays={15}
                tasksCompleted={4}
                tasksTotal={12}
                progressPercentage={50}
                onEdit={() => console.log("Edit project")}
                onDelete={() => console.log("Delete project")}
            />
            <ProjectCard
                title="Synchrony - Web App"
                status="completed"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis corporis perspiciatis enim accusamus cum eum! Vel quis sit consequuntur minima, tenetur odio doloremque itaque culpa quae? Et quaerat autem ipsam assumenda reiciendis unde nobis ab ex asperiores eaque! Necessitatibus deleniti quibusdam quaerat possimus laudantium laboriosam ducimus quidem itaque earum hic."
                dueDate="03/12/2025"
                remainingDays={15}
                tasksCompleted={4}
                tasksTotal={12}
                progressPercentage={50}
                onEdit={() => console.log("Edit project")}
                onDelete={() => console.log("Delete project")}
            />
        </div>
    );
}

export default ProjectsPage;
