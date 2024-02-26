import React from "react";
import { PieChart, Pie, ResponsiveContainer, Legend, Cell } from "recharts";
import { useWindowSize } from "@uidotdev/usehooks";

const data = [
  { name: "62% Owner Reservation", value: 62 },
  { name: "13% Launchpad", value: 13 },
  { name: "23% LP", value: 23 },
];
const COLORS = ["#FFC900", "#FF974C", "#EAEAEB"];

export default function AllocationChart() {
  const { width } = useWindowSize();
  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          layout={width !== null && width > 1400 ? "vertical" : "horizontal"}
          align={width !== null && width > 1400 ? "left" : "center"}
          verticalAlign={width !== null && width > 1400 ? "top" : "bottom"}
          formatter={(value) => {
            return <span className="pb-4 text-neutral-500">{value}</span>;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
