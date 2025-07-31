import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileDropZone } from '@/components/upload/FileDropZone';
import { AnimatedBackground } from '@/components/common/AnimatedBackground';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useEffect } from 'react';

const UploadPage = () => {
  const navigate = useNavigate();
  const { uploadFile, isUploading, isSuccess, data, error } = useFileUpload();

  useEffect(() => {
    if (isSuccess && data?.jobId) {
      navigate(`/processing/${data.jobId}`);
    }
  }, [isSuccess, data, navigate]);

  const handleFileSelect = async (file: File) => {
    try {
      await uploadFile(file);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <AnimatedBackground className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Air Quality Analytics
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Upload your air quality data and transform it into beautiful, interactive visualizations. 
            Get insights into pollution trends, environmental patterns, and data correlations.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <FileDropZone
            onFileSelect={handleFileSelect}
            isUploading={isUploading}
          />
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <p className="text-destructive">{error}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            What happens next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                step: '1',
                title: 'Upload & Process',
                description: 'Your CSV file is validated and processed'
              },
              {
                step: '2',
                title: 'Data Analysis',
                description: 'We analyze patterns and calculate statistics'
              },
              {
                step: '3',
                title: 'Interactive Dashboard',
                description: 'Explore your data with dynamic visualizations'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.5 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">{item.step}</span>
                </div>
                <h4 className="font-semibold mb-2 text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
};

export default UploadPage;