import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, ArrowRight, Zap, Home, Building, Wrench, Star } from 'lucide-react'
import HeroCarousel from '../components/HeroCarousel'

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const heroSlides = [
    {
      image: 'src/assets/images/pic1.jpg',
      badge: {
        icon: Zap,
        text: 'Our Portfolio'
      },
      title: 'Our Projects',
      description: 'Explore our portfolio of successful electrical projects across residential, commercial, and industrial sectors. Each project showcases our commitment to quality, safety, and innovation.',
      buttons: [
        {
          text: 'Get Free Quote',
          primary: true,
          onClick: () => window.location.href = '/quote'
        },
        {
          text: 'Contact Us',
          primary: false,
          onClick: () => window.location.href = '/contact'
        }
      ]
    },
    {
      image: 'src/assets/images/pic2.jpg',
      badge: {
        icon: Building,
        text: 'Commercial Projects'
      },
      title: 'Commercial Excellence',
      description: 'From office buildings to retail spaces, we deliver reliable electrical solutions that power businesses and drive success.',
      buttons: [
        {
          text: 'View Commercial',
          primary: true,
          onClick: () => setSelectedCategory('commercial')
        },
        {
          text: 'All Projects',
          primary: false,
          onClick: () => setSelectedCategory('all')
        }
      ]
    },
    {
      image: 'src/assets/images/pic3.jpg',
      badge: {
        icon: Home,
        text: 'Residential Projects'
      },
      title: 'Home Electrical Solutions',
      description: 'Creating safe, efficient, and modern electrical systems for homes that families can rely on for years to come.',
      buttons: [
        {
          text: 'View Residential',
          primary: true,
          onClick: () => setSelectedCategory('residential')
        },
        {
          text: 'All Projects',
          primary: false,
          onClick: () => setSelectedCategory('all')
        }
      ]
    }
  ]

  const projects = [
    {
      id: 1,
      title: 'Modern Home Electrical Upgrade',
      category: 'residential',
      description: 'Complete electrical system upgrade for a 3-bedroom modern home, including smart home integration and energy-efficient lighting.',
      image: 'src/assets/images/pic4.jpg',
      features: ['Smart Home Integration', 'LED Lighting', 'Panel Upgrade', 'Safety Inspection'],
      completionDate: '2024-01-15',
      rating: 5
    },
    {
      id: 2,
      title: 'Commercial Office Wiring',
      category: 'commercial',
      description: 'Comprehensive electrical installation for a 10,000 sq ft office building with advanced security systems.',
      image: 'src/assets/images/pic.jpg',
      features: ['Security Systems', 'Network Infrastructure', 'Emergency Lighting', 'HVAC Controls'],
      completionDate: '2024-01-10',
      rating: 5
    },
    {
      id: 3,
      title: 'Industrial Panel Installation',
      category: 'industrial',
      description: 'High-capacity electrical panel installation for manufacturing facility with specialized equipment.',
      image: 'src/assets/images/pic2.jpg',
      features: ['High-Capacity Panels', 'Equipment Integration', 'Safety Systems', 'Monitoring'],
      completionDate: '2024-01-05',
      rating: 5
    },
    {
      id: 4,
      title: 'Emergency Power System',
      category: 'emergency',
      description: 'Backup power system installation for critical infrastructure with automatic failover capabilities.',
      image: 'src/assets/images/pic3.jpg',
      features: ['Backup Generators', 'UPS Systems', 'Automatic Failover', '24/7 Monitoring'],
      completionDate: '2023-12-28',
      rating: 5
    },
    {
      id: 5,
      title: 'Retrofit Lighting Project',
      category: 'residential',
      description: 'Energy-efficient lighting retrofit for apartment complex with smart controls and motion sensors.',
      image: 'src/assets/images/pic4.jpg',
      features: ['LED Retrofit', 'Smart Controls', 'Motion Sensors', 'Energy Savings'],
      completionDate: '2023-12-20',
      rating: 5
    },
    {
      id: 6,
      title: 'Data Center Electrical',
      category: 'commercial',
      description: 'Critical electrical infrastructure for data center with redundant systems and cooling.',
      image: 'src/assets/images/pic1.jpg',
      features: ['Redundant Systems', 'Cooling Infrastructure', 'Monitoring', 'Security'],
      completionDate: '2023-12-15',
      rating: 5
    }
  ]

  const categories = [
    { value: 'all', label: 'All Projects', icon: Filter },
    { value: 'residential', label: 'Residential', icon: Home },
    { value: 'commercial', label: 'Commercial', icon: Building },
    { value: 'industrial', label: 'Industrial', icon: Wrench },
    { value: 'emergency', label: 'Emergency', icon: Zap }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Carousel Section */}
      <section className="relative">
        {/* White space below navbar */}
        <div className="h-20 lg:h-24"></div>
        
        {/* Hero Carousel */}
        <HeroCarousel slides={heroSlides} autoPlay={true} interval={7000} />
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">Filter by Category</h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.value
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {React.createElement(category.icon, { className: "w-4 h-4" })}
                <span>{category.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">No projects found</h3>
              <p className="text-muted-foreground">Try selecting a different category.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Image with hover zoom effect */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center space-x-1">
                      {Array.from({ length: project.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Key Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.features.slice(0, 3).map((feature, i) => (
                          <span
                            key={i}
                            className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                        {project.features.length > 3 && (
                          <span className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                            +{project.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <span className="text-sm text-muted-foreground">
                        Completed: {formatDate(project.completionDate)}
                      </span>
                      <button className="text-primary hover:text-primary/80 transition-colors duration-200 text-sm font-medium flex items-center space-x-1">
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let us help you bring your electrical project to life with professional expertise and quality workmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors duration-200"
              >
                Get Free Quote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-white transition-colors duration-200"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Projects 