import { ChartContainer } from "@/components/ui/chart";
import { PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

interface RadialChartProps {
    percentage: number;
    fillColor?: string;
}

function RadialChart({ percentage, fillColor = "var(--color-safari)" }: RadialChartProps) {
    const data = [
        {
            name: "progress",
            value: percentage,
            fill: fillColor,
        },
    ];
    const endAngle = percentage * -3.6; // transform from percentage to angle in radians

    return (
        <ChartContainer config={{}} className="w-6 h-6 -rotate-90 ">
            <RadialBarChart data={data} startAngle={0} endAngle={endAngle} innerRadius={10} outerRadius={20}>
                <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    className="first:fill-sidebar-border last:fill-background"
                    polarRadius={[12, 8]}
                />
                <RadialBar dataKey="value" background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} />
            </RadialBarChart>
        </ChartContainer>
    );
}

export default RadialChart;
