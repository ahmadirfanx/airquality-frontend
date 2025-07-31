import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/common/GlassCard';
import { validateFile } from '@/utils/validators';
import { formatFileSize } from '@/utils/formatters';

interface FileDropZoneProps {
  onFileSelect: (file: File) => void;
  isUploading?: boolean;
  className?: string;
}

export const FileDropZone = ({ 
  onFileSelect, 
  isUploading = false, 
  className 
}: FileDropZoneProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      setError('Please select a valid CSV file');
      return;
    }

    const file = acceptedFiles[0];
    const validation = validateFile(file);
    
    if (!validation.isValid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setSelectedFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/csv': ['.csv'],
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  const handleUpload = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      <GlassCard
        className={cn(
          'transition-all duration-300 cursor-pointer',
          isDragActive && 'border-primary/50 bg-primary/5',
          isUploading && 'pointer-events-none opacity-50',
          error && 'border-destructive/50 bg-destructive/5'
        )}
        padding="lg"
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ 
                scale: isDragActive ? 1.1 : 1,
                rotateY: isDragActive ? 180 : 0 
              }}
              transition={{ duration: 0.3 }}
              className="mx-auto mb-6"
            >
              <Upload className="w-16 h-16 mx-auto text-primary" />
            </motion.div>
            
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              {isDragActive ? 'Drop your file here' : 'Upload Air Quality Data'}
            </h3>
            
            <p className="text-muted-foreground mb-6">
              Drop your CSV file here or{' '}
              <span className="text-primary font-medium">browse files</span>
            </p>
            
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Maximum file size: 50MB</p>
              <p>• Supported format: CSV</p>
              <p>• Include timestamp and air quality parameters</p>
            </div>
          </motion.div>
        </div>
      </GlassCard>

      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <GlassCard className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <File className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-medium text-foreground">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeFile}
                  disabled={isUploading}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <GlassCard className="border-destructive/20 bg-destructive/5">
              <div className="flex items-center space-x-2 text-destructive">
                <X className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {selectedFile && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex justify-center"
          >
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              className="glass-button px-8 py-3 text-lg"
              size="lg"
            >
              {isUploading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <Upload className="w-5 h-5 mr-2" />
              )}
              {isUploading ? 'Uploading...' : 'Start Processing'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};