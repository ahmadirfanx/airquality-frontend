import { AirQualityParameter } from '@/types/api.types';

export const AIR_QUALITY_PARAMETERS: Record<AirQualityParameter, {
  label: string;
  unit: string;
  color: string;
  category: 'pollutant' | 'sensor' | 'environmental';
  description: string;
}> = {
  co: {
    label: 'Carbon Monoxide',
    unit: 'mg/m³',
    color: '#ef4444',
    category: 'pollutant',
    description: 'Toxic gas from incomplete combustion'
  },
  nmhc: {
    label: 'Non-Methane Hydrocarbons',
    unit: 'μg/m³',
    color: '#f59e0b',
    category: 'pollutant',
    description: 'Volatile organic compounds excluding methane'
  },
  benzene: {
    label: 'Benzene',
    unit: 'μg/m³',
    color: '#8b5cf6',
    category: 'pollutant',
    description: 'Aromatic hydrocarbon, known carcinogen'
  },
  nox: {
    label: 'Nitrogen Oxides',
    unit: 'ppb',
    color: '#06b6d4',
    category: 'pollutant',
    description: 'Gases contributing to smog and acid rain'
  },
  no2: {
    label: 'Nitrogen Dioxide',
    unit: 'μg/m³',
    color: '#3b82f6',
    category: 'pollutant',
    description: 'Respiratory irritant, contributes to smog'
  },
  pt08_s1_co: {
    label: 'CO Sensor (PT08.S1)',
    unit: 'μg/m³',
    color: '#10b981',
    category: 'sensor',
    description: 'Tin oxide sensor for CO detection'
  },
  pt08_s2_nmhc: {
    label: 'NMHC Sensor (PT08.S2)',
    unit: 'μg/m³',
    color: '#f97316',
    category: 'sensor',
    description: 'Titania sensor for NMHC detection'
  },
  pt08_s3_nox: {
    label: 'NOx Sensor (PT08.S3)',
    unit: 'μg/m³',
    color: '#84cc16',
    category: 'sensor',
    description: 'Tungsten oxide sensor for NOx detection'
  },
  pt08_s4_no2: {
    label: 'NO2 Sensor (PT08.S4)',
    unit: 'μg/m³',
    color: '#a855f7',
    category: 'sensor',
    description: 'Tungsten oxide sensor for NO2 detection'
  },
  pt08_s5_o3: {
    label: 'O3 Sensor (PT08.S5)',
    unit: 'μg/m³',
    color: '#ec4899',
    category: 'sensor',
    description: 'Indium oxide sensor for O3 detection'
  },
  temperature: {
    label: 'Temperature',
    unit: '°C',
    color: '#f59e0b',
    category: 'environmental',
    description: 'Ambient temperature'
  },
  relative_humidity: {
    label: 'Relative Humidity',
    unit: '%',
    color: '#06b6d4',
    category: 'environmental',
    description: 'Moisture content in air'
  },
  absolute_humidity: {
    label: 'Absolute Humidity',
    unit: 'g/m³',
    color: '#0ea5e9',
    category: 'environmental',
    description: 'Total water vapor content'
  }
};

export const PARAMETER_CATEGORIES = {
  pollutant: {
    label: 'Air Pollutants',
    color: '#ef4444',
    description: 'Harmful substances in the air'
  },
  sensor: {
    label: 'Sensor Readings',
    color: '#10b981',
    description: 'Raw sensor measurements'
  },
  environmental: {
    label: 'Environmental',
    color: '#3b82f6',
    description: 'Weather and atmospheric conditions'
  }
};

export const DATE_PRESETS = [
  { label: 'Last 24 hours', value: 1, unit: 'day' },
  { label: 'Last 7 days', value: 7, unit: 'day' },
  { label: 'Last 30 days', value: 30, unit: 'day' },
  { label: 'Last 3 months', value: 3, unit: 'month' },
  { label: 'Last 6 months', value: 6, unit: 'month' },
  { label: 'Last year', value: 1, unit: 'year' },
  { label: 'All time', value: null, unit: null }
];

export const AIR_QUALITY_THRESHOLDS = {
  co: {
    good: 4.4,
    moderate: 9.4,
    unhealthy: 12.4,
    veryUnhealthy: 15.4
  },
  no2: {
    good: 53,
    moderate: 100,
    unhealthy: 360,
    veryUnhealthy: 649
  },
  benzene: {
    good: 5,
    moderate: 10,
    unhealthy: 20,
    veryUnhealthy: 50
  }
};

export const CHART_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1',
  '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6'
];

export const FILE_UPLOAD_CONFIG = {
  maxSize: 50 * 1024 * 1024, // 50MB
  acceptedTypes: ['.csv', 'text/csv', 'application/csv'],
  maxFiles: 1
};

export const POLLING_INTERVALS = {
  ingestion: 2000, // 2 seconds
  liveData: 30000, // 30 seconds
  healthCheck: 60000 // 1 minute
};