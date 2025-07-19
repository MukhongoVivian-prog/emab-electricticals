import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  MessageSquare, 
  DollarSign,
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  Home,
  Wrench,
  BookOpen,
  Upload,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const adminNavItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      badge: null
    },
    {
      title: 'Services',
      href: '/admin/services',
      icon: Wrench,
      badge: null
    },
    {
      title: 'Blog',
      href: '/admin/blog',
      icon: BookOpen,
      badge: null
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: Users,
      badge: null
    },
    {
      title: 'Quotes',
      href: '/admin/quotes',
      icon: DollarSign,
      badge: '12'
    },
    {
      title: 'Messages',
      href: '/admin/messages',
      icon: MessageSquare,
      badge: '5'
    },
    {
      title: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      badge: null
    },
    {
      title: 'Files',
      href: '/admin/files',
      icon: Upload,
      badge: null
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      badge: null
    }
  ];

  const userNavItems = [
    {
      title: 'Overview',
      href: '/dashboard',
      icon: Home,
      badge: null
    },
    {
      title: 'My Bookings',
      href: '/dashboard/bookings',
      icon: Calendar,
      badge: '3'
    },
    {
      title: 'My Quotes',
      href: '/dashboard/quotes',
      icon: DollarSign,
      badge: '2'
    },
    {
      title: 'Downloads',
      href: '/dashboard/downloads',
      icon: Download,
      badge: null
    },
    {
      title: 'Feedback',
      href: '/dashboard/feedback',
      icon: MessageSquare,
      badge: null
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      badge: null
    }
  ];

  const navItems = location.pathname.includes('/admin') ? adminNavItems : userNavItems;

  return (
    <motion.div
      initial={{ width: isCollapsed ? 80 : 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700/50 relative"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors z-10"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3 text-slate-300" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-slate-300" />
        )}
      </button>

      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center space-x-3"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Wrench className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.h1
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-xl font-bold text-white"
              >
                ElectroPro
              </motion.h1>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group relative overflow-hidden",
                location.pathname === item.href
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30"
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
              )}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              
              <item.icon className="w-5 h-5 flex-shrink-0" />
              
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex items-center justify-between flex-1"
                  >
                    <span className="font-medium">{item.title}</span>
                    {item.badge && (
                      <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center space-x-3"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">JD</span>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1"
              >
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-slate-400">Admin</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar; 