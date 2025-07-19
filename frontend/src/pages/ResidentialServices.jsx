import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Home, Zap, Shield, Clock, Star, Wrench, Lightbulb, Settings, CheckCircle } from 'lucide-react'

const ResidentialServices = () => {
  const services = [
    {
      title: 'Electrical Wiring & Installation',
      description: 'Complete electrical wiring solutions for new homes and renovations.',
      icon: Zap,
      features: ['New Construction Wiring', 'Panel Upgrades', 'Outlet Installation', 'Code Compliance']
    },
    {
      title: 'Lighting Installation',
      description: 'Professional lighting solutions to enhance your home\'s ambiance and functionality.',
      icon: Lightbulb,
      features: ['Interior Lighting', 'Exterior Lighting', 'Smart Lighting', 'LED Upgrades']
    },
    {
      title: 'Electrical Repairs',
      description: 'Fast and reliable electrical repair services for your home.',
      icon: Wrench,
      features: ['Circuit Repairs', 'Outlet Fixes', 'Switch Replacement', 'Troubleshooting']
    },
    {
      title: 'Smart Home Integration',
      description: 'Modern smart home electrical systems and automation solutions.',
      icon: Settings,
      features: ['Home Automation', 'Smart Thermostats', 'Security Systems', 'Voice Control']
    },
    {
      title: 'Electrical Inspections',
      description: 'Comprehensive electrical safety inspections for your home.',
      icon: Shield,
      features: ['Safety Audits', 'Code Compliance', 'Risk Assessment', 'Detailed Reports']
    },
    {
      title: 'Emergency Electrical Services',
      description: '24/7 emergency electrical services for urgent home electrical issues.',
      icon: Clock,
      features: ['Power Outages', 'Electrical Failures', 'Safety Hazards', 'Quick Response']
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Licensed & Insured',
      description: 'Fully licensed and insured professionals for your peace of mind'
    },
    {
      icon: Clock,
      title: '24/7 Emergency Service',
      description: 'Available around the clock for urgent electrical issues'
    },
    {
      icon: Star,
      title: 'Quality Guarantee',
      description: 'We stand behind our work with comprehensive guarantees'
    },
    {
      icon: CheckCircle,
      title: 'Code Compliant',
      description: 'All work meets or exceeds local electrical codes'
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20">
              <Home className="w-4 h-4" />
              <span>Residential Services</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 font-heading">
              Residential Electrical Services
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto font-body">
              Professional electrical solutions for your home. From installation to repairs, 
              we ensure your family's safety and comfort with reliable electrical services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4 font-heading">
              Our Residential Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
              Comprehensive electrical services tailored to meet the needs of homeowners. 
              We provide safe, reliable, and efficient solutions for all your electrical needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  {React.createElement(service.icon, { className: "w-8 h-8 text-blue-600" })}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 font-heading">{service.title}</h3>
                <p className="text-muted-foreground mb-6 font-body">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm text-muted-foreground font-body">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4 font-heading">
              Why Choose Our Residential Services?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
              We're committed to delivering exceptional electrical services with the highest standards of quality and safety.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {React.createElement(benefit.icon, { className: "w-8 h-8 text-blue-600" })}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 font-heading">{benefit.title}</h3>
                <p className="text-muted-foreground font-body">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 font-heading">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto font-body">
              Get your free quote today and experience the difference of professional residential electrical services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/90 transition-colors duration-200 font-body"
                >
                  Get Free Quote
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200 font-body"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ResidentialServices 