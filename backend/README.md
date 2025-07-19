# Electrical Services Backend API

A comprehensive REST API backend for an electrical services website built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete user registration, login, profile management
- **Blog System**: Full CRUD operations with categories, tags, and comments
- **Service Management**: Electrical services with pricing, features, and testimonials
- **Contact Management**: Contact form submissions with email notifications
- **Booking System**: Service booking with scheduling and status tracking
- **Quote System**: Quote requests with pricing and project management
- **File Upload**: Image and document upload with validation
- **Email System**: Automated email notifications and confirmations
- **Security**: Rate limiting, input validation, CORS, and security headers
- **Pagination**: Efficient data pagination for all list endpoints
- **Search**: Full-text search across blogs and services

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **File Upload**: Multer
- **Email**: Nodemailer
- **Security**: Helmet, bcryptjs, rate limiting
- **Image Processing**: Sharp
- **Testing**: Jest, Supertest

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- pnpm (recommended) or npm

## 🚀 Quick Start

### 1. Clone and Install

```bash
cd backend
pnpm install
```

### 2. Environment Setup

Copy the example environment file and configure your variables:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/electrical-services

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@electricalservices.com
```

### 3. Start Development Server

```bash
pnpm dev
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123",
  "phone": "+1234567890"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Blog Endpoints

#### Get All Blogs (Public)
```http
GET /api/blog?page=1&limit=6&category=education
```

#### Get Blog by Slug (Public)
```http
GET /api/blog/electrical-safety-tips
```

#### Create Blog (Admin Only)
```http
POST /api/blog
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Electrical Safety Tips",
  "excerpt": "Important safety guidelines...",
  "content": "Full blog content...",
  "category": "safety",
  "tags": ["safety", "tips"],
  "featuredImage": "https://example.com/image.jpg"
}
```

### Service Endpoints

#### Get All Services (Public)
```http
GET /api/services?category=residential&featured=true
```

#### Get Service by Slug (Public)
```http
GET /api/services/residential-wiring
```

#### Create Service (Admin Only)
```http
POST /api/services
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Residential Wiring",
  "category": "residential",
  "description": "Complete residential wiring services",
  "pricing": {
    "type": "quote",
    "basePrice": 150
  }
}
```

### Contact Endpoints

#### Submit Contact Form (Public)
```http
POST /api/contact
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "subject": "Service Inquiry",
  "message": "I need electrical work done",
  "serviceType": "residential",
  "urgency": "medium"
}
```

### Booking Endpoints

#### Submit Booking Request (Public)
```http
POST /api/booking
Content-Type: application/json

{
  "customer": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "service": {
    "type": "residential",
    "description": "Electrical panel upgrade"
  },
  "scheduling": {
    "preferredDate": "2024-02-15",
    "preferredTime": "morning"
  }
}
```

### Quote Endpoints

#### Submit Quote Request (Public)
```http
POST /api/quote
Content-Type: application/json

{
  "customer": {
    "fullName": "John Doe",
    "email": "john@example.com"
  },
  "project": {
    "type": "residential",
    "description": "Complete home rewiring",
    "scope": "large",
    "urgency": "normal"
  }
}
```

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

### User Roles

- **user**: Regular customer
- **technician**: Service technician
- **admin**: Administrator with full access

## 📁 Project Structure

```
backend/
├── models/           # Database models
│   ├── User.js
│   ├── Blog.js
│   ├── Service.js
│   ├── Contact.js
│   ├── Booking.js
│   └── Quote.js
├── routes/           # API routes
│   ├── auth.js
│   ├── blog.js
│   ├── services.js
│   ├── contact.js
│   ├── booking.js
│   ├── quote.js
│   └── user.js
├── middleware/       # Custom middleware
│   ├── auth.js
│   ├── validate.js
│   ├── upload.js
│   ├── errorHandler.js
│   └── notFound.js
├── utils/           # Utility functions
│   ├── email.js
│   └── response.js
├── uploads/         # File uploads
├── server.js        # Main server file
├── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/electrical-services` |
| `JWT_SECRET` | JWT secret key | Required |
| `JWT_EXPIRE` | JWT expiration time | `30d` |
| `EMAIL_HOST` | SMTP host | Required |
| `EMAIL_PORT` | SMTP port | `587` |
| `EMAIL_USER` | SMTP username | Required |
| `EMAIL_PASS` | SMTP password | Required |
| `EMAIL_FROM` | From email address | Required |

### Database Models

#### User Model
- Authentication fields (email, password)
- Profile information (name, phone, address)
- Role-based access control
- Email verification
- Password reset functionality

#### Blog Model
- Content management (title, content, excerpt)
- Categories and tags
- Featured images
- Comments and likes
- SEO fields
- Publishing workflow

#### Service Model
- Service details (name, description, category)
- Pricing information
- Features and benefits
- Testimonials
- Image galleries

#### Contact Model
- Contact form submissions
- Status tracking
- Assignment to staff
- Response management
- Notes and follow-ups

#### Booking Model
- Customer information
- Service details
- Scheduling
- Status tracking
- Technician assignment
- Feedback system

#### Quote Model
- Project specifications
- Pricing breakdown
- Validity periods
- Customer responses
- Document attachments

## 🧪 Testing

Run tests with Jest:

```bash
pnpm test
```

## 📧 Email Templates

The system includes pre-built email templates for:

- User registration confirmation
- Password reset
- Contact form confirmations
- Booking confirmations
- Quote requests
- Admin notifications

## 🔒 Security Features

- **Rate Limiting**: Prevents abuse with configurable limits
- **Input Validation**: Comprehensive validation using express-validator
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers
- **Password Hashing**: bcryptjs for secure password storage
- **JWT**: Secure token-based authentication
- **File Upload Validation**: Type and size restrictions

## 🚀 Deployment

### Production Setup

1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Set up proper JWT secret
4. Configure email settings
5. Set up file storage (consider cloud storage)
6. Configure CORS for production domain

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/electrical-services
JWT_SECRET=your-super-secure-production-secret
FRONTEND_URL=https://yourdomain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:

1. Check the API documentation
2. Review the error logs
3. Create an issue in the repository

## 🔄 API Versioning

The API is currently at version 1.0. Future versions will be available at `/api/v2/`, etc.

## 📊 Health Check

Check API health:

```http
GET /health
```

Response:
```json
{
  "status": "OK",
  "message": "Electrical Services API is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
``` 