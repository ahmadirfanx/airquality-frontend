import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: 'primary' | 'white' | 'muted';
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

const colorClasses = {
  primary: 'border-primary',
  white: 'border-white',
  muted: 'border-muted-foreground',
};

export const LoadingSpinner = ({
  size = 'md',
  className,
  color = 'primary',
}: LoadingSpinnerProps) => {
  return (
    <motion.div
      className={cn(
        'rounded-full border-2 border-solid border-transparent',
        sizeClasses[size],
        colorClasses[color],
        'border-t-current animate-spin',
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  );
};

interface LoadingDotsProps {
  className?: string;
  color?: 'primary' | 'white' | 'muted';
}

export const LoadingDots = ({ className, color = 'primary' }: LoadingDotsProps) => {
  const dotVariants = {
    start: { y: 0 },
    end: { y: -10 },
  };

  const dotColorClasses = {
    primary: 'bg-primary',
    white: 'bg-white',
    muted: 'bg-muted-foreground',
  };

  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={cn('w-2 h-2 rounded-full', dotColorClasses[color])}
          variants={dotVariants}
          initial="start"
          animate="end"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
};

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'success' | 'warning';
}

export const ProgressBar = ({
  progress,
  className,
  showPercentage = false,
  color = 'primary',
}: ProgressBarProps) => {
  const colorClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="glass-card p-0 h-2 overflow-hidden">
        <motion.div
          className={cn('h-full', colorClasses[color])}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
      {showPercentage && (
        <div className="mt-2 text-sm text-muted-foreground text-center font-mono">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};