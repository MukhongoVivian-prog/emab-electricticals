import React from 'react'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'

const DownloadServicesSection = () => {
  const handleDownload = () => {
    // Create a temporary link to download the services catalog
    const link = document.createElement('a');
    link.href = '/services-catalog.pdf'; // This should be placed in the public folder
    link.download = 'EmabElectrical-Services-Catalog.pdf';
    link.click();
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 border-t border-border/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-6 font-heading">
            Need a Full Overview of Our Services?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-body">
            Download our full services catalog for quick reference.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl"
            aria-label="Download Services PDF"
          >
            <Download className="w-5 h-5" />
            <span>Download Services PDF</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default DownloadServicesSection 