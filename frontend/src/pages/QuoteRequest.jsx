import React from 'react'
import { motion } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import ServiceForm from '../components/ServiceForm'
import DownloadServicesSection from '../components/DownloadServicesSection'
import { Phone, Mail, Clock, Shield, Star, CheckCircle, DollarSign } from 'lucide-react'

const QuoteRequest = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Free Quotes',
      description: 'Get detailed quotes with no obligation'
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Get your quote within 24 hours'
    },
    {
      icon: Star,
      title: 'Expert Team',
      description: 'Experienced electrical professionals'
    },
    {
      icon: CheckCircle,
      title: 'Transparent Pricing',
      description: 'Clear, detailed pricing breakdown'
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <HeroSection
        title="Request a Quote"
        subtitle="Fill out the form below and we'll provide you with a detailed quote within 24 hours. No obligation, no pressure - just professional service."
        background="from-blue-600 to-blue-800"
        badge={{ icon: DollarSign, text: 'Free Quote' }}
      />

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4 font-heading">
              Why Choose Our Quotes?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
              We provide transparent, detailed quotes with no hidden fees or obligations.
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
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {React.createElement(benefit.icon, { className: "w-8 h-8 text-blue-600" })}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 font-heading">{benefit.title}</h3>
                <p className="text-muted-foreground font-body">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceForm
            title="Request Your Quote"
            subtitle="Fill out the form below and we'll provide you with a detailed quote within 24 hours. No obligation, no pressure."
            submitText="Request Quote"
          />
        </div>
      </section>

      {/* Contact Info Section */}
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
              Need Immediate Assistance?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
              For urgent electrical issues or emergency services, contact us directly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
                              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 font-heading">Call Us</h3>
                <p className="text-muted-foreground mb-2 font-body">Available 24/7 for emergencies</p>
                <a 
                  href="tel:+15551234567" 
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 font-body"
                >
                  (555) 123-4567
                </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-2">Get a response within 24 hours</p>
              <a 
                href="mailto:info@electropro.com" 
                className="text-primary font-semibold hover:text-primary/80 transition-colors duration-200"
              >
                info@electropro.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Business Hours</h3>
              <p className="text-muted-foreground mb-2">Monday - Friday: 8 AM - 6 PM</p>
              <p className="text-muted-foreground">Emergency: 24/7</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default QuoteRequest 