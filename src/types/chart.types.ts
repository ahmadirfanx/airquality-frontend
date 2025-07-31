export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
    unit: string;
    visible: boolean;
  };
}

export interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
    payload: any;
  }>;
  label?: string;
}

export interface LegendProps {
  payload?: Array<{
    value: string;
    type: string;
    id: string;
    color: string;
  }>;
}

export interface ChartFilters {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  parameters: string[];
  aggregation: 'raw' | 'hourly' | 'daily';
}

export interface ChartData {
  timestamp: string;
  [parameter: string]: number | string | null;
}

export interface StatCard {
  label: string;
  value: number;
  unit: string;
  change?: number;
  changeType?: 'increase' | 'decrease';
  color: string;
}