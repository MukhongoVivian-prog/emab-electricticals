import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import ServiceForm from '../components/ServiceForm'
import DownloadServicesSection from '../components/DownloadServicesSection'
import { Calendar, Clock, Shield, Star, CheckCircle, Phone, Mail } from 'lucide-react'

const Book = () => {
  const benefits = [
    {
      icon: Calendar,
      title: 'Easy Scheduling',
      description: 'Book your service at a time that works for you'
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Get confirmation within 24 hours'
    },
    {
      icon: Shield,
      title: 'Licensed & Insured',
      description: 'Professional and reliable service'
    },
    {
      icon: Star,
      title: 'Quality Guarantee',
      description: 'We stand behind our work'
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <HeroSection
        title="Book a Service"
        subtitle="Schedule your electrical service appointment with ease. Our team is ready to help with all your electrical needs."
        background="from-blue-600 to-blue-800"
        badge={{ icon: Calendar, text: 'Service Booking' }}
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
              Why Book With Us?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
              We make booking electrical services simple and convenient for you.
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
            title="Book Your Service"
            subtitle="Fill out the form below to schedule your electrical service appointment. We'll get back to you within 24 hours to confirm your booking."
            submitText="Book Service"
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 font-heading">Email Us</h3>
              <p className="text-muted-foreground mb-2 font-body">Get a response within 24 hours</p>
              <a 
                href="mailto:info@emabelectrical.com" 
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 font-body"
              >
                info@emabelectrical.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 font-heading">Business Hours</h3>
              <p className="text-muted-foreground mb-2 font-body">Monday - Friday: 8 AM - 6 PM</p>
              <p className="text-muted-foreground font-body">Emergency: 24/7</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Download Services Section */}
      <DownloadServicesSection />
    </div>
  )
}

export default Book 