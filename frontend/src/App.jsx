import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import './App.css'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const ResidentialServices = lazy(() => import('./pages/ResidentialServices'))
const CommercialServices = lazy(() => import('./pages/CommercialServices'))
const IndustrialServices = lazy(() => import('./pages/IndustrialServices'))
const EmergencyServices = lazy(() => import('./pages/EmergencyServices'))
const QuoteRequest = lazy(() => import('./pages/QuoteRequest'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Projects = lazy(() => import('./pages/Projects'))

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<LoadingSpinner />}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/residential" element={<ResidentialServices />} />
                <Route path="/services/commercial" element={<CommercialServices />} />
                <Route path="/services/industrial" element={<IndustrialServices />} />
                <Route path="/services/emergency" element={<EmergencyServices />} />
                <Route path="/quote" element={<QuoteRequest />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
