const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const emailTemplates = {
  contactConfirmation: (data) => ({
    subject: 'Thank you for contacting us',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Thank you for contacting us!</h2>
        <p>Dear ${data.firstName},</p>
        <p>We have received your message and will get back to you within 24 hours.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Your Message Details:</h3>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong> ${data.message}</p>
          <p><strong>Service Type:</strong> ${data.serviceType || 'General'}</p>
          <p><strong>Urgency:</strong> ${data.urgency || 'Normal'}</p>
        </div>
        
        <p>If you have any urgent electrical issues, please call us at <strong>(555) 123-4567</strong>.</p>
        
        <p>Best regards,<br>The Electrical Services Team</p>
      </div>
    `
  }),

  bookingConfirmation: (data) => ({
    subject: 'Service Booking Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Service Booking Confirmation</h2>
        <p>Dear ${data.customer.fullName},</p>
        <p>Your service booking has been received and is being processed.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Booking Details:</h3>
          <p><strong>Service Type:</strong> ${data.service.type}</p>
          <p><strong>Description:</strong> ${data.service.description}</p>
          <p><strong>Preferred Date:</strong> ${new Date(data.scheduling.preferredDate).toLocaleDateString()}</p>
          <p><strong>Preferred Time:</strong> ${data.scheduling.preferredTime}</p>
        </div>
        
        <p>We will contact you within 24 hours to confirm your appointment and provide further details.</p>
        
        <p>Best regards,<br>The Electrical Services Team</p>
      </div>
    `
  }),

  quoteRequest: (data) => ({
    subject: 'Quote Request Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Quote Request Received</h2>
        <p>Dear ${data.customer.fullName},</p>
        <p>Thank you for your quote request. We will review your project details and provide you with a detailed quote within 24 hours.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Project Details:</h3>
          <p><strong>Project Type:</strong> ${data.project.type}</p>
          <p><strong>Description:</strong> ${data.project.description}</p>
          <p><strong>Scope:</strong> ${data.project.scope || 'Not specified'}</p>
          <p><strong>Urgency:</strong> ${data.project.urgency || 'Normal'}</p>
          <p><strong>Timeline:</strong> ${data.project.timeline || 'Flexible'}</p>
        </div>
        
        <p>Our team will analyze your requirements and provide you with a comprehensive quote including materials, labor, and timeline.</p>
        
        <p>Best regards,<br>The Electrical Services Team</p>
      </div>
    `
  }),

  adminNotification: (type, data) => ({
    subject: `New ${type} - Action Required`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">New ${type}</h2>
        <p>A new ${type.toLowerCase()} has been submitted and requires your attention.</p>
        
        <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Details:</h3>
          ${Object.entries(data).map(([key, value]) => 
            `<p><strong>${key}:</strong> ${value}</p>`
          ).join('')}
        </div>
        
        <p>Please log into the admin dashboard to review and take action.</p>
      </div>
    `
  }),

  passwordReset: (resetUrl) => ({
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Password Reset Request</h2>
        <p>You requested a password reset for your account.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
        </div>
        
        <p>If you didn't request this, please ignore this email. This link will expire in 10 minutes.</p>
        
        <p>Best regards,<br>The Electrical Services Team</p>
      </div>
    `
  }),

  emailVerification: (verificationUrl) => ({
    subject: 'Verify Your Email Address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Verify Your Email Address</h2>
        <p>Please verify your email address to complete your registration.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Verify Email
          </a>
        </div>
        
        <p>If you didn't create an account, please ignore this email.</p>
        
        <p>Best regards,<br>The Electrical Services Team</p>
      </div>
    `
  })
};

// Send email function
const sendEmail = async (to, template, data = {}) => {
  try {
    const transporter = createTransporter();
    const emailContent = emailTemplates[template](data);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: to,
      subject: emailContent.subject,
      html: emailContent.html
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

// Send contact confirmation
const sendContactConfirmation = async (contactData) => {
  return await sendEmail(contactData.email, 'contactConfirmation', contactData);
};

// Send booking confirmation
const sendBookingConfirmation = async (bookingData) => {
  return await sendEmail(bookingData.customer.email, 'bookingConfirmation', bookingData);
};

// Send quote request confirmation
const sendQuoteRequest = async (quoteData) => {
  return await sendEmail(quoteData.customer.email, 'quoteRequest', quoteData);
};

// Send admin notification
const sendAdminNotification = async (adminEmail, type, data) => {
  return await sendEmail(adminEmail, 'adminNotification', { type, ...data });
};

// Send password reset email
const sendPasswordReset = async (email, resetUrl) => {
  return await sendEmail(email, 'passwordReset', { resetUrl });
};

// Send email verification
const sendEmailVerification = async (email, verificationUrl) => {
  return await sendEmail(email, 'emailVerification', { verificationUrl });
};

// Send custom email
const sendCustomEmail = async (to, subject, html) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: to,
      subject: subject,
      html: html
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Custom email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Custom email sending failed:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendEmail,
  sendContactConfirmation,
  sendBookingConfirmation,
  sendQuoteRequest,
  sendAdminNotification,
  sendPasswordReset,
  sendEmailVerification,
  sendCustomEmail,
  emailTemplates
}; 