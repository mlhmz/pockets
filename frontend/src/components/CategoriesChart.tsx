import { CategoryTransactions } from "@/types/Transaction";
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartConfig = {
  total: {
    label: "Total",
  },
  VACATION: {
    label: "Vacation",
    color: "hsl(var(--chart-1))",
  },
  LIABILITY: {
    label: "Liability",
    color: "hsl(var(--chart-2))",
  },
  GAS: {
    label: "Gas",
    color: "hsl(var(--chart-3))",
  },
  CAR_INSURANCE: {
    label: "Car Insurance",
    color: "hsl(var(--chart-4))",
  },
  PUBLIC_BROADCAST: {
    label: "Public Broadcast",
    color: "hsl(var(--chart-5))",
  },
  NO_CATEGORY: {
    label: "No Category",
    color: "hsl(var(--muted))",
  },
} satisfies ChartConfig;

export const CategoriesChart = ({ data }: { data: CategoryTransactions }) => {
  const sum = useMemo(() => {
    return data.reduce((acc, category) => acc + (category.sum ?? 0), 0);
  }, [data]);
  const chartData = useMemo(() => {
    return data.map((entry) => {
      return {
        type: entry.type,
        sum: entry.sum ?? 0,
        fill: `var(--color-${entry.type})`,
      };
    });
  }, [data]);

  return (
    <Card className="flex flex-col my-2 py-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="sum"
              nameKey="type"
              innerRadius={80}
              strokeWidth={1}
            >
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {sum.toFixed(2)}€
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  );
};
