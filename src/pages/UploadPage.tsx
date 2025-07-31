import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileDropZone } from "@/components/upload/FileDropZone";
import { AnimatedBackground } from "@/components/common/AnimatedBackground";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useEffect } from "react";
import { ArrowRight, BarChart3 } from "lucide-react";

const UploadPage = () => {
  const navigate = useNavigate();
  const { uploadFile, isUploading, isSuccess, data, error } = useFileUpload();

  useEffect(() => {
    if (isSuccess && data?.data?.jobId) {
      navigate(`/processing/${data.data.jobId}`);
    }
  }, [isSuccess, data, navigate]);

  const handleFileSelect = async (file: File) => {
    try {
      await uploadFile(file);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <AnimatedBackground className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Dashboard Navigation Button */}
      <motion.button
        onClick={() => navigate("/dashboard")}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="fixed top-6 right-6 z-50 glass-button px-6 py-3 text-white font-medium flex items-center gap-2 hover:scale-105 transition-all duration-300 group"
      >
        <BarChart3 className="w-5 h-5" />
        <span>Dashboard</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>

      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-4xl md:text-8xl font-black mb-8 bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-4xl md:text-4xl font-bold">
              {" "}
              Air Quality Analytics
            </span>
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl text-foreground/80 max-w-4xl mx-auto leading-relaxed font-light mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Transform your environmental data into
            <span className="font-semibold text-primary">
              {" "}
              stunning visualizations
            </span>
          </motion.p>
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Upload your air quality data and discover insights into pollution
            trends, environmental patterns, and data correlations with our
            advanced analytics platform.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
          className="mb-14"
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
            className="mt-4 text-center"
          >
            <p className="text-destructive">{error}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8 text-foreground">
            How it works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Upload & Process",
                description: "Your CSV file is validated and processed",
              },
              {
                step: "2",
                title: "Data Analysis",
                description: "We analyze patterns and calculate statistics",
              },
              {
                step: "3",
                title: "Interactive Dashboard",
                description: "Explore your data with dynamic visualizations",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.2, duration: 0.6 }}
                className="glass-card p-8 text-center hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-primary font-black text-2xl">
                    {item.step}
                  </span>
                </div>
                <h4 className="font-bold text-xl mb-4 text-foreground">
                  {item.title}
                </h4>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedBackground>
  );
};

export default UploadPage;
