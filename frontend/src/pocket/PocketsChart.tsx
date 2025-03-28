import { Pocket, Pockets } from "@/types/Pocket";
import { useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Cell, Label, Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer } from "../components/ui/chart";
import { Card, CardContent, CardFooter } from "../components/ui/card";

export const CategoriesChart = ({ data }: { data: Pockets }) => {
  const chartConfig = {
    total: {
      label: "Total",
    },
  } satisfies ChartConfig;
  const total = useMemo(() => {
    return data.reduce((acc, pocket) => acc + (pocket.transactionSum ?? 0), 0);
  }, [data]);
  const [selection, setSelection] = useState<Pocket>();
  const isDesktop = useMediaQuery({
    query: `(min-width: 1200px)`,
  });

  const getPercent = (transactionSum?: number) => {
    return transactionSum ? (transactionSum / total) * 100 : 0;
  };

  const renderLabel = (entry: Pocket) => {
    return isDesktop && !selection
      ? entry.name + " " + getPercent(entry.transactionSum).toFixed(0) + "%"
      : "";
  };


  const calculateChartIndex = (index: number): number => {
    const calculatedModulo = (index + 1) % 9;
    if (calculatedModulo === 0) {
      console.log(`Before: ${index}, Modulo ${calculatedModulo},  After (forced) ${1}`)
      return 1;
    } else {
      console.log(`Before: ${index}, Modulo ${calculatedModulo}, After ${calculatedModulo}`)
      return calculatedModulo;
    }
  }

  return (
    <Card className="flex flex-col py-1">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-sm:aspect-square max-h-[350px]"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="transactionSum"
              nameKey="name"
              innerRadius={80}
              strokeWidth={1}
              label={renderLabel}
              labelLine={false}
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
                        {selection ? (
                          <>
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {selection.transactionSum?.toFixed(2)}€
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              {selection.name}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 42}
                              className="fill-muted-foreground"
                            >
                              <a onClick={() => setSelection(undefined)}>
                                Reset
                              </a>
                            </tspan>
                          </>
                        ) : (
                          <>
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {total.toFixed(2)}€
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Total
                            </tspan>
                          </>
                        )}
                      </text>
                    );
                  }
                }}
              />
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`var(--chart-${calculateChartIndex(index)})`}
                  className="cursor-pointer"
                  onClick={() => setSelection(entry)}
                ></Cell>
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  );
};
