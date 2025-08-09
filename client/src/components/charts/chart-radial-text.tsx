"use client"

import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts"

import {
    Card,
    CardContent
} from "@/components/ui/card"
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

export const description = "A radial chart with text"

const chartData = [
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]

export function ChartRadialText(chartConfig: { chartConfig: ChartConfig }) {
    return (
        <Card className="flex flex-col col-span-1 py-0">
            <CardContent className="flex-1 pb-0 px-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[200px]"
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={0}
                        endAngle={250}
                        innerRadius={55}
                        outerRadius={90}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-muted last:fill-background"
                            polarRadius={[62, 50]}
                        />
                        <RadialBar dataKey="visitors" background cornerRadius={10} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-lg font-bold"
                                                >
                                                    {chartData[0].visitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground text-xs"
                                                >
                                                    Visitors
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
