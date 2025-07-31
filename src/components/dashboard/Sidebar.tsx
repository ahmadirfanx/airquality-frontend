import { motion } from 'framer-motion';
import { 
  Settings, 
  TrendingUp, 
  BarChart3, 
  Thermometer,
  Wind,
  Activity
} from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  AIR_QUALITY_PARAMETERS, 
  PARAMETER_CATEGORIES
} from '@/utils/constants';
import { AirQualityParameter } from '@/types/api.types';
import { cn } from '@/lib/utils';

interface SidebarProps {
  selectedParameters: AirQualityParameter[];
  onParameterToggle: (parameter: AirQualityParameter) => void;
  onSelectAll: (category?: string) => void;
  onClearAll: () => void;
  className?: string;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'pollutant':
      return <Activity className="w-4 h-4" />;
    case 'sensor':
      return <BarChart3 className="w-4 h-4" />;
    case 'environmental':
      return <Thermometer className="w-4 h-4" />;
    default:
      return <Wind className="w-4 h-4" />;
  }
};

export const Sidebar = ({
  selectedParameters,
  onParameterToggle,
  onSelectAll,
  onClearAll,
  className,
}: SidebarProps) => {
  const groupedParameters = Object.entries(AIR_QUALITY_PARAMETERS).reduce(
    (acc, [key, value]) => {
      const category = value.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({ key: key as AirQualityParameter, ...value });
      return acc;
    },
    {} as Record<string, Array<{ key: AirQualityParameter } & typeof AIR_QUALITY_PARAMETERS[AirQualityParameter]>>
  );

  return (
    <div className={cn('w-80 space-y-4', className)}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              Parameters
            </h2>
            <Settings className="w-4 h-4 text-muted-foreground" />
          </div>
          
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSelectAll()}
              className="glass-button flex-1"
            >
              Select All
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onClearAll}
              className="glass-button flex-1"
            >
              Clear All
            </Button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Parameter Categories */}
      <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
        {Object.entries(groupedParameters).map(([category, parameters], categoryIndex) => {
          const categoryInfo = PARAMETER_CATEGORIES[category as keyof typeof PARAMETER_CATEGORIES];
          const categorySelected = parameters.filter(p => selectedParameters.includes(p.key));
          
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
            >
              <GlassCard>
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground flex items-center">
                      <span 
                        className="mr-2 p-1.5 rounded-lg bg-white/10"
                        style={{ color: categoryInfo.color }}
                      >
                        {getCategoryIcon(category)}
                      </span>
                      {categoryInfo.label}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {categorySelected.length}/{parameters.length}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {categoryInfo.description}
                  </p>
                </div>

                <div className="space-y-2">
                  {parameters.map((param, paramIndex) => {
                    const isSelected = selectedParameters.includes(param.key);
                    
                    return (
                      <motion.div
                        key={param.key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: categoryIndex * 0.1 + paramIndex * 0.05, 
                          duration: 0.3 
                        }}
                        className={cn(
                          'flex items-center space-x-3 p-2 rounded-lg transition-all',
                          'hover:bg-white/5 cursor-pointer',
                          isSelected && 'bg-white/10 ring-1 ring-primary/20'
                        )}
                        onClick={() => onParameterToggle(param.key)}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => onParameterToggle(param.key)}
                          className="border-border"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: param.color }}
                            />
                            <span className="text-sm font-medium text-foreground truncate">
                              {param.label}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {param.unit}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};