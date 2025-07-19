# EmabElectrical - Professional Electrical Services Website

A modern, responsive electrical services website built with React, Tailwind CSS, and shadcn/ui.

## 🎨 Recent Updates (Latest)

### Font System
- **Heading Font**: Unbounded/Anton (bold, professional)
- **Body Font**: Inter/Open Sans (clean, readable)
- Applied globally with utility classes: `font-heading` and `font-body`

### Service Cards Redesign
- **New Structure**: Full-width image → Title → Description
- **Removed**: Pricing information
- **Added**: Hover effects with subtle lift and shadow
- **Images**: High-quality electrical tool/technician photos
- **Responsive**: Grid layout for desktop, stacked for mobile

### Download Brochure Feature
- **Location**: CTA section "Ready to Get Started?"
- **Style**: Gradient button (`from-blue-600 to-cyan-400`)
- **Icon**: Download icon from Lucide React
- **File**: Place your brochure PDF at `/public/brochure.pdf`
- **Accessibility**: Proper `aria-label` and keyboard navigation

## 🚀 Features

- **Modern Design**: Clean, professional layout inspired by TheeDigital
- **Responsive**: Mobile-first design with thumb-friendly interactions
- **Animations**: Smooth Framer Motion animations throughout
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Performance**: Lazy loading, optimized images, fast loading times
- **SEO Ready**: Proper meta tags, semantic HTML structure

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.jsx              # Hero carousel with dynamic content
│   ├── HeroCarousel.jsx      # Reusable carousel component
│   ├── ServiceCard.jsx       # Updated service cards with images
│   ├── Navbar.jsx            # Navigation with search and dropdown
│   └── Footer.jsx            # Slim footer with 3-column layout
├── pages/
│   ├── Home.jsx              # Main homepage with all sections
│   ├── Services.jsx          # Services page
│   ├── Projects.jsx          # Project showcase
│   ├── Contact.jsx           # Contact form and info
│   └── ...                   # Other pages
└── index.css                 # Global styles and font imports
```

## 🎯 Key Sections

1. **Hero Section**: Dynamic carousel with call-to-actions
2. **Stats Section**: Key metrics and achievements
3. **Why Choose Us**: 2-column layout with benefits
4. **Featured Services**: Image-based service cards
5. **Testimonials**: Client reviews and ratings
6. **CTA Section**: Quote, contact, and brochure download

## 🛠️ Setup Instructions

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```

2. **Add Brochure PDF**:
   - Place your brochure at `public/brochure.pdf`
   - The download button will automatically link to this file

3. **Start Development Server**:
   ```bash
   pnpm dev
   ```

4. **Build for Production**:
   ```bash
   pnpm build
   ```

## 🎨 Customization

### Colors
- Primary blue theme with CSS custom properties
- Easy to modify in `src/index.css`

### Fonts
- Google Fonts imported automatically
- Use `font-heading` and `font-body` utility classes

### Images
- Replace service card images in `Home.jsx` featuredServices array
- Update hero carousel images in `Hero.jsx`

## 📱 Mobile Optimization

- Thumb-friendly button sizes (44px minimum)
- Responsive typography with clamp()
- Optimized touch targets
- Fast loading with lazy images

## ♿ Accessibility Features

- Proper heading hierarchy
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast ratios
- Screen reader friendly

## 🔧 Technical Stack

- **React 19** with hooks and lazy loading
- **Tailwind CSS v4** with custom configuration
- **Framer Motion** for animations
- **shadcn/ui** components
- **React Router DOM** for navigation
- **Lucide React** for icons

---

Built with ❤️ for professional electrical services
