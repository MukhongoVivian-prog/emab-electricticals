# Electrical Services Dashboard

Modern, responsive dashboards built with React, Tailwind CSS, and shadcn/ui components.

## 🚀 Features

### Admin Dashboard (`/admin`)
- **Service Management**: CRUD operations for electrical services
- **User Management**: Manage customers and team members
- **Blog Management**: Create and edit blog posts
- **Quote Management**: Handle quote requests and approvals
- **Message Center**: Manage customer inquiries
- **Analytics**: Business insights and reports
- **File Uploads**: Manage brochures and service PDFs
- **Notifications**: Real-time alerts and updates

### User Dashboard (`/user-dashboard`)
- **Booking History**: View all service bookings
- **Quote Requests**: Track quote requests and status
- **Profile Settings**: Update personal information
- **Support**: Contact customer support
- **Downloads**: Access brochures and documents
- **Preferences**: Manage notification settings

## 🛠️ Technologies Used

- **React 19**: Latest React features and hooks
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, accessible components
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Modern icon library
- **React Router**: Client-side routing

## 🎨 Design Features

- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Mobile-first approach
- **3D Elements**: Subtle shadows and hover effects
- **Gradient Backgrounds**: Modern visual appeal
- **Smooth Animations**: Framer Motion powered transitions
- **Accessibility**: WCAG compliant components

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Access Dashboards**:
   - Admin Dashboard: `http://localhost:5173/admin`
   - User Dashboard: `http://localhost:5173/user-dashboard`
   - Demo Page: `http://localhost:5173/dashboard-demo`

## 📁 File Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── Sidebar.jsx          # Collapsible navigation sidebar
│   │   ├── Header.jsx           # Top header with search and user menu
│   │   ├── DashboardCard.jsx    # Reusable stat cards
│   │   └── DashboardLayout.jsx  # Layout wrapper component
│   └── ui/                      # shadcn/ui components
├── pages/
│   ├── AdminDashboard.jsx       # Admin dashboard page
│   ├── UserDashboard.jsx        # User dashboard page
│   └── DashboardDemo.jsx        # Demo showcase page
└── App.jsx                      # Main app with routes
```

## 🎯 Component Usage

### DashboardCard
```jsx
<DashboardCard
  title="Total Bookings"
  value="1,234"
  icon={Calendar}
  trend="up"
  trendValue="+12%"
  color="blue"
/>
```

### Sidebar
```jsx
<Sidebar 
  isCollapsed={isCollapsed} 
  setIsCollapsed={setIsCollapsed}
  isAdmin={true}
/>
```

### Header
```jsx
<Header 
  isCollapsed={isCollapsed}
  setIsCollapsed={setIsCollapsed}
  isDarkMode={isDarkMode}
  setIsDarkMode={setIsDarkMode}
/>
```

## 🎨 Customization

### Colors
The dashboards use a consistent color scheme:
- **Blue**: Primary actions and links
- **Green**: Success states and positive trends
- **Purple**: Secondary actions and highlights
- **Orange**: Warnings and alerts
- **Red**: Errors and destructive actions

### Dark Mode
Dark mode is automatically applied based on user preference and can be toggled via the header button.

### Animations
All animations are powered by Framer Motion and can be customized in the component files.

## 📊 Data Structure

### Stats Data
```javascript
const statsData = [
  {
    title: 'Total Bookings',
    value: '1,234',
    icon: Calendar,
    trend: 'up',
    trendValue: '+12%',
    color: 'blue'
  }
];
```

### Navigation Items
```javascript
const navItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    badge: null
  }
];
```

## 🔧 Development

### Adding New Features
1. Create new components in `src/components/dashboard/`
2. Add routes in `src/App.jsx`
3. Update navigation in `Sidebar.jsx`
4. Add any new UI components using shadcn/ui

### Styling
- Use Tailwind CSS classes for styling
- Follow the existing color scheme
- Maintain responsive design principles
- Use Framer Motion for animations

### Performance
- Components are lazy-loaded for better performance
- Images are optimized and responsive
- Animations are hardware-accelerated
- Bundle size is minimized

## 🚀 Deployment

The dashboards are ready for production deployment. Ensure all environment variables are properly configured for your deployment platform.

## 📝 License

This project is licensed under the MIT License. 