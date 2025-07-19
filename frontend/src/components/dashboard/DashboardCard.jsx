import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DashboardCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = 'blue',
  className = '',
  onClick,
  children 
}) => {
  const colorVariants = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      bgLight: 'from-blue-50 to-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-200'
    },
    green: {
      bg: 'from-green-500 to-green-600',
      bgLight: 'from-green-50 to-green-100',
      text: 'text-green-600',
      border: 'border-green-200'
    },
    purple: {
      bg: 'from-purple-500 to-purple-600',
      bgLight: 'from-purple-50 to-purple-100',
      text: 'text-purple-600',
      border: 'border-purple-200'
    },
    orange: {
      bg: 'from-orange-500 to-orange-600',
      bgLight: 'from-orange-50 to-orange-100',
      text: 'text-orange-600',
      border: 'border-orange-200'
    },
    red: {
      bg: 'from-red-500 to-red-600',
      bgLight: 'from-red-50 to-red-100',
      text: 'text-red-600',
      border: 'border-red-200'
    }
  };

  const colors = colorVariants[color];

  return (
    <motion.div
      whileHover={{ 
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`group cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
        {/* Background gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.bgLight} opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:opacity-10`} />
        
        {/* 3D effect border */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {title}
            </CardTitle>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-lg`}
            >
              <Icon className="w-5 h-5 text-white" />
            </motion.div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {children || (
            <>
              <div className="flex items-baseline space-x-2">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl font-bold text-slate-900 dark:text-white"
                >
                  {value}
                </motion.span>
                {trend && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge 
                      variant={trend === 'up' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {trend === 'up' ? '↗' : '↘'} {trendValue}
                    </Badge>
                  </motion.div>
                )}
              </div>
              
              {/* Progress bar */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mt-4 w-full bg-slate-200 rounded-full h-1 dark:bg-slate-700"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, Math.random() * 100)}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className={`h-1 rounded-full bg-gradient-to-r ${colors.bg}`}
                />
              </motion.div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardCard; 