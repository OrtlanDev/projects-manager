import { ChartContainer } from "@/modules/core/ui/components/shadcn/chart";
import { PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

interface RadialChartProps {
    percentage: number;
    fillColor?: string;
}

function RadialChart({ percentage, fillColor = "var(--color-safari)" }: RadialChartProps) {
    // Validar que el porcentaje sea un número y esté en el rango de 0 a 100
    const validPercentage = !isNaN(percentage) && percentage >= 0 && percentage <= 100 ? percentage : 0;

    // Transformar el porcentaje a un ángulo en radianes
    const endAngle = validPercentage * -3.6; // Esto convierte el porcentaje a un ángulo en grados

    // Asegurarse de que el ángulo no sea NaN
    if (isNaN(endAngle)) {
        console.error("Invalid angle calculation for percentage:", validPercentage);
    }

    const data = [
        {
            name: "progress",
            value: validPercentage,
            fill: fillColor,
        },
    ];

    return (
        <ChartContainer config={{}} className="w-6 h-6 -rotate-90 ">
            <RadialBarChart data={data} startAngle={0} endAngle={endAngle} innerRadius={10} outerRadius={15}>
                <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    className="first:fill-sidebar-border last:fill-background"
                    polarRadius={[11, 9]}
                />
                <RadialBar dataKey="value" background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} />
            </RadialBarChart>
        </ChartContainer>
    );
}

export default RadialChart;
