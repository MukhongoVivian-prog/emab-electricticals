import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  User, 
  Settings, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = ({ isCollapsed, setIsCollapsed, isDarkMode, setIsDarkMode }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'New quote request received', time: '2 min ago', unread: true },
    { id: 2, message: 'Service booking confirmed', time: '1 hour ago', unread: true },
    { id: 3, message: 'Blog post published', time: '3 hours ago', unread: false }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80"
    >
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden"
          >
            <Search className="h-4 w-4" />
          </Button>
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="relative overflow-hidden group"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </Button>

          {/* Notifications */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <div className="space-y-2">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-lg border ${
                        notification.unread 
                          ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' 
                          : 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'
                      }`}
                    >
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {notification.time}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/user.jpg" alt="User" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Admin</p>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">john@electropro.com</p>
                  </div>
                  
                  <div className="py-1">
                    <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                    <div className="border-t border-slate-200 dark:border-slate-700 my-1" />
                    <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 