import { create } from 'zustand';
import { AirQualityParameter } from '@/types/api.types';

interface AppState {
  // Selected parameters for visualization
  selectedParameters: AirQualityParameter[];
  setSelectedParameters: (parameters: AirQualityParameter[]) => void;
  toggleParameter: (parameter: AirQualityParameter) => void;

  // Date range selection
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  setDateRange: (start: Date | null, end: Date | null) => void;

  // UI state
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Error state
  error: string | null;
  setError: (error: string | null) => void;

  // Chart configuration
  chartConfig: {
    showGrid: boolean;
    showLegend: boolean;
    animationEnabled: boolean;
    zoomEnabled: boolean;
  };
  updateChartConfig: (config: Partial<AppState['chartConfig']>) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  selectedParameters: ['co', 'no2', 'temperature'],
  dateRange: {
    start: null,
    end: null,
  },
  sidebarCollapsed: false,
  isLoading: false,
  error: null,
  chartConfig: {
    showGrid: true,
    showLegend: true,
    animationEnabled: true,
    zoomEnabled: true,
  },

  // Actions
  setSelectedParameters: (parameters) => set({ selectedParameters: parameters }),
  
  toggleParameter: (parameter) => {
    const { selectedParameters } = get();
    const isSelected = selectedParameters.includes(parameter);
    
    if (isSelected) {
      set({
        selectedParameters: selectedParameters.filter(p => p !== parameter)
      });
    } else {
      set({
        selectedParameters: [...selectedParameters, parameter]
      });
    }
  },

  setDateRange: (start, end) => set({
    dateRange: { start, end }
  }),

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  setIsLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  updateChartConfig: (config) => set(state => ({
    chartConfig: { ...state.chartConfig, ...config }
  })),
}));