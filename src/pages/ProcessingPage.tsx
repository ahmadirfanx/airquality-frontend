import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { AnimatedBackground } from '@/components/common/AnimatedBackground';
import { GlassCard } from '@/components/common/GlassCard';
import { ProgressBar, LoadingDots } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { useIngestionStatus } from '@/hooks/useIngestionStatus';
import { Button } from '@/components/ui/button';
import { formatPercentage } from '@/utils/formatters';

const ProcessingPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  
  const { data: status, isLoading, error, refetch } = useIngestionStatus(jobId);

  useEffect(() => {
    if (status?.status === 'completed') {
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status?.status, navigate]);

  if (!jobId) {
    return (
      <AnimatedBackground className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage
          title="Invalid Job ID"
          message="No job ID was provided. Please upload a file first."
          onRetry={() => navigate('/upload')}
        />
      </AnimatedBackground>
    );
  }

  if (error) {
    return (
      <AnimatedBackground className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage
          title="Processing Error"
          message="Failed to check processing status. Please try again."
          onRetry={() => refetch()}
        />
      </AnimatedBackground>
    );
  }

  const getStatusInfo = () => {
    if (isLoading && !status) {
      return {
        title: 'Initializing...',
        description: 'Setting up data processing',
        showProgress: false,
      };
    }

    switch (status?.status) {
      case 'processing':
        return {
          title: 'Processing Your Data',
          description: 'Analyzing air quality measurements and calculating statistics',
          showProgress: true,
        };
      case 'completed':
        return {
          title: 'Processing Complete!',
          description: 'Your data is ready. Redirecting to dashboard...',
          showProgress: false,
        };
      case 'failed':
        return {
          title: 'Processing Failed',
          description: status.error || 'An error occurred during processing',
          showProgress: false,
        };
      default:
        return {
          title: 'Processing...',
          description: 'Please wait while we process your data',
          showProgress: false,
        };
    }
  };

  const statusInfo = getStatusInfo();
  const progress = status?.progress?.percentage || 0;

  return (
    <AnimatedBackground className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="text-center" padding="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {status?.status === 'completed' ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-success" />
                </motion.div>
              ) : status?.status === 'failed' ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <AlertCircle className="w-10 h-10 text-destructive" />
                </motion.div>
              ) : (
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full"
                  />
                </div>
              )}

              <h1 className="text-3xl font-bold mb-4 text-foreground">
                {statusInfo.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-8">
                {statusInfo.description}
                {status?.status === 'processing' && (
                  <span className="ml-2">
                    <LoadingDots className="inline-flex" />
                  </span>
                )}
              </p>

              {statusInfo.showProgress && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mb-8"
                >
                  <ProgressBar
                    progress={progress}
                    showPercentage
                    className="mb-4"
                  />
                  
                  {status?.progress && (
                    <div className="text-sm text-muted-foreground font-mono">
                      {status.progress.processed.toLocaleString()} / {status.progress.total.toLocaleString()} records processed
                    </div>
                  )}
                </motion.div>
              )}

              {status?.status === 'completed' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button
                    onClick={() => navigate('/dashboard')}
                    className="glass-button px-8 py-3"
                    size="lg"
                  >
                    View Dashboard
                  </Button>
                </motion.div>
              )}

              {status?.status === 'failed' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="space-y-4"
                >
                  <Button
                    onClick={() => refetch()}
                    variant="outline"
                    className="glass-button mr-4"
                  >
                    Retry
                  </Button>
                  <Button
                    onClick={() => navigate('/upload')}
                    className="glass-button"
                  >
                    Upload New File
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          Job ID: <span className="font-mono text-xs">{jobId}</span>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
};

export default ProcessingPage;