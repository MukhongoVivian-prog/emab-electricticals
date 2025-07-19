import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  MessageSquare, 
  FileText,
  TrendingUp,
  Calendar,
  Wrench,
  Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardCard from '@/components/dashboard/DashboardCard';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const statsData = [
    {
      title: 'Total Bookings',
      value: '1,234',
      icon: Calendar,
      trend: 'up',
      trendValue: '+12%',
      color: 'blue'
    },
    {
      title: 'Quote Requests',
      value: '89',
      icon: DollarSign,
      trend: 'up',
      trendValue: '+8%',
      color: 'green'
    },
    {
      title: 'Messages',
      value: '45',
      icon: MessageSquare,
      trend: 'down',
      trendValue: '-3%',
      color: 'purple'
    },
    {
      title: 'Blog Posts',
      value: '23',
      icon: FileText,
      trend: 'up',
      trendValue: '+15%',
      color: 'orange'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'booking',
      message: 'New booking request from John Smith',
      time: '2 minutes ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'quote',
      message: 'Quote request for commercial installation',
      time: '15 minutes ago',
      status: 'reviewed'
    },
    {
      id: 3,
      type: 'message',
      message: 'Customer inquiry about emergency services',
      time: '1 hour ago',
      status: 'replied'
    },
    {
      id: 4,
      type: 'service',
      message: 'Service completed - Electrical panel upgrade',
      time: '2 hours ago',
      status: 'completed'
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Review quote requests',
      priority: 'high',
      dueDate: 'Today',
      completed: false
    },
    {
      id: 2,
      title: 'Update service pricing',
      priority: 'medium',
      dueDate: 'Tomorrow',
      completed: false
    },
    {
      id: 3,
      title: 'Schedule team meeting',
      priority: 'low',
      dueDate: 'This week',
      completed: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'reviewed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'replied': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section - Fixed spacing */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white pt-24 pb-16"
      >
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-sky-100">Manage your electrical services business</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-8 -mt-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statsData.map((stat, index) => (
            <DashboardCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              trendValue={stat.trendValue}
              color={stat.color}
            />
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wrench className="w-5 h-5" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button className="h-20 flex flex-col space-y-2 bg-gradient-to-br from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700">
                      <Users className="w-6 h-6" />
                      <span className="text-xs">Add User</span>
                    </Button>
                    <Button className="h-20 flex flex-col space-y-2 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                      <DollarSign className="w-6 h-6" />
                      <span className="text-xs">New Quote</span>
                    </Button>
                    <Button className="h-20 flex flex-col space-y-2 bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700">
                      <FileText className="w-6 h-6" />
                      <span className="text-xs">New Post</span>
                    </Button>
                    <Button className="h-20 flex flex-col space-y-2 bg-gradient-to-br from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700">
                      <Calendar className="w-6 h-6" />
                      <span className="text-xs">Schedule</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Recent Activities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center justify-between p-4 rounded-lg border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-sky-500 rounded-full" />
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">
                              {activity.message}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Upcoming Tasks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Upcoming Tasks</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center justify-between p-3 rounded-lg border border-slate-200/50 dark:border-slate-700/50"
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500"
                          />
                          <div>
                            <p className={`font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                              {task.title}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Due: {task.dueDate}
                            </p>
                          </div>
                        </div>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Revenue This Month</span>
                      <span className="font-bold text-sky-400">$45,230</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Active Projects</span>
                      <span className="font-bold text-blue-400">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Customer Satisfaction</span>
                      <span className="font-bold text-indigo-400">4.8/5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Team Members</span>
                      <span className="font-bold text-violet-400">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 