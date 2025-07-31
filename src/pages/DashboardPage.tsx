import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import {
  TimeSeriesChart,
  ParameterBarChart,
} from "@/components/charts/CustomChart";
import {
  StatisticsCard,
  StatisticsGrid,
} from "@/components/charts/StatisticsCard";
import { GlassCard } from "@/components/common/GlassCard";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { useAppStore } from "@/stores/useAppStore";
import { useChartData } from "@/hooks/useChartData";
import { formatDate } from "@/utils/formatters";

const DashboardPage = () => {
  const { selectedParameters, dateRange, setDateRange } = useAppStore();

  // Convert dates to API format
  const apiDateRange = {
    startDate: dateRange.start
      ? formatDate(dateRange.start, "yyyy-MM-dd")
      : undefined,
    endDate: dateRange.end
      ? formatDate(dateRange.end, "yyyy-MM-dd")
      : undefined,
  };

  // Use chart data hook
  const {
    timeSeriesData: chartData,
    barChartData,
    totalDataPoints,
    statisticalData,
    averageQuality,
    isLoading,
    error,
  } = useChartData(
    selectedParameters,
    apiDateRange,
    selectedParameters.length > 0
  );

  const timeSeriesLoading = isLoading;
  const timeSeriesError = error;
  const statisticsLoading = isLoading;
  const statisticsError = error;

  if (selectedParameters.length === 0) {
    return (
      <DashboardLayout>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <GlassCard className="max-w-md mx-auto">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Select Parameters
            </h2>
            <p className="text-muted-foreground">
              Choose air quality parameters from the sidebar to start
              visualizing your data.
            </p>
          </GlassCard>
        </motion.div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Date Range Picker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Key Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatisticsCard
              title="Data Points"
              value={totalDataPoints}
              icon={<div className="w-4 h-4 bg-primary rounded-full" />}
              color="#3b82f6"
            />
            <StatisticsCard
              title="Parameters"
              value={selectedParameters.length}
              icon={<div className="w-4 h-4 bg-success rounded-full" />}
              color="#10b981"
            />
            <StatisticsCard
              title="Time Range"
              value={
                dateRange.start && dateRange.end
                  ? Math.ceil(
                      (dateRange.end.getTime() - dateRange.start.getTime()) /
                        (1000 * 60 * 60 * 24)
                    )
                  : null
              }
              unit="days"
              icon={<div className="w-4 h-4 bg-warning rounded-full" />}
              color="#f59e0b"
            />
            <StatisticsCard
              title="Avg Quality"
              value={averageQuality}
              unit="%"
              change={2.3}
              changeType="increase"
              icon={<div className="w-4 h-4 bg-accent rounded-full" />}
              color="#8b5cf6"
            />
          </div>
        </motion.div>

        {/* Time Series Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <GlassCard>
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              Time Series Analysis
            </h2>
            {timeSeriesLoading ? (
              <div className="flex items-center justify-center py-16">
                <LoadingSpinner size="lg" />
              </div>
            ) : timeSeriesError ? (
              <ErrorMessage
                title="Failed to load time series data"
                message="Please check your connection and try again."
              />
            ) : chartData.length === 0 ? (
              <div className="flex items-center justify-center py-16 text-muted-foreground">
                No data available for the selected parameters and date range.
              </div>
            ) : (
              <TimeSeriesChart
                data={chartData}
                parameters={selectedParameters}
              />
            )}
          </GlassCard>
        </motion.div>

        {/* Parameter Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <GlassCard>
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              Parameter Comparison
            </h2>
            {statisticsLoading ? (
              <div className="flex items-center justify-center py-16">
                <LoadingSpinner size="lg" />
              </div>
            ) : statisticsError ? (
              <ErrorMessage
                title="Failed to load statistics"
                message="Please check your connection and try again."
              />
            ) : barChartData.length === 0 ? (
              <div className="flex items-center justify-center py-16 text-muted-foreground">
                No statistics available for the selected parameters.
              </div>
            ) : (
              <ParameterBarChart data={barChartData} />
            )}
          </GlassCard>
        </motion.div>

        {/* Detailed Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <GlassCard>
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              Detailed Statistics
            </h2>
            <StatisticsGrid statistics={statisticalData} />
          </GlassCard>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
