import React from 'react'
import { motion } from 'framer-motion'
import { User, FileText, Calendar, Settings, Bell, ArrowRight } from 'lucide-react'

const Dashboard = () => {
  const recentProjects = [
    {
      id: 1,
      title: 'Electrical Panel Upgrade',
      status: 'In Progress',
      date: '2024-01-15',
      progress: 75
    },
    {
      id: 2,
      title: 'Kitchen Wiring Installation',
      status: 'Completed',
      date: '2024-01-10',
      progress: 100
    },
    {
      id: 3,
      title: 'Outdoor Lighting Setup',
      status: 'Scheduled',
      date: '2024-01-20',
      progress: 0
    }
  ]

  const notifications = [
    {
      id: 1,
      title: 'Project Update',
      message: 'Your electrical panel upgrade is 75% complete',
      time: '2 hours ago',
      type: 'info'
    },
    {
      id: 2,
      title: 'Appointment Reminder',
      message: 'You have an appointment scheduled for tomorrow',
      time: '1 day ago',
      type: 'reminder'
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-6">
              Welcome to Your Dashboard
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Manage your electrical projects, track progress, and stay updated with your account.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Active Projects</p>
                      <p className="text-3xl font-bold text-foreground">3</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Completed</p>
                      <p className="text-3xl font-bold text-foreground">12</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Spent</p>
                      <p className="text-3xl font-bold text-foreground">$8,450</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Recent Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Recent Projects</h2>
                  <button className="text-primary hover:text-primary/80 transition-colors duration-200">
                    View All
                  </button>
                </div>

                <div className="space-y-6">
                  {recentProjects.map((project, index) => (
                    <div key={project.id} className="border border-border/50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium text-foreground">{project.progress}%</span>
                      </div>
                      
                      <div className="w-full bg-muted rounded-full h-2 mb-4">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Started: {project.date}</span>
                        <button className="text-primary hover:text-primary/80 transition-colors duration-200 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">John Doe</h3>
                  <p className="text-muted-foreground">Customer since 2023</p>
                </div>

                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors duration-200">
                    <span className="text-foreground">Account Settings</span>
                    <Settings className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors duration-200">
                    <span className="text-foreground">Billing & Payments</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors duration-200">
                    <span className="text-foreground">Support</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </motion.div>

              {/* Notifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-foreground">Notifications</h3>
                  <Bell className="w-5 h-5 text-muted-foreground" />
                </div>

                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="border-l-4 border-primary pl-4">
                      <h4 className="text-sm font-semibold text-foreground">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-bold text-foreground mb-6">Quick Actions</h3>
                
                <div className="space-y-3">
                  <button className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200">
                    Schedule Service
                  </button>
                  <button className="w-full border border-primary text-primary py-3 px-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-200">
                    Request Quote
                  </button>
                  <button className="w-full border border-border text-foreground py-3 px-4 rounded-lg font-semibold hover:bg-muted transition-colors duration-200">
                    View Invoices
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard 