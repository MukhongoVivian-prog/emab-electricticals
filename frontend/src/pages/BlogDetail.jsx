import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'

const BlogDetail = () => {
  const { slug } = useParams()

  // Mock blog post data - in a real app, this would come from an API
  const post = {
    id: 1,
    title: 'Essential Electrical Safety Tips for Homeowners',
    content: `
      <p>Electrical safety is crucial for every homeowner. This comprehensive guide covers essential safety tips that can help prevent accidents and ensure your home's electrical system operates safely and efficiently.</p>
      
      <h2>1. Regular Electrical Inspections</h2>
      <p>Schedule regular electrical inspections by a licensed electrician. These inspections can identify potential hazards before they become serious problems. Look for:</p>
      <ul>
        <li>Frayed or damaged electrical cords</li>
        <li>Overloaded outlets or circuits</li>
        <li>Outdated electrical panels</li>
        <li>Improper wiring installations</li>
      </ul>

      <h2>2. Proper Outlet Usage</h2>
      <p>Never overload electrical outlets. Each outlet is designed to handle a specific amount of electrical current. Overloading can cause:</p>
      <ul>
        <li>Electrical fires</li>
        <li>Circuit breaker trips</li>
        <li>Damage to electrical devices</li>
        <li>Increased risk of electrocution</li>
      </ul>

      <h2>3. GFCI Protection</h2>
      <p>Ground Fault Circuit Interrupters (GFCIs) are essential safety devices that protect against electrical shock. Install GFCIs in:</p>
      <ul>
        <li>Bathrooms</li>
        <li>Kitchens</li>
        <li>Outdoor areas</li>
        <li>Basements and garages</li>
      </ul>

      <h2>4. Extension Cord Safety</h2>
      <p>Use extension cords properly and safely:</p>
      <ul>
        <li>Never run extension cords under rugs or furniture</li>
        <li>Don't overload extension cords</li>
        <li>Use the right type of cord for the job</li>
        <li>Replace damaged cords immediately</li>
      </ul>

      <h2>5. Child Safety</h2>
      <p>Protect children from electrical hazards:</p>
      <ul>
        <li>Install outlet covers on unused outlets</li>
        <li>Keep electrical cords out of reach</li>
        <li>Teach children about electrical safety</li>
        <li>Supervise children around electrical devices</li>
      </ul>

      <h2>6. Emergency Preparedness</h2>
      <p>Be prepared for electrical emergencies:</p>
      <ul>
        <li>Know where your electrical panel is located</li>
        <li>Learn how to reset circuit breakers</li>
        <li>Keep emergency contact numbers handy</li>
        <li>Have a flashlight and batteries ready</li>
      </ul>

      <p>Remember, when in doubt, always consult with a licensed electrician. Electrical work can be dangerous and should only be performed by qualified professionals.</p>
    `,
    author: 'John Smith',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Safety',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=400&fit=crop',
    tags: ['Safety', 'Home', 'Tips', 'Electrical']
  }

  const relatedPosts = [
    {
      id: 2,
      title: 'Understanding Your Electrical Panel',
      excerpt: 'Everything you need to know about your electrical panel...',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=200&fit=crop',
      date: '2024-01-10'
    },
    {
      id: 3,
      title: 'Common Electrical Problems and Solutions',
      excerpt: 'Identify and resolve common electrical issues...',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=200&fit=crop',
      date: '2024-01-05'
    }
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 font-body"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Category and Meta */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6 font-body">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
              {post.category}
            </span>
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight font-heading">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold font-body">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="font-semibold text-foreground font-body">{post.author}</div>
                <div className="text-sm text-muted-foreground font-body">Electrical Expert</div>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground font-body">Share:</span>
              <button className="p-2 text-muted-foreground hover:text-blue-600 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-blue-600 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-blue-600 transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none font-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-body"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </article>

      {/* Related Posts */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4 font-heading">
              Related Articles
            </h2>
            <p className="text-xl text-muted-foreground font-body">
              Continue reading with these related articles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((relatedPost, index) => (
              <motion.article
                key={relatedPost.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-muted-foreground mb-2 font-body">
                    {formatDate(relatedPost.date)}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 font-heading">
                    {relatedPost.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 font-body">
                    {relatedPost.excerpt}
                  </p>
                  <Link
                    to={`/blog/${relatedPost.id}`}
                    className="inline-flex items-center space-x-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 font-body"
                  >
                    <span>Read More</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogDetail 