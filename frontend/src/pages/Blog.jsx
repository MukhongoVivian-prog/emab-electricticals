import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Calendar, Clock, ArrowRight, Tag } from 'lucide-react'

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-6">
              Electrical Blog
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Expert insights, tips, and guides for all your electrical needs. Stay informed and keep your electrical systems safe and efficient.
            </p>
          </motion.div>
        </div>
      </section>

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
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedCategory === category.value
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
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
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">No posts found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {categories.find(cat => cat.value === post.category)?.label}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center space-x-1 bg-muted px-2 py-1 rounded text-xs text-muted-foreground"
                        >
                          <Tag className="w-3 h-3" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>

                    {/* Author and Read More */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">By {post.author}</span>
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center space-x-1 text-primary font-semibold hover:text-primary/80 transition-colors duration-200"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
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
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Subscribe to our newsletter for the latest electrical tips, industry news, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
              />
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200">
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