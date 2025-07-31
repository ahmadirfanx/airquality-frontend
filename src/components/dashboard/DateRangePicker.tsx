import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { GlassCard } from '@/components/common/GlassCard';
import { DATE_PRESETS } from '@/utils/constants';
import { motion } from 'framer-motion';

interface DateRangePickerProps {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  onDateRangeChange: (start: Date | null, end: Date | null) => void;
  className?: string;
}

export const DateRangePicker = ({
  dateRange,
  onDateRangeChange,
  className,
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePresetClick = (preset: typeof DATE_PRESETS[0]) => {
    if (preset.value === null) {
      onDateRangeChange(null, null);
    } else {
      const end = new Date();
      const start = new Date();
      
      if (preset.unit === 'day') {
        start.setDate(end.getDate() - preset.value);
      } else if (preset.unit === 'month') {
        start.setMonth(end.getMonth() - preset.value);
      } else if (preset.unit === 'year') {
        start.setFullYear(end.getFullYear() - preset.value);
      }
      
      onDateRangeChange(start, end);
    }
    setIsOpen(false);
  };

  const formatDateRange = () => {
    if (!dateRange.start && !dateRange.end) {
      return 'All time';
    }
    if (dateRange.start && dateRange.end) {
      return `${format(dateRange.start, 'MMM dd')} - ${format(dateRange.end, 'MMM dd, yyyy')}`;
    }
    if (dateRange.start) {
      return `From ${format(dateRange.start, 'MMM dd, yyyy')}`;
    }
    if (dateRange.end) {
      return `Until ${format(dateRange.end, 'MMM dd, yyyy')}`;
    }
    return 'Select date range';
  };

  return (
    <div className={cn('flex flex-col sm:flex-row gap-4', className)}>
      {/* Quick presets */}
      <div className="flex flex-wrap gap-2">
        {DATE_PRESETS.map((preset, index) => (
          <motion.div
            key={preset.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePresetClick(preset)}
              className="glass-button text-xs"
            >
              <Clock className="w-3 h-3 mr-1" />
              {preset.label}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Custom date picker */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'glass-button justify-start text-left font-normal min-w-[280px]',
              !dateRange.start && !dateRange.end && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <GlassCard padding="md">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Start Date</h4>
                <Calendar
                  mode="single"
                  selected={dateRange.start || undefined}
                  onSelect={(date) => onDateRangeChange(date || null, dateRange.end)}
                  className="pointer-events-auto"
                />
              </div>
              
              <div>
                <h4 className="font-medium mb-2">End Date</h4>
                <Calendar
                  mode="single"
                  selected={dateRange.end || undefined}
                  onSelect={(date) => onDateRangeChange(dateRange.start, date || null)}
                  disabled={(date) => 
                    dateRange.start ? date < dateRange.start : false
                  }
                  className="pointer-events-auto"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onDateRangeChange(null, null);
                    setIsOpen(false);
                  }}
                  className="flex-1"
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  Apply
                </Button>
              </div>
            </div>
          </GlassCard>
        </PopoverContent>
      </Popover>
    </div>
  );
};