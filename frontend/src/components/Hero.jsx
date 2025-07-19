import React from 'react'
import { Link } from 'react-router-dom'
import HeroCarousel from './HeroCarousel'
import { Zap, ArrowRight } from 'lucide-react'

const Hero = () => {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&h=1080&fit=crop',
      badge: {
        icon: Zap,
        text: 'Professional Electrical Services'
      },
      title: 'Powering Your Future',
      description: 'Expert electrical solutions for residential and commercial properties. Licensed, insured, and committed to safety and quality workmanship.',
      buttons: [
        {
          text: 'Schedule Service',
          primary: true,
          onClick: () => window.location.href = '/quote'
        },
        {
          text: 'Get a Quote',
          primary: false,
          onClick: () => window.location.href = '/quote'
        }
      ],
      stats: [
        { value: '500+', label: 'Happy Clients' },
        { value: '15+', label: 'Years Experience' },
        { value: '24/7', label: 'Emergency Service' }
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop',
      badge: {
        icon: Zap,
        text: 'Residential & Commercial'
      },
      title: 'Complete Electrical Solutions',
      description: 'From installation to maintenance, we provide comprehensive electrical services for homes and businesses.',
      buttons: [
        {
          text: 'View Services',
          primary: true,
          onClick: () => window.location.href = '/services'
        },
        {
          text: 'Our Projects',
          primary: false,
          onClick: () => window.location.href = '/projects'
        }
      ],
      stats: [
        { value: '1000+', label: 'Projects Completed' },
        { value: '4.9', label: 'Star Rating' },
        { value: '100%', label: 'Satisfaction' }
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',
      badge: {
        icon: Zap,
        text: 'Emergency Services'
      },
      title: '24/7 Emergency Response',
      description: 'When electrical emergencies strike, we\'re here to help. Fast, reliable emergency electrical services when you need them most.',
      buttons: [
        {
          text: 'Emergency Call',
          primary: true,
          onClick: () => window.location.href = '/contact'
        },
        {
          text: 'Learn More',
          primary: false,
          onClick: () => window.location.href = '/services#emergency'
        }
      ],
      stats: [
        { value: '< 30min', label: 'Response Time' },
        { value: '24/7', label: 'Availability' },
        { value: '100%', label: 'Reliability' }
      ]
    }
  ]

  return (
    <section className="relative">
      {/* White space below navbar */}
      <div className="h-20 lg:h-24"></div>
      
      {/* Hero Carousel */}
      <HeroCarousel slides={slides} autoPlay={true} interval={6000} />
    </section>
  )
}

export default Hero 