import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import HeroCarousel from '../components/HeroCarousel'
import DownloadServicesSection from '../components/DownloadServicesSection'
import { ArrowRight, Zap, Shield, Clock, Star, Wrench, Home, Building, AlertTriangle } from 'lucide-react'

const Services = () => {
  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&h=1080&fit=crop',
      badge: {
        icon: Zap,
        text: 'Professional Services'
      },
      title: 'Electrical Services',
      description: 'Comprehensive electrical solutions for residential, commercial, and industrial properties. From installation to maintenance, we ensure safety and reliability.',
      buttons: [
        {
          text: 'Get Free Quote',
          primary: true,
          onClick: () => window.location.href = '/quote'
        },
        {
          text: 'View Projects',
          primary: false,
          onClick: () => window.location.href = '/projects'
        }
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop',
      badge: {
        icon: Home,
        text: 'Residential Services'
      },
      title: 'Home Electrical Solutions',
      description: 'Safe and reliable electrical services for your home. From wiring to smart home integration, we make your home more efficient and secure.',
      buttons: [
        {
          text: 'Residential Services',
          primary: true,
          onClick: () => window.location.href = '/services#residential'
        },
        {
          text: 'Get Quote',
          primary: false,
          onClick: () => window.location.href = '/quote'
        }
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',
      badge: {
        icon: Building,
        text: 'Commercial Services'
      },
      title: 'Commercial Electrical',
      description: 'Power your business with reliable electrical infrastructure. We provide comprehensive solutions for offices, retail, and industrial facilities.',
      buttons: [
        {
          text: 'Commercial Services',
          primary: true,
          onClick: () => window.location.href = '/services#commercial'
        },
        {
          text: 'Get Quote',
          primary: false,
          onClick: () => window.location.href = '/quote'
        }
      ]
    }
  ]

  const serviceCategories = [
    {
      title: 'Residential Services',
      description: 'Complete electrical solutions for homes and apartments',
      icon: Home,
      color: 'from-blue-500 to-blue-600',
      route: '/services/residential',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop'
    },
    {
      title: 'Commercial Services',
      description: 'Electrical infrastructure for businesses and offices',
      icon: Building,
      color: 'from-green-500 to-green-600',
      route: '/services/commercial',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop'
    },
    {
      title: 'Industrial Services',
      description: 'Heavy-duty electrical systems for manufacturing',
      icon: Wrench,
      color: 'from-orange-500 to-orange-600',
      route: '/services/industrial',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop'
    },
    {
      title: 'Emergency Services',
      description: '24/7 emergency electrical repairs and support',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      route: '/services/emergency',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop'
    }
  ]

  const allServices = [
    {
      title: 'Electrical Installation',
      description: 'Complete electrical installation services for new construction and renovations.',
      icon: 'installation',
      features: ['Wiring & Outlets', 'Lighting Installation', 'Panel Upgrades', 'Code Compliance'],
      priceRange: '500',
      link: '/services#installation'
    },
    {
      title: 'Maintenance & Repair',
      description: 'Professional maintenance and repair services to keep your electrical systems running safely.',
      icon: 'maintenance',
      features: ['Troubleshooting', 'Component Replacement', 'Safety Inspections', 'Preventive Maintenance'],
      priceRange: '150',
      link: '/services#maintenance'
    },
    {
      title: 'Emergency Services',
      description: '24/7 emergency electrical services for urgent repairs and power restoration.',
      icon: 'emergency',
      features: ['Power Outages', 'Electrical Failures', 'Safety Hazards', 'Quick Response'],
      priceRange: '200',
      link: '/services#emergency'
    },
    {
      title: 'Smart Home Integration',
      description: 'Modern smart home electrical systems and automation solutions.',
      icon: 'smart',
      features: ['Home Automation', 'Smart Lighting', 'Security Systems', 'Energy Management'],
      priceRange: '800',
      link: '/services#smart'
    },
    {
      title: 'Commercial Wiring',
      description: 'Comprehensive electrical wiring solutions for commercial properties.',
      icon: 'commercial',
      features: ['Office Wiring', 'Retail Spaces', 'Industrial Facilities', 'Safety Systems'],
      priceRange: '1000',
      link: '/services#commercial'
    },
    {
      title: 'Electrical Inspections',
      description: 'Thorough electrical safety inspections and compliance assessments.',
      icon: 'inspection',
      features: ['Safety Audits', 'Code Compliance', 'Risk Assessment', 'Detailed Reports'],
      priceRange: '100',
      link: '/services#inspection'
    }
  ]

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Licensed & Insured',
      description: 'Fully licensed and insured professionals for your peace of mind'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Emergency services available around the clock'
    },
    {
      icon: Star,
      title: 'Quality Guarantee',
      description: 'We stand behind our work with quality guarantees'
    },
    {
      icon: Zap,
      title: 'Expert Team',
      description: 'Experienced electricians with years of expertise'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Carousel Section */}
      <section className="relative">
        {/* White space below navbar */}
        <div className="h-20 lg:h-24"></div>
        
        {/* Hero Carousel */}
        <HeroCarousel slides={heroSlides} autoPlay={true} interval={7000} />
      </section>

      {/* Service Categories */}
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
              Our Service Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We offer comprehensive electrical services across all sectors, ensuring quality and safety in every project.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceCategories.map((category, index) => (
              <Link key={category.title} to={category.route}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-8 text-white text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden`}>
                    {/* Background Image */}
                    <div className="absolute inset-0 opacity-20">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        {React.createElement(category.icon, { className: "w-8 h-8" })}
                      </div>
                      <h3 className="text-xl font-bold mb-3 font-heading">{category.title}</h3>
                      <p className="text-white/90 text-sm font-body">{category.description}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Services */}
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
              All Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From basic electrical work to complex installations, we provide a full range of electrical services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              Why Choose Our Services?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're committed to delivering exceptional electrical services with the highest standards of quality and safety.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  {React.createElement(feature.icon, { className: "w-8 h-8 text-primary" })}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
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
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Get your free quote today and experience the difference of professional electrical services. 
              Our team is ready to help with your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/90 transition-colors duration-200"
                >
                  Get Free Quote
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Download Services Section */}
      <DownloadServicesSection />
    </div>
  )
}

export default Services 