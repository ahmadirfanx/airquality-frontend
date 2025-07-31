import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { formatDate, formatParameterValue } from "@/utils/formatters";
import { AIR_QUALITY_PARAMETERS } from "@/utils/constants";

interface ChartData {
  timestamp: string;
  [key: string]: string | number | null;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
    payload: any;
  }>;
  label?: string;
}

const generateColor = (index: number) => `hsl(${index * 45}, 70%, 60%)`;

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length && label) {
    return (
      <div className="chart-tooltip">
        <p className="font-medium mb-2">
          {formatDate(label, "MMM dd, yyyy HH:mm")}
        </p>
        {payload.map((entry, index) => {
          const paramInfo =
            AIR_QUALITY_PARAMETERS[
              entry.dataKey as keyof typeof AIR_QUALITY_PARAMETERS
            ];
          const formattedValue = formatParameterValue(
            entry.value,
            entry.dataKey,
            paramInfo?.unit || ""
          );

          return (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm">
                {paramInfo?.label || entry.dataKey}: {formattedValue}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

interface TimeSeriesChartProps {
  data: ChartData[];
  parameters: string[];
  className?: string;
}

export const TimeSeriesChart = ({
  data,
  parameters,
  className,
}: TimeSeriesChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${className} bg-gradient-to-b from-[#1e293b] to-[#0f172a] p-4 rounded-2xl shadow-xl`}
    >
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => formatDate(value, "MMM dd")}
            stroke="rgba(255,255,255,0.6)"
            fontSize={12}
          />
          <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: "white", fontSize: "14px" }} />
          {parameters.map((param, index) => {
            const paramInfo =
              AIR_QUALITY_PARAMETERS[
                param as keyof typeof AIR_QUALITY_PARAMETERS
              ];
            const color = paramInfo?.color || generateColor(index);
            return (
              <Line
                key={param}
                type="monotone"
                dataKey={param}
                stroke={color}
                strokeWidth={2.5}
                dot={false}
                name={paramInfo?.label || param}
                connectNulls={false}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

interface ParameterBarChartProps {
  data: Array<{
    parameter: string;
    value: number;
  }>;
  className?: string;
}

export const ParameterBarChart = ({
  data,
  className,
}: ParameterBarChartProps) => {
  const chartData = data.map((item, index) => {
    const paramInfo =
      AIR_QUALITY_PARAMETERS[
        item.parameter as keyof typeof AIR_QUALITY_PARAMETERS
      ];
    return {
      ...item,
      name: paramInfo?.label || item.parameter,
      color: paramInfo?.color || generateColor(index),
      gradientId: `barGradient-${index}`,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`${className} bg-gradient-to-b from-[#1e293b] to-[#0f172a] p-4 rounded-2xl shadow-xl`}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="name"
            stroke="rgba(255,255,255,0.6)"
            fontSize={12}
            angle={-30}
            textAnchor="end"
            height={70}
          />
          <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              backdropFilter: "blur(8px)",
              color: "white",
            }}
          />
          {chartData.map((item, index) => (
            <Bar
              key={item.parameter}
              dataKey="value"
              fill={`url(#${item.gradientId})`}
              radius={[6, 6, 0, 0]}
              name={item.name}
            />
          ))}

          <defs>
            {chartData.map((item, index) => (
              <linearGradient
                key={index}
                id={item.gradientId}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={item.color} stopOpacity={0.8} />
                <stop offset="100%" stopColor={item.color} stopOpacity={0.3} />
              </linearGradient>
            ))}
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
