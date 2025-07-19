import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Calendar, 
  DollarSign, 
  Download, 
  MessageSquare, 
  Settings,
  Edit,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DashboardCard from '@/components/dashboard/DashboardCard';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  const userStats = [
    {
      title: 'Total Bookings',
      value: '8',
      icon: Calendar,
      trend: 'up',
      trendValue: '+2',
      color: 'blue'
    },
    {
      title: 'Active Quotes',
      value: '3',
      icon: DollarSign,
      trend: 'up',
      trendValue: '+1',
      color: 'green'
    },
    {
      title: 'Completed Services',
      value: '5',
      icon: CheckCircle,
      trend: 'up',
      trendValue: '+1',
      color: 'purple'
    },
    {
      title: 'Total Spent',
      value: '$2,450',
      icon: DollarSign,
      trend: 'up',
      trendValue: '+15%',
      color: 'orange'
    }
  ];

  const recentBookings = [
    {
      id: 1,
      service: 'Electrical Panel Upgrade',
      date: '2024-01-15',
      status: 'completed',
      amount: '$850',
      technician: 'Mike Johnson'
    },
    {
      id: 2,
      service: 'Kitchen Wiring Installation',
      date: '2024-01-20',
      status: 'in-progress',
      amount: '$1,200',
      technician: 'Sarah Wilson'
    },
    {
      id: 3,
      service: 'Outdoor Lighting Setup',
      date: '2024-01-25',
      status: 'scheduled',
      amount: '$600',
      technician: 'David Brown'
    }
  ];

  const recentQuotes = [
    {
      id: 1,
      service: 'Smart Home Installation',
      date: '2024-01-10',
      status: 'approved',
      amount: '$2,500',
      validUntil: '2024-02-10'
    },
    {
      id: 2,
      service: 'Commercial Wiring',
      date: '2024-01-08',
      status: 'pending',
      amount: '$3,800',
      validUntil: '2024-02-08'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
      case 'in-progress': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400';
      case 'scheduled': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400';
      case 'approved': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
      case 'pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section - Fixed spacing */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 text-white pt-24 pb-16"
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center space-x-6">
            <Avatar className="w-20 h-20 border-4 border-white/20">
              <AvatarImage src="/avatars/user.jpg" alt="User" />
              <AvatarFallback className="bg-gradient-to-br from-rose-500 to-fuchsia-600 text-white text-2xl">
                JD
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, John!</h1>
              <p className="text-rose-100">Manage your electrical services and bookings</p>
            </div>
          </div>
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
          {userStats.map((stat, index) => (
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
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                  <TabsTrigger value="quotes">My Quotes</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Quick Actions */}
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button className="h-20 flex flex-col space-y-2 bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700">
                          <Calendar className="w-6 h-6" />
                          <span className="text-xs">Book Service</span>
                        </Button>
                        <Button className="h-20 flex flex-col space-y-2 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700">
                          <DollarSign className="w-6 h-6" />
                          <span className="text-xs">Request Quote</span>
                        </Button>
                        <Button className="h-20 flex flex-col space-y-2 bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 hover:from-fuchsia-600 hover:to-fuchsia-700">
                          <Download className="w-6 h-6" />
                          <span className="text-xs">Download Brochure</span>
                        </Button>
                        <Button className="h-20 flex flex-col space-y-2 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                          <MessageSquare className="w-6 h-6" />
                          <span className="text-xs">Contact Support</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                          <div className="flex-1">
                            <p className="font-medium">Service completed - Electrical Panel Upgrade</p>
                            <p className="text-sm text-slate-500">2 days ago</p>
                          </div>
                          <Badge className="bg-emerald-100 text-emerald-800">Completed</Badge>
                        </div>
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                          <div className="flex-1">
                            <p className="font-medium">New booking scheduled - Kitchen Wiring</p>
                            <p className="text-sm text-slate-500">1 week ago</p>
                          </div>
                          <Badge className="bg-cyan-100 text-cyan-800">Scheduled</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="bookings" className="space-y-6">
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                    <CardHeader>
                      <CardTitle>My Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentBookings.map((booking, index) => (
                          <motion.div
                            key={booking.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="p-4 rounded-lg border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-semibold text-slate-900 dark:text-white">
                                {booking.service}
                              </h3>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-slate-500 dark:text-slate-400">Date</p>
                                <p className="font-medium">{booking.date}</p>
                              </div>
                              <div>
                                <p className="text-slate-500 dark:text-slate-400">Amount</p>
                                <p className="font-medium text-emerald-600">{booking.amount}</p>
                              </div>
                              <div>
                                <p className="text-slate-500 dark:text-slate-400">Technician</p>
                                <p className="font-medium">{booking.technician}</p>
                              </div>
                              <div className="flex justify-end">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="quotes" className="space-y-6">
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                    <CardHeader>
                      <CardTitle>My Quotes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentQuotes.map((quote, index) => (
                          <motion.div
                            key={quote.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="p-4 rounded-lg border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-semibold text-slate-900 dark:text-white">
                                {quote.service}
                              </h3>
                              <Badge className={getStatusColor(quote.status)}>
                                {quote.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-slate-500 dark:text-slate-400">Date</p>
                                <p className="font-medium">{quote.date}</p>
                              </div>
                              <div>
                                <p className="text-slate-500 dark:text-slate-400">Amount</p>
                                <p className="font-medium text-emerald-600">{quote.amount}</p>
                              </div>
                              <div>
                                <p className="text-slate-500 dark:text-slate-400">Valid Until</p>
                                <p className="font-medium">{quote.validUntil}</p>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                                {quote.status === 'approved' && (
                                  <Button size="sm">
                                    Accept
                                  </Button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Profile Information</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Name</p>
                        <p className="font-medium">John Doe</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                        <p className="font-medium">john.doe@email.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Phone</p>
                        <p className="font-medium">(555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Address</p>
                        <p className="font-medium">123 Main St, City, State 12345</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Customer Satisfaction */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                <CardHeader>
                  <CardTitle>Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-600 mb-2">4.8</div>
                    <div className="flex justify-center space-x-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= 4 ? 'text-yellow-400 fill-current' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Based on 5 reviews
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Brochure
                    </Button>
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

export default UserDashboard; 