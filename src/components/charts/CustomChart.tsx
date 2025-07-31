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
} from 'recharts';
import { motion } from 'framer-motion';
import { formatDate, formatParameterValue } from '@/utils/formatters';
import { AIR_QUALITY_PARAMETERS } from '@/utils/constants';

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

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length && label) {
    return (
      <div className="chart-tooltip">
        <p className="font-medium mb-2">{formatDate(label, 'MMM dd, yyyy HH:mm')}</p>
        {payload.map((entry, index) => {
          const paramInfo = AIR_QUALITY_PARAMETERS[entry.dataKey as keyof typeof AIR_QUALITY_PARAMETERS];
          const formattedValue = formatParameterValue(
            entry.value,
            entry.dataKey,
            paramInfo?.unit || ''
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

export const TimeSeriesChart = ({ data, parameters, className }: TimeSeriesChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => formatDate(value, 'MMM dd')}
            stroke="rgba(255,255,255,0.6)"
            fontSize={12}
          />
          <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {parameters.map((param, index) => {
            const paramInfo = AIR_QUALITY_PARAMETERS[param as keyof typeof AIR_QUALITY_PARAMETERS];
            return (
              <Line
                key={param}
                type="monotone"
                dataKey={param}
                stroke={paramInfo?.color || `hsl(${index * 60}, 70%, 50%)`}
                strokeWidth={2}
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

export const ParameterBarChart = ({ data, className }: ParameterBarChartProps) => {
  const chartData = data.map(item => {
    const paramInfo = AIR_QUALITY_PARAMETERS[item.parameter as keyof typeof AIR_QUALITY_PARAMETERS];
    return {
      ...item,
      name: paramInfo?.label || item.parameter,
      color: paramInfo?.color || '#3b82f6',
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={className}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="name"
            stroke="rgba(255,255,255,0.6)"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={100}
          />
          <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
            }}
          />
          <Bar
            dataKey="value"
            fill="url(#barGradient)"
            radius={[4, 4, 0, 0]}
          />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};