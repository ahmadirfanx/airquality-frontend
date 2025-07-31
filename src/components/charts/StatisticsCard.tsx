import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { GlassCard } from "@/components/common/GlassCard";
import { formatNumber } from "@/utils/formatters";
import { cn } from "@/lib/utils";

interface StatisticsCardProps {
  title: string;
  value: number | null;
  unit?: string;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  icon?: React.ReactNode;
  className?: string;
  color?: string;
}

export const StatisticsCard = ({
  title,
  value,
  unit = "",
  change,
  changeType = "neutral",
  icon,
  className,
  color = "#3b82f6",
}: StatisticsCardProps) => {
  const getTrendIcon = () => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="w-4 h-4" />;
      case "decrease":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = () => {
    switch (changeType) {
      case "increase":
        return "text-success";
      case "decrease":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <GlassCard className="relative overflow-hidden" hover glow>
        {/* Gradient accent */}
        <div
          className="absolute top-0 left-0 w-full h-1"
          style={{
            background: `linear-gradient(90deg, ${color}, transparent)`,
          }}
        />

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {icon && (
                <div className="p-2 rounded-lg bg-white/10" style={{ color }}>
                  {icon}
                </div>
              )}
              <h3 className="text-sm font-medium text-muted-foreground">
                {title}
              </h3>
            </div>

            <div className="space-y-1">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="text-2xl font-bold font-mono"
                style={{ color }}
              >
                {value !== null && value !== undefined
                  ? formatNumber(value, 2, unit)
                  : "N/A"}
              </motion.div>

              {change !== undefined && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className={cn(
                    "flex items-center space-x-1 text-xs",
                    getTrendColor()
                  )}
                >
                  {getTrendIcon()}
                  <span>{Math.abs(change).toFixed(1)}%</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

// Updated interface to match your backend API response
interface StatisticsGridProps {
  statistics?: Array<{
    parameter: string;
    min: number;
    max: number;
    avg: number; // Changed from 'average' to 'avg' to match your API
    stddev: number; // Changed from 'stdDev' to 'stddev' to match your API
    percentile_50?: number;
    percentile_95?: number;
    dataPoints?: number;
  }> | null;
  className?: string;
}

export const StatisticsGrid = ({
  statistics,
  className,
}: StatisticsGridProps) => {
  // Handle null, undefined, or empty statistics
  if (!statistics || !Array.isArray(statistics) || statistics.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <p className="text-muted-foreground">No statistics available</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        className
      )}
    >
      {statistics.map((stat, index) => {
        // Ensure stat is a valid object
        if (!stat || typeof stat !== "object") {
          return null;
        }

        return (
          <div key={stat.parameter || index} className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground capitalize">
              {stat.parameter
                ? stat.parameter.replace("_", " ")
                : "Unknown Parameter"}
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <StatisticsCard
                title="Min"
                value={typeof stat.min === "number" ? stat.min : null}
                color="#10b981"
              />
              <StatisticsCard
                title="Max"
                value={typeof stat.max === "number" ? stat.max : null}
                color="#ef4444"
              />
              <StatisticsCard
                title="Average"
                value={typeof stat.avg === "number" ? stat.avg : null}
                color="#3b82f6"
              />
              <StatisticsCard
                title="Std Dev"
                value={typeof stat.stddev === "number" ? stat.stddev : null}
                color="#8b5cf6"
              />
            </div>

            {/* Additional statistics if available */}
            {(stat.percentile_50 !== undefined ||
              stat.percentile_95 !== undefined) && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {stat.percentile_50 !== undefined && (
                  <StatisticsCard
                    title="50th %ile"
                    value={stat.percentile_50}
                    color="#f59e0b"
                  />
                )}
                {stat.percentile_95 !== undefined && (
                  <StatisticsCard
                    title="95th %ile"
                    value={stat.percentile_95}
                    color="#ec4899"
                  />
                )}
              </div>
            )}

            {stat.dataPoints !== undefined && (
              <div className="mt-2">
                <StatisticsCard
                  title="Data Points"
                  value={stat.dataPoints}
                  color="#6366f1"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
