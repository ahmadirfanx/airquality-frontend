import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Clock, 
  Menu, 
  X, 
  Download,
  RefreshCw,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/common/GlassCard';
import { formatDateTime } from '@/utils/formatters';

interface HeaderProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  onRefresh?: () => void;
  onExport?: () => void;
  className?: string;
}

export const Header = ({
  sidebarOpen,
  onSidebarToggle,
  onRefresh,
  onExport,
  className,
}: HeaderProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <GlassCard className="flex items-center justify-between" padding="md">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSidebarToggle}
            className="lg:hidden glass-button"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="p-2 bg-primary/20 rounded-lg">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Air Quality Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Environmental Data Analytics
              </p>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground"
          >
            <Clock className="w-4 h-4" />
            <span className="font-mono">
              {formatDateTime(currentTime)}
            </span>
          </motion.div>

          <div className="flex items-center space-x-2">
            {onRefresh && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                className="glass-button"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:ml-2 sm:inline">Refresh</span>
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              className="glass-button"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.header>
  );
};