import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from './GlassCard';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
  variant?: 'default' | 'destructive' | 'warning';
}

const variantClasses = {
  default: 'border-border',
  destructive: 'border-destructive/20 bg-destructive/5',
  warning: 'border-warning/20 bg-warning/5',
};

const iconClasses = {
  default: 'text-muted-foreground',
  destructive: 'text-destructive',
  warning: 'text-warning',
};

export const ErrorMessage = ({
  title = 'Error',
  message,
  onRetry,
  onDismiss,
  className,
  variant = 'destructive',
}: ErrorMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      <GlassCard className={cn('relative', variantClasses[variant])}>
        <div className="flex items-start space-x-3">
          <AlertTriangle 
            className={cn('w-5 h-5 mt-0.5 flex-shrink-0', iconClasses[variant])} 
          />
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-foreground">
              {title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {message}
            </p>
            
            {(onRetry || onDismiss) && (
              <div className="mt-4 flex space-x-2">
                {onRetry && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onRetry}
                    className="glass-button"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Retry
                  </Button>
                )}
                {onDismiss && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onDismiss}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Dismiss
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="flex-shrink-0 p-1 h-auto text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
};

interface ErrorBoundaryFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorBoundaryFallback = ({
  error,
  resetErrorBoundary,
}: ErrorBoundaryFallbackProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 particles-bg">
      <div className="max-w-md w-full">
        <ErrorMessage
          title="Something went wrong"
          message={error.message || 'An unexpected error occurred'}
          onRetry={resetErrorBoundary}
          variant="destructive"
        />
      </div>
    </div>
  );
};