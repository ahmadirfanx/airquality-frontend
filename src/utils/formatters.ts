import { format, parseISO, isValid } from 'date-fns';

export const formatDate = (date: string | Date, formatString = 'MMM dd, yyyy'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return 'Invalid Date';
    return format(dateObj, formatString);
  } catch {
    return 'Invalid Date';
  }
};

export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, 'MMM dd, yyyy HH:mm');
};

export const formatTime = (date: string | Date): string => {
  return formatDate(date, 'HH:mm');
};

export const formatNumber = (
  value: number | null | undefined,
  decimals = 2,
  unit = ''
): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return 'N/A';
  }

  const formatted = value.toFixed(decimals);
  return unit ? `${formatted} ${unit}` : formatted;
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

export const formatParameterValue = (
  value: number | null,
  parameter: string,
  unit: string
): string => {
  if (value === null || value === undefined) return 'N/A';
  
  // Different decimal places for different parameter types
  let decimals = 2;
  if (parameter.includes('temperature')) decimals = 1;
  if (parameter.includes('humidity')) decimals = 1;
  if (parameter.includes('pt08')) decimals = 0;
  
  return formatNumber(value, decimals, unit);
};

export const formatAxisLabel = (value: number, unit: string): string => {
  if (Math.abs(value) >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M ${unit}`;
  } else if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(1)}K ${unit}`;
  }
  return `${value} ${unit}`;
};

export const formatTooltipValue = (
  value: number,
  unit: string,
  parameter: string
): [string, string] => {
  const formattedValue = formatParameterValue(value, parameter, unit);
  return [formattedValue, parameter];
};

export const truncateText = (text: string, maxLength = 20): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};