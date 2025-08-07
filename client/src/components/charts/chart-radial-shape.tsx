"use client"

import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart
} from "recharts"

import {
    Card,
    CardContent
} from "@/components/ui/card"
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

export const description = "A radial chart with a custom shape"

const chartData = [
    { browser: "safari", visitors: 1000, fill: "var(--color-safari)" },
]

const chartConfig = {
    visitors: {
        label: "Jobs",
    },
    safari: {
        label: "Safari",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function ChartRadialShape({ label }: { label: string }) {
    return (
        <Card className="flex flex-col m-0 p-0">
            <CardContent className="flex-1 pb-0 m-0 p-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={100}
                        innerRadius={65}
                        outerRadius={110}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-muted last:fill-background"
                            polarRadius={[70, 58]}
                        />
                        <RadialBar dataKey="visitors" background />
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
                                                    className="fill-foreground text-xl font-bold"
                                                >
                                                    {chartData[0].visitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {label}
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
