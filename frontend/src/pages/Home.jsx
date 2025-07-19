import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ServiceCard from '../components/ServiceCard'
import DownloadServicesSection from '../components/DownloadServicesSection'
import { ArrowRight, Star, Quote, Users, Award, Clock, Shield, Zap, DollarSign, Truck, Download } from 'lucide-react'

const Home = () => {
  const featuredServices = [
    {
      title: 'Circuit Installation',
      description: 'Professional circuit installation and wiring services for residential and commercial properties.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
      link: '/services#installation'
    },
    {
      title: 'Electrical Maintenance',
      description: 'Comprehensive maintenance services to ensure your electrical systems operate safely and efficiently.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
      link: '/services#maintenance'
    },
    {
      title: 'Emergency Repairs',
      description: '24/7 emergency electrical repair services for urgent power issues and safety hazards.',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop',
      link: '/services#emergency'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Homeowner',
      content: 'EmabElectrical did an amazing job upgrading our electrical panel. Professional, clean, and on time. Highly recommend!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Mike Chen',
      role: 'Business Owner',
      content: 'They handled our commercial electrical needs perfectly. Great communication and quality workmanship.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Property Manager',
      content: 'Reliable service and fair pricing. They\'ve been our go-to electrical contractor for years.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ]

  const stats = [
    { number: '500+', label: 'Happy Clients', icon: 'Users' },
    { number: '15+', label: 'Years Experience', icon: 'Award' },
    { number: '24/7', label: 'Emergency Service', icon: 'Clock' },
    { number: '4.9', label: 'Star Rating', icon: 'Star' }
  ]

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Reliability',
      description: 'Licensed and insured professionals with proven track record of quality work'
    },
    {
      icon: Zap,
      title: 'Safety',
      description: 'Strict adherence to safety protocols and electrical codes'
    },
    {
      icon: DollarSign,
      title: 'Affordability',
      description: 'Competitive pricing with transparent quotes and no hidden fees'
    },
    {
      icon: Truck,
      title: 'Speed',
      description: 'Quick response times and efficient project completion'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon === 'Users' && <Users className="w-8 h-8 text-primary" />}
                  {stat.icon === 'Award' && <Award className="w-8 h-8 text-primary" />}
                  {stat.icon === 'Clock' && <Clock className="w-8 h-8 text-primary" />}
                  {stat.icon === 'Star' && <Star className="w-8 h-8 text-primary" />}
                </div>
                <div className="text-3xl font-bold text-foreground mb-2 font-heading">{stat.number}</div>
                <div className="text-muted-foreground font-body">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-heading">
                Why Choose <span className="text-blue-600">EmabElectrical</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-body">
                We're committed to delivering exceptional electrical services with the highest standards of quality, safety, and customer satisfaction. Our experienced team ensures reliable, efficient, and cost-effective solutions for all your electrical needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-foreground font-medium font-body">Licensed and insured professionals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-foreground font-medium font-body">24/7 emergency service availability</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-foreground font-medium font-body">Competitive pricing with transparent quotes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-foreground font-medium font-body">Proven track record of quality workmanship</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Icon Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyChooseUs.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    {React.createElement(feature.icon, { className: "w-6 h-6 text-blue-600" })}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 font-heading">{feature.title}</h3>
                  <p className="text-muted-foreground font-body">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
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
              Our Featured Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
              Professional electrical services tailored to your needs. From installation to emergency repairs, 
              we've got you covered with quality workmanship and reliable service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg flex items-center space-x-2 mx-auto hover:bg-blue-700 transition-colors duration-200"
              >
                <span>View All Services</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
              Don't just take our word for it. Here's what our satisfied clients have to say about our services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 shadow-lg border border-border/50"
              >
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
              Get your free quote today and experience the difference of professional electrical services. 
              Our team is ready to help with your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/90 transition-colors duration-200"
                >
                  Get Free Quote
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
                >
                  Contact Us
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-cyan-500 transition-all duration-200 flex items-center space-x-2"
                aria-label="Download Brochure"
                onClick={() => {
                  // Create a temporary link to download the brochure
                  const link = document.createElement('a');
                  link.href = '/brochure.pdf'; // This should be placed in the public folder
                  link.download = 'EmabElectrical-Brochure.pdf';
                  link.click();
                }}
              >
                <Download className="w-5 h-5" />
                <span>Download Brochure</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Download Services Section */}
      <DownloadServicesSection />
    </div>
  )
}

export default Home 