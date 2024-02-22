import React, { PureComponent } from "react";
import { PieChart, Pie, ResponsiveContainer, Legend, Cell } from "recharts";

const data = [
  { name: "62% Owner Reservation", value: 62 },
  { name: "13% Launchpad", value: 13 },
  { name: "23% LP", value: 23 },
];
const COLORS = ["#FFC900", "#FF974C", "#EAEAEB"];

export default class AllocationChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            align="left"
            verticalAlign="top"
            formatter={(value) => {
              return <span className="pb-4 text-neutral-500">{value}</span>;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
