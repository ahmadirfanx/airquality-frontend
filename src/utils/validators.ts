import { z } from 'zod';

export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 50 * 1024 * 1024, 'File size must be less than 50MB')
    .refine(
      (file) => file.type === 'text/csv' || file.name.endsWith('.csv'),
      'File must be a CSV file'
    ),
});

export const dateRangeSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export const parameterSelectionSchema = z.object({
  parameters: z.array(z.string()).min(1, 'At least one parameter must be selected'),
});

export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  try {
    fileUploadSchema.parse({ file });
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.issues[0].message };
    }
    return { isValid: false, error: 'Invalid file' };
  }
};

export const validateDateRange = (
  startDate?: Date | null,
  endDate?: Date | null
): { isValid: boolean; error?: string } => {
  if (!startDate && !endDate) {
    return { isValid: true }; // No dates selected is valid
  }

  if (startDate && endDate && startDate > endDate) {
    return { isValid: false, error: 'Start date must be before end date' };
  }

  const now = new Date();
  if (startDate && startDate > now) {
    return { isValid: false, error: 'Start date cannot be in the future' };
  }

  if (endDate && endDate > now) {
    return { isValid: false, error: 'End date cannot be in the future' };
  }

  return { isValid: true };
};

export const validateParameters = (
  parameters: string[]
): { isValid: boolean; error?: string } => {
  if (parameters.length === 0) {
    return { isValid: false, error: 'At least one parameter must be selected' };
  }

  if (parameters.length > 10) {
    return { isValid: false, error: 'Maximum 10 parameters can be selected' };
  }

  return { isValid: true };
};

export const sanitizeFilename = (filename: string): string => {
  return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
};

export const isValidJobId = (jobId: string): boolean => {
  // UUID v4 format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(jobId);
};

export const validateApiResponse = <T>(
  response: any,
  expectedFields: string[]
): { isValid: boolean; error?: string } => {
  if (!response || typeof response !== 'object') {
    return { isValid: false, error: 'Invalid response format' };
  }

  for (const field of expectedFields) {
    if (!(field in response)) {
      return { isValid: false, error: `Missing field: ${field}` };
    }
  }

  return { isValid: true };
};

export const validateTimeSeriesData = (data: any[]): boolean => {
  if (!Array.isArray(data)) return false;
  
  return data.every(item => 
    item && 
    typeof item === 'object' && 
    'timestamp' in item && 
    'value' in item &&
    (typeof item.value === 'number' || item.value === null)
  );
};