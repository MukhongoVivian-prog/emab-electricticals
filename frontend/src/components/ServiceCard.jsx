import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Wrench, Shield, Clock, Star } from 'lucide-react'

const ServiceCard = ({ service }) => {
  const iconMap = {
    installation: Zap,
    maintenance: Wrench,
    emergency: Clock,
    commercial: Shield,
    residential: Star,
    default: Zap
  }

  const IconComponent = iconMap[service.icon] || iconMap.default

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border/50"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon */}
      <div className="relative p-6">
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
          whileHover={{ rotate: 5 }}
        >
          <IconComponent className="w-8 h-8 text-white" />
        </motion.div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed">
            {service.description}
          </p>

          {/* Features list */}
          {service.features && (
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-2 text-sm text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          )}

          {/* Price range */}
          {service.priceRange && (
            <div className="pt-2">
              <span className="text-sm text-muted-foreground">Starting from</span>
              <div className="text-2xl font-bold text-primary">
                ${service.priceRange}
              </div>
            </div>
          )}

          {/* CTA Button */}
          <motion.div
            className="pt-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={service.link || '/services'}
              className="inline-flex items-center space-x-2 text-primary font-semibold hover:text-primary/80 transition-colors duration-200 group/btn"
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  )
}

export default ServiceCard 