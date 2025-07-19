import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  User, 
  Shield,
  ArrowRight,
  Users,
  Settings,
  BarChart3,
  FileText,
  DollarSign,
  MessageSquare,
  Calendar,
  Wrench
} from 'lucide-react';

const DashboardDemo = () => {
  const adminFeatures = [
    { icon: Users, title: 'User Management', description: 'Manage customers and team members' },
    { icon: Wrench, title: 'Service Management', description: 'CRUD operations for electrical services' },
    { icon: FileText, title: 'Blog Management', description: 'Create and edit blog posts' },
    { icon: DollarSign, title: 'Quote Management', description: 'Handle quote requests and approvals' },
    { icon: MessageSquare, title: 'Message Center', description: 'Manage customer inquiries' },
    { icon: BarChart3, title: 'Analytics', description: 'Business insights and reports' }
  ];

  const userFeatures = [
    { icon: Calendar, title: 'Booking History', description: 'View all your service bookings' },
    { icon: DollarSign, title: 'Quote Requests', description: 'Track your quote requests' },
    { icon: User, title: 'Profile Settings', description: 'Update personal information' },
    { icon: MessageSquare, title: 'Support', description: 'Contact customer support' },
    { icon: FileText, title: 'Downloads', description: 'Access brochures and documents' },
    { icon: Settings, title: 'Preferences', description: 'Manage notification settings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Dashboard Showcase
          </h1>
          <p className="text-xl text-rose-100 max-w-3xl mx-auto">
            Explore our modern, responsive dashboards built with React, Tailwind CSS, and shadcn/ui components
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Dashboard Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Admin Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <CardHeader className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-t-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-8 h-8" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                    <p className="text-emerald-100">Complete business management system</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {adminFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <feature.icon className="w-5 h-5 text-emerald-500" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{feature.title}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link to="/admin">
                  <Button 
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white group-hover:scale-105 transition-transform"
                  >
                    Access Admin Dashboard
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <CardHeader className="bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white rounded-t-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">User Dashboard</CardTitle>
                    <p className="text-violet-100">Personal account management</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {userFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <feature.icon className="w-5 h-5 text-violet-500" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{feature.title}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link to="/user-dashboard">
                  <Button 
                    className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-600 hover:to-fuchsia-700 text-white group-hover:scale-105 transition-transform"
                  >
                    Access User Dashboard
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Built with Modern Technologies
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Responsive, accessible, and performant dashboards
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <LayoutDashboard className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">React 19</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Latest features</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Tailwind CSS</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Utility-first</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">shadcn/ui</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Beautiful components</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Framer Motion</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Smooth animations</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-slate-800 to-slate-900 text-white">
            <CardHeader>
              <CardTitle className="text-white text-center">Dashboard Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-400 mb-2">1,234</div>
                  <div className="text-slate-300">Total Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400 mb-2">89</div>
                  <div className="text-slate-300">Active Quotes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">45</div>
                  <div className="text-slate-300">Messages</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-2">23</div>
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

export default DashboardDemo; 