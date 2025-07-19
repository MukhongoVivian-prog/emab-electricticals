import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, BookOpen } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import BlogCard from '../components/BlogCard'
import Pagination from '../components/Pagination'

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const blogPosts = [
    {
      id: 1,
      title: 'Essential Electrical Safety Tips for Homeowners',
      excerpt: 'Learn the most important electrical safety practices to keep your home and family safe from electrical hazards.',
      content: 'Electrical safety is crucial for every homeowner. This comprehensive guide covers essential safety tips...',
      author: 'John Smith',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'safety',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
      tags: ['Safety', 'Home', 'Tips']
    },
    {
      id: 2,
      title: 'Understanding Your Electrical Panel: A Complete Guide',
      excerpt: 'Everything you need to know about your electrical panel, from basic components to maintenance tips.',
      content: 'Your electrical panel is the heart of your home\'s electrical system. Understanding how it works...',
      author: 'Sarah Johnson',
      date: '2024-01-10',
      readTime: '8 min read',
      category: 'education',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
      tags: ['Panel', 'Education', 'Maintenance']
    },
    {
      id: 3,
      title: 'Smart Home Electrical Upgrades: What You Need to Know',
      excerpt: 'Discover the latest smart home electrical technologies and how they can improve your home.',
      content: 'Smart home technology is revolutionizing how we interact with our electrical systems...',
      author: 'Mike Chen',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'technology',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
      tags: ['Smart Home', 'Technology', 'Upgrades']
    },
    {
      id: 4,
      title: 'Common Electrical Problems and How to Fix Them',
      excerpt: 'Identify and resolve common electrical issues in your home with our expert troubleshooting guide.',
      content: 'Electrical problems can be frustrating and potentially dangerous. Here\'s how to identify...',
      author: 'Emily Rodriguez',
      date: '2024-01-01',
      readTime: '7 min read',
      category: 'troubleshooting',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
      tags: ['Troubleshooting', 'Repairs', 'DIY']
    },
    {
      id: 5,
      title: 'Energy Efficiency: How to Reduce Your Electrical Bills',
      excerpt: 'Practical tips and strategies to make your home more energy-efficient and save money on electricity.',
      content: 'Rising energy costs are a concern for many homeowners. Here are proven strategies...',
      author: 'David Wilson',
      date: '2023-12-28',
      readTime: '4 min read',
      category: 'energy',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
      tags: ['Energy', 'Savings', 'Efficiency']
    },
    {
      id: 6,
      title: 'Commercial Electrical Systems: Maintenance Best Practices',
      excerpt: 'Essential maintenance practices for commercial electrical systems to ensure reliability and safety.',
      content: 'Commercial electrical systems require regular maintenance to ensure optimal performance...',
      author: 'Lisa Thompson',
      date: '2023-12-25',
      readTime: '9 min read',
      category: 'commercial',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
      tags: ['Commercial', 'Maintenance', 'Business']
    },
    {
      id: 7,
      title: 'LED Lighting: The Future of Energy-Efficient Illumination',
      excerpt: 'Discover the benefits of LED lighting and how it can transform your home\'s energy consumption.',
      content: 'LED lighting has revolutionized the way we illuminate our homes and businesses...',
      author: 'Alex Turner',
      date: '2023-12-20',
      readTime: '6 min read',
      category: 'technology',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
      tags: ['LED', 'Lighting', 'Energy', 'Technology']
    },
    {
      id: 8,
      title: 'Emergency Electrical Services: When to Call for Help',
      excerpt: 'Learn when electrical issues require immediate professional attention and how to stay safe.',
      content: 'Electrical emergencies can be dangerous and require immediate professional attention...',
      author: 'Maria Garcia',
      date: '2023-12-18',
      readTime: '5 min read',
      category: 'safety',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
      tags: ['Emergency', 'Safety', 'Professional']
    },
    {
      id: 9,
      title: 'Solar Panel Installation: A Complete Guide for Homeowners',
      excerpt: 'Everything you need to know about installing solar panels and harnessing renewable energy.',
      content: 'Solar panel installation is becoming increasingly popular as homeowners seek renewable energy solutions...',
      author: 'Robert Kim',
      date: '2023-12-15',
      readTime: '10 min read',
      category: 'energy',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
      tags: ['Solar', 'Renewable Energy', 'Installation']
    },
    {
      id: 10,
      title: 'Electrical Code Compliance: What Every Property Owner Should Know',
      excerpt: 'Understanding electrical codes and ensuring your property meets safety standards.',
      content: 'Electrical codes are designed to ensure safety and proper installation of electrical systems...',
      author: 'Jennifer Lee',
      date: '2023-12-12',
      readTime: '8 min read',
      category: 'education',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
      tags: ['Codes', 'Compliance', 'Safety', 'Standards']
    },
    {
      id: 11,
      title: 'Industrial Electrical Maintenance: Keeping Your Facility Running',
      excerpt: 'Essential maintenance strategies for industrial electrical systems to prevent downtime.',
      content: 'Industrial electrical systems are critical to the operation of manufacturing facilities...',
      author: 'Thomas Brown',
      date: '2023-12-10',
      readTime: '7 min read',
      category: 'commercial',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
      tags: ['Industrial', 'Maintenance', 'Facility']
    },
    {
      id: 12,
      title: 'Home Automation: Smart Electrical Systems for Modern Living',
      excerpt: 'Explore the latest in home automation technology and how it can enhance your lifestyle.',
      content: 'Home automation is transforming how we interact with our electrical systems...',
      author: 'Rachel Green',
      date: '2023-12-08',
      readTime: '6 min read',
      category: 'technology',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
      tags: ['Automation', 'Smart Home', 'Technology']
    }
  ]

  const categories = [
    { value: 'all', label: 'All Posts' },
    { value: 'safety', label: 'Safety' },
    { value: 'education', label: 'Education' },
    { value: 'technology', label: 'Technology' },
    { value: 'troubleshooting', label: 'Troubleshooting' },
    { value: 'energy', label: 'Energy' },
    { value: 'commercial', label: 'Commercial' }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory])

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <HeroSection
        title="Our Insights & Blog"
        subtitle="Explore tips, industry news, and electrical expertise"
        background="from-blue-600 to-blue-800"
        badge={{ icon: BookOpen, text: 'Latest Articles' }}
      />

      {/* Search and Filter Section */}
      <section className="py-12 bg-white border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200 font-body"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 font-body ${
                    selectedCategory === category.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4 font-heading">No posts found</h3>
              <p className="text-muted-foreground font-body">Try adjusting your search or filter criteria.</p>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((post, index) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    index={index}
                    categoryLabel={categories.find(cat => cat.value === post.category)?.label}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredPosts.length}
              />
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4 font-heading">
              Stay Updated
            </h2>
            <p className="text-xl text-muted-foreground mb-8 font-body">
              Subscribe to our newsletter for the latest electrical tips, industry news, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200 font-body"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 font-body">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Blog 