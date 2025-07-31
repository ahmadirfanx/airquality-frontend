import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { AnimatedBackground } from "@/components/common/AnimatedBackground";
import { useAppStore } from "@/stores/useAppStore";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { selectedParameters, toggleParameter, setSelectedParameters } =
    useAppStore();

  const handleParameterToggle = (parameter: any) => {
    toggleParameter(parameter);
  };

  const handleSelectAll = (category?: string) => {
    // Implementation for selecting all parameters
    // For now, just select common parameters
    setSelectedParameters(["co", "no2", "temperature", "relative_humidity"]);
  };

  const handleClearAll = () => {
    setSelectedParameters([]);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleExport = () => {
    console.log("Export functionality to be implemented");
  };

  return (
    <AnimatedBackground variant="subtle" className="min-h-screen">
      <div className="flex flex-col h-screen">
        {/* Header */}
        <Header
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          onRefresh={handleRefresh}
          onExport={handleExport}
          className="sticky top-0 z-50 p-4"
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <AnimatePresence>
            {(sidebarOpen || window.innerWidth >= 1024) && (
              <motion.aside
                initial={{ x: -320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -320, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(
                  "fixed lg:relative inset-y-0 left-0 z-40",
                  "w-80 bg-background/80 backdrop-blur-sm",
                  "border-r border-white/10 lg:border-0",
                  "p-4 overflow-y-auto custom-scrollbar"
                )}
              >
                <Sidebar
                  selectedParameters={selectedParameters}
                  onParameterToggle={handleParameterToggle}
                  onSelectAll={handleSelectAll}
                  onClearAll={handleClearAll}
                />
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-4 space-y-6">{children}</div>
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && window.innerWidth < 1024 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </AnimatedBackground>
  );
};
