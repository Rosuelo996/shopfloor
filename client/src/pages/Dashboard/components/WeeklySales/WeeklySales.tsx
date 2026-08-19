import styles from "./WeeklySales.module.css";
import type { WeeklySalesData } from "../../../../types/dashboard";

import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

type Props = {
  weeklySales: WeeklySalesData[];
};

export default function WeeklySales({ weeklySales }: Props) {
  return (
    <section className={styles.weeklySales}>
      <div className={styles.header}>
        <div>
          <h2>Weekly Sales</h2>
          <p>Sales performance this week</p>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.legend}>
            <span>Sales</span>
            <span>Target</span>
          </div>

          <Link to="/trends" className={styles.viewAll}>
            View all trends 
            <span>→</span>
          </Link>
        </div>
      </div>

      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={weeklySales}
            margin={{ top: 16, right: 12, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="#eef2f7" />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              tick={{
                fontSize: 12,
                fill: "#64748b",
              }}
            />

            <YAxis
              ticks={[0, 10000, 20000, 30000, 40000]}
              domain={[0, 40000]}
              tickFormatter={(value) =>
                value === 0 ? "£0" : `£${value / 1000}K`
              }
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              width={46}
              tick={{
                fontSize: 11,
                fill: "#94a3b8",
              }}
            />

            <Tooltip />

            <Area
              type="linear"
              dataKey="sales"
              stroke="#1d4ed8"
              strokeWidth={2.5}
              fill="#3b82f6"
              fillOpacity={0.1}
              dot={{
                r: 3.5,
                fill: "#ffffff",
                stroke: "#1d4ed8",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 5,
                fill: "#1d4ed8",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />

            <Line
              type="linear"
              dataKey="salesTarget"
              stroke="#94a3b8"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
