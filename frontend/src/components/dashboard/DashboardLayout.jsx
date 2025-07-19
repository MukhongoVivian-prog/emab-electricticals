import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import { Toaster } from '@/components/ui/sonner';

const DashboardLayout = ({ children, isAdmin = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode toggle effect
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed}
          isAdmin={isAdmin}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <Header 
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
          
          {/* Page Content */}
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 overflow-auto"
          >
            {children}
          </motion.main>
        </div>
      </div>
      
      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        richColors
        closeButton
        duration={4000}
      />
    </div>
  );
};

export default DashboardLayout; 