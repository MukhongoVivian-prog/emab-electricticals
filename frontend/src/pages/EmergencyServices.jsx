import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, AlertTriangle, Zap, Shield, Clock, Star, Wrench, CheckCircle, Phone, MapPin, Users } from 'lucide-react'

const EmergencyServices = () => {
  const services = [
    {
      title: 'Power Outage Restoration',
      description: 'Quick response to restore power during electrical outages.',
      icon: Zap,
      features: ['Circuit Breaker Issues', 'Power Line Problems', 'Panel Failures', 'Quick Diagnosis']
    },
    {
      title: 'Electrical Safety Hazards',
      description: 'Immediate response to dangerous electrical situations.',
      icon: AlertTriangle,
      features: ['Spark Hazards', 'Burning Smells', 'Hot Outlets', 'Safety Assessment']
    },
    {
      title: 'Emergency Repairs',
      description: 'Fast and reliable emergency electrical repair services.',
      icon: Wrench,
      features: ['Broken Outlets', 'Faulty Switches', 'Damaged Wiring', 'Component Replacement']
    },
    {
      title: 'Commercial Emergency Services',
      description: '24/7 emergency services for commercial and industrial facilities.',
      icon: Shield,
      features: ['Business Continuity', 'Equipment Failures', 'Safety Systems', 'Production Support']
    },
    {
      title: 'Residential Emergency Services',
      description: 'Emergency electrical services for homes and apartments.',
      icon: Users,
      features: ['Home Safety', 'Family Protection', 'Quick Response', 'Reliable Service']
    },
    {
      title: 'After-Hours Support',
      description: 'Round-the-clock emergency electrical support and consultation.',
      icon: Clock,
      features: ['24/7 Availability', 'Phone Support', 'Emergency Dispatch', 'Expert Technicians']
    }
  ]

  const benefits = [
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Available around the clock for urgent electrical issues'
    },
    {
      icon: Phone,
      title: 'Quick Response',
      description: 'Fast response times for emergency situations'
    },
    {
      icon: Shield,
      title: 'Licensed & Insured',
      description: 'Fully licensed and insured emergency technicians'
    },
    {
      icon: CheckCircle,
      title: 'Expert Technicians',
      description: 'Experienced professionals for emergency situations'
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20">
              <AlertTriangle className="w-4 h-4" />
              <span>Emergency Services</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 font-heading">
              Emergency Electrical Services
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto font-body">
              24/7 emergency electrical services for urgent situations. 
              When electrical emergencies strike, we're here to help with fast, reliable response.
            </p>
            
            {/* Emergency Contact */}
            <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6" />
                  <span className="text-2xl font-bold">(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6" />
                  <span className="text-lg">Available 24/7</span>
                </div>
              </div>
            </div>
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
              Our Emergency Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
              Comprehensive emergency electrical services available 24/7. 
              We respond quickly to restore power and ensure your safety.
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
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  {React.createElement(service.icon, { className: "w-8 h-8 text-red-600" })}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 font-heading">{service.title}</h3>
                <p className="text-muted-foreground mb-6 font-body">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm text-muted-foreground font-body">
                      <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
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
              Why Choose Our Emergency Services?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
              We're committed to providing fast, reliable emergency electrical services when you need them most.
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
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {React.createElement(benefit.icon, { className: "w-8 h-8 text-red-600" })}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 font-heading">{benefit.title}</h3>
                <p className="text-muted-foreground font-body">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 font-heading">
              Need Emergency Electrical Service?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto font-body">
              Don't wait! Call us immediately for emergency electrical services. 
              We're available 24/7 to help with urgent electrical issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+15551234567">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/90 transition-colors duration-200 font-body flex items-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now: (555) 123-4567</span>
                </motion.button>
              </a>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-red-600 transition-colors duration-200 font-body"
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

export default EmergencyServices 