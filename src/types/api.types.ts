export interface AirQualityMeasurement {
  timestamp: string;
  co: number | null;
  nmhc: number | null;
  benzene: number | null;
  nox: number | null;
  no2: number | null;
  pt08_s1_co: number | null;
  pt08_s2_nmhc: number | null;
  pt08_s3_nox: number | null;
  pt08_s4_no2: number | null;
  pt08_s5_o3: number | null;
  temperature: number | null;
  relative_humidity: number | null;
  absolute_humidity: number | null;
}

export interface IngestionJob {
  jobId: string;
  status: 'processing' | 'completed' | 'failed';
  progress?: {
    processed: number;
    total: number;
    percentage: number;
  };
  error?: string;
  startTime?: string;
  endTime?: string;
}

// Response wrapper from API
export interface IngestionStatusResponse {
  success: boolean;
  message: string;
  data: {
    jobId: string;
    state: 'processing' | 'completed' | 'failed';
    trackingUrl: string;
  };
}

export interface TimeSeriesData {
  parameter: string;
  data: Array<{
    timestamp: string;
    value: number;
  }>;
}

export interface StatisticsData {
  parameter: string;
  min: number;
  max: number;
  average: number;
  stdDev: number;
  count: number;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    jobId: string;
  };
}

export interface HealthCheck {
  status: 'ok' | 'error';
  timestamp: string;
  version?: string;
}

export type AirQualityParameter = 
  | 'co' 
  | 'nmhc' 
  | 'benzene' 
  | 'nox' 
  | 'no2' 
  | 'pt08_s1_co' 
  | 'pt08_s2_nmhc' 
  | 'pt08_s3_nox' 
  | 'pt08_s4_no2' 
  | 'pt08_s5_o3' 
  | 'temperature' 
  | 'relative_humidity' 
  | 'absolute_humidity';

export interface ChartDataPoint {
  timestamp: string;
  [key: string]: string | number | null;
}