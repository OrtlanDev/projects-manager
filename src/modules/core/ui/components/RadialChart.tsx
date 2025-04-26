import { ChartContainer } from "@/modules/core/ui/components/shadcn/chart";
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
    // transform from percentage to angle in radians
    const endAngle = percentage * -3.6;

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
