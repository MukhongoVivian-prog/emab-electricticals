import React from 'react'
import { motion } from 'framer-motion'

const HeroSection = ({ 
  title, 
  subtitle, 
  background = "from-blue-600 to-blue-800",
  badge = null,
  children = null 
}) => {
  return (
    <section className={`py-20 bg-gradient-to-br ${background} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {badge && (
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20">
              {badge.icon && React.createElement(badge.icon, { className: "w-4 h-4" })}
              <span>{badge.text}</span>
            </div>
          )}
          
          <h1 className="text-5xl font-bold mb-6 font-heading">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl text-white/90 max-w-3xl mx-auto font-body">
              {subtitle}
            </p>
          )}
          
          {children}
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection 