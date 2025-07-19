import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  ArrowRight,
  Shield,
  Users,
  BarChart3
} from 'lucide-react';

const DashboardNav = () => {
  const dashboardOptions = [
    {
      title: 'Admin Dashboard',
      description: 'Manage services, users, quotes, and business operations',
      icon: Shield,
      href: '/admin',
      color: 'from-red-500 to-pink-600',
      features: ['Service Management', 'User Management', 'Analytics', 'File Uploads']
    },
    {
      title: 'User Dashboard',
      description: 'View bookings, quotes, and manage your account',
      icon: User,
      href: '/user-dashboard',
      color: 'from-blue-500 to-purple-600',
      features: ['Booking History', 'Quote Requests', 'Profile Settings', 'Support']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-20">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Dashboard Access
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose your dashboard to manage electrical services, bookings, and business operations
          </p>
        </motion.div>

        {/* Dashboard Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {dashboardOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <option.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-slate-900 dark:text-white">
                        {option.title}
                      </CardTitle>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {option.features.map((feature, featureIndex) => (
                        <div
                          key={feature}
                          className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                      <Link to={option.href}>
                        <Button 
                          className={`w-full bg-gradient-to-r ${option.color} hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                        >
                          Access Dashboard
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-800 to-slate-900 text-white">
            <CardHeader>
              <CardTitle className="text-white">Quick Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">1,234</div>
                  <div className="text-slate-300">Total Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">89</div>
                  <div className="text-slate-300">Active Quotes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">45</div>
                  <div className="text-slate-300">Messages</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">23</div>
                  <div className="text-slate-300">Blog Posts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardNav; 