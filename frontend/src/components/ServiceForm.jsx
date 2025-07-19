import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Calendar, Clock } from 'lucide-react'

const ServiceForm = ({ 
  title = "Service Request",
  subtitle = "Fill out the form below and we'll get back to you as soon as possible.",
  submitText = "Submit Request",
  serviceTypes = [
    { value: 'residential', label: 'Residential Services' },
    { value: 'commercial', label: 'Commercial Services' },
    { value: 'industrial', label: 'Industrial Services' },
    { value: 'emergency', label: 'Emergency Services' },
    { value: 'installation', label: 'Electrical Installation' },
    { value: 'maintenance', label: 'Maintenance & Repair' },
    { value: 'inspection', label: 'Electrical Inspection' },
    { value: 'upgrade', label: 'Electrical Upgrade' },
    { value: 'other', label: 'Other' }
  ]
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    serviceType: '',
    preferredDate: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitSuccess(true)
    
    // Reset form after success
    setTimeout(() => {
      setSubmitSuccess(false)
      setFormData({
        fullName: '',
        email: '',
        serviceType: '',
        preferredDate: '',
        message: ''
      })
    }, 3000)
  }

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2 font-heading">Request Sent!</h3>
        <p className="text-green-700 font-body">
          Thank you for your request. We'll get back to you within 24 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl border border-border/50 p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4 font-heading">{title}</h2>
        <p className="text-muted-foreground text-lg font-body">
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2 font-body">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200 font-body"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2 font-body">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200 font-body"
            placeholder="Enter your email address"
          />
        </div>

        {/* Service Type */}
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-foreground mb-2 font-body">
            Service Type *
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200 font-body"
          >
            <option value="">Select a service type</option>
            {serviceTypes.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Date */}
        <div>
          <label htmlFor="preferredDate" className="block text-sm font-medium text-foreground mb-2 font-body">
            Preferred Date
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200 font-body"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2 font-body">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200 resize-none font-body"
            placeholder="Describe your service needs..."
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2 font-body"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>{submitText}</span>
            </>
          )}
        </motion.button>
      </form>

      {/* Contact Info */}
      <div className="mt-8 pt-8 border-t border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-muted-foreground font-body">Response Time</span>
            <span className="font-medium font-body">Within 24 Hours</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-muted-foreground font-body">Scheduling</span>
            <span className="font-medium font-body">Flexible Times</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Send className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-muted-foreground font-body">Confirmation</span>
            <span className="font-medium font-body">Email & Phone</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ServiceForm 