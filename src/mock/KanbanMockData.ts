// src/mock/ProjectTasksMockData.ts
import { Attachment } from "@/components/common/Attachment.interface";
import { TaskList } from "@/components/common/TaskList.type";
import { v4 as uuidv4 } from "uuid";

const mockAttachments: Attachment[] = [
    { id: "attachment-1", name: "design.png", type: "image/png", url: "/attachments/design.png" },
    { id: "attachment-2", name: "requirements.pdf", type: "application/pdf", url: "/attachments/requirements.pdf" },
    { id: "attachment-3", name: "logo.svg", type: "image/svg+xml", url: "/attachments/logo.svg" },
    { id: "attachment-4", name: "changelog.txt", type: "text/plain", url: "/attachments/changelog.txt" },
    {
        id: "attachment-5",
        name: "sprint-plan.xlsx",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        url: "/attachments/sprint-plan.xlsx",
    },
    { id: "attachment-6", name: "backend-api.json", type: "application/json", url: "/attachments/backend-api.json" },
    { id: "attachment-7", name: "wireframes.zip", type: "application/zip", url: "/attachments/wireframes.zip" },
    {
        id: "attachment-8",
        name: "presentation.pptx",
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        url: "/attachments/presentation.pptx",
    },
    { id: "attachment-9", name: "banner.jpg", type: "image/jpeg", url: "/attachments/banner.jpg" },
    {
        id: "attachment-10",
        name: "summary.docx",
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        url: "/attachments/summary.docx",
    },
];

export const PROJECT_TASKS_MD: TaskList[] = [
    {
        id: `column-${uuidv4()}`,
        name: "To Do",
        items: [
            {
                id: `item-${uuidv4()}`,
                title: "Diseñar landing page",
                priority: "HIGH",
                description:
                    "Crear un diseño responsive para la landing page principal, considerando las mejores prácticas de UX/UI, un enfoque móvil primero, integración con herramientas analíticas y optimización SEO para mejorar la visibilidad en buscadores.",
                dueDate: new Date("2025-04-15"),
                attachments: [mockAttachments[0]],
            },
            {
                id: `item-${uuidv4()}`,
                title: "Planificar estructura del proyecto",
                priority: "MEDIUM",
                description:
                    "Definir de manera detallada la estructura del proyecto, estableciendo carpetas, convenciones de nombres, y pautas de código para facilitar la escalabilidad, colaboración y mantenimiento a largo plazo.",
                dueDate: new Date("2025-04-17"),
                attachments: [],
            },
            {
                id: `item-${uuidv4()}`,
                title: "Reunión con el cliente",
                priority: "HIGH",
                description:
                    "Preparar una presentación completa y detallada para alinear expectativas con el cliente, incluyendo prototipos, estudios de mercado y propuestas de soluciones técnicas que aborden sus necesidades específicas y futuras integraciones.",
                dueDate: new Date("2025-04-13"),
                attachments: [mockAttachments[2]],
            },
        ],
    },
    {
        id: `column-${uuidv4()}`,
        name: "In Progress",
        items: [
            {
                id: `item-${uuidv4()}`,
                title: "Conectar API de clima",
                priority: "MEDIUM",
                description:
                    "Implementar la conexión a una API de clima mediante fetch, procesar la respuesta en formato JSON y mostrar la información en el dashboard en tiempo real, asegurando la gestión de errores y actualización periódica de los datos.",
                dueDate: new Date("2025-04-10"),
                attachments: [],
            },
            {
                id: `item-${uuidv4()}`,
                title: "Maquetar vista de estadísticas",
                priority: "LOW",
                description:
                    "Diseñar y desarrollar la vista de métricas y estadísticas utilizando Tailwind CSS, con especial atención a la legibilidad de los datos, consistencia en el estilo visual y adaptabilidad a dispositivos de distintos tamaños.",
                dueDate: new Date("2025-04-11"),
                attachments: [mockAttachments[4]],
            },
            {
                id: `item-${uuidv4()}`,
                title: "Implementar login con OAuth2",
                priority: "HIGH",
                description:
                    "Integrar servicios de autenticación externos como Google y GitHub mediante OAuth2, asegurando el manejo correcto de tokens, seguridad en la sesión de usuario y el manejo de posibles errores durante el proceso de autenticación.",
                dueDate: new Date("2025-04-12"),
                attachments: [],
            },
            {
                id: `item-${uuidv4()}`,
                title: "Ajustar diseño mobile",
                priority: "MEDIUM",
                description:
                    "Revisar y optimizar la vista mobile del panel de control, asegurando la correcta adaptación de todos los elementos, facilitando la navegación y mejorando la experiencia de usuario en dispositivos móviles.",
                dueDate: new Date("2025-04-14"),
                attachments: [],
            },
        ],
    },
    {
        id: `column-${uuidv4()}`,
        name: "Review",
        items: [
            {
                id: `item-${uuidv4()}`,
                title: "Test de componentes",
                priority: "LOW",
                description:
                    "Escribir y ejecutar pruebas unitarias para los nuevos componentes de React, garantizando que cumplan con la funcionalidad esperada y evitando regresiones en futuras actualizaciones del código.",
                dueDate: new Date("2025-04-12"),
                attachments: [],
            },
            {
                id: `item-${uuidv4()}`,
                title: "Code review de módulo Auth",
                priority: "HIGH",
                description:
                    "Realizar una revisión en profundidad del módulo de autenticación, verificando la correcta implementación de las políticas de seguridad, consistencia en la sintaxis y asegurando la calidad del código antes de realizar el merge.",
                dueDate: new Date("2025-04-13"),
                attachments: [],
            },
            {
                id: `item-${uuidv4()}`,
                title: "Revisión de estilos",
                priority: "MEDIUM",
                description:
                    "Auditar y ajustar la consistencia en el uso de paddings, márgenes y paletas de colores en toda la aplicación, garantizando que el diseño sea coherente y responda a las guías de estilo definidas.",
                dueDate: new Date("2025-04-15"),
                attachments: [],
            },
        ],
    },
    {
        id: `column-${uuidv4()}`,
        name: "Done",
        items: [
            {
                id: `item-${uuidv4()}`,
                title: "Configurar CI/CD con GitHub Actions",
                priority: "MEDIUM",
                description:
                    "Configurar e integrar un pipeline de CI/CD utilizando GitHub Actions para automatizar el proceso de build, testing y despliegue, asegurando una integración continua y reduciendo errores en producción.",
                attachments: [mockAttachments[1]],
            },
            {
                id: `item-${uuidv4()}`,
                title: "Setup de proyecto con Vite + React + TS",
                priority: "HIGH",
                description:
                    "Establecer la base del proyecto utilizando Vite, React y TypeScript, creando una estructura inicial óptima y escalable que permita un desarrollo ágil, modular y fácil de mantener.",
                dueDate: new Date("2025-04-09"),
                attachments: [],
            },
            {
                id: `item-${uuidv4()}`,
                title: "Documentación inicial",
                priority: "LOW",
                description:
                    "Crear un Readme exhaustivo y detallado que incluya instrucciones para developers, información sobre la estructura del proyecto, convenciones de código y pautas para futuras integraciones.",
                attachments: [mockAttachments[3]],
            },
        ],
    },
];
