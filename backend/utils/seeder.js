const mongoose = require('mongoose');
const User = require('../models/User');
const Blog = require('../models/Blog');
const Service = require('../models/Service');
require('dotenv').config();

// Sample data
const sampleUsers = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@electricalservices.com',
    password: 'Admin123!',
    role: 'admin',
    isEmailVerified: true,
    phone: '+1234567890'
  },
  {
    firstName: 'John',
    lastName: 'Technician',
    email: 'john@electricalservices.com',
    password: 'Tech123!',
    role: 'technician',
    isEmailVerified: true,
    phone: '+1234567891'
  },
  {
    firstName: 'Sarah',
    lastName: 'Technician',
    email: 'sarah@electricalservices.com',
    password: 'Tech123!',
    role: 'technician',
    isEmailVerified: true,
    phone: '+1234567892'
  }
];

const sampleServices = [
  {
    name: 'Residential Wiring',
    category: 'residential',
    subcategory: 'Wiring',
    description: 'Complete residential electrical wiring services including new construction, renovations, and upgrades.',
    longDescription: 'Our residential wiring services cover everything from new home construction to electrical upgrades and renovations. We ensure all work meets local building codes and safety standards.',
    features: [
      {
        title: 'Code Compliance',
        description: 'All work meets local electrical codes and safety standards'
      },
      {
        title: 'Warranty',
        description: 'Comprehensive warranty on all materials and workmanship'
      },
      {
        title: 'Safety First',
        description: 'Licensed and insured technicians with safety training'
      }
    ],
    benefits: [
      {
        title: 'Increased Safety',
        description: 'Modern wiring reduces fire hazards and electrical risks'
      },
      {
        title: 'Better Performance',
        description: 'Improved electrical efficiency and reliability'
      },
      {
        title: 'Future Ready',
        description: 'Wiring designed to accommodate future electrical needs'
      }
    ],
    pricing: {
      type: 'quote',
      basePrice: 150,
      currency: 'USD',
      notes: 'Pricing varies based on project scope and complexity'
    },
    duration: {
      estimated: '1-3 days',
      minHours: 8,
      maxHours: 24
    },
    isActive: true,
    isFeatured: true,
    isPopular: true,
    sortOrder: 1
  },
  {
    name: 'Commercial Electrical',
    category: 'commercial',
    subcategory: 'Commercial',
    description: 'Comprehensive commercial electrical services for businesses, offices, and retail spaces.',
    longDescription: 'We provide complete commercial electrical solutions including installation, maintenance, and emergency services for businesses of all sizes.',
    features: [
      {
        title: '24/7 Emergency Service',
        description: 'Round-the-clock emergency electrical services'
      },
      {
        title: 'Preventive Maintenance',
        description: 'Regular maintenance programs to prevent electrical issues'
      },
      {
        title: 'Energy Efficiency',
        description: 'LED lighting and energy-efficient solutions'
      }
    ],
    benefits: [
      {
        title: 'Minimal Disruption',
        description: 'Work scheduled to minimize business interruption'
      },
      {
        title: 'Cost Savings',
        description: 'Energy-efficient solutions reduce operating costs'
      },
      {
        title: 'Compliance',
        description: 'Ensures compliance with commercial electrical codes'
      }
    ],
    pricing: {
      type: 'quote',
      basePrice: 200,
      currency: 'USD',
      notes: 'Commercial rates apply, contact for detailed quote'
    },
    duration: {
      estimated: 'Varies by project',
      minHours: 4,
      maxHours: 40
    },
    isActive: true,
    isFeatured: true,
    isPopular: false,
    sortOrder: 2
  },
  {
    name: 'Emergency Electrical',
    category: 'emergency',
    subcategory: 'Emergency',
    description: '24/7 emergency electrical services for urgent electrical issues and repairs.',
    longDescription: 'When electrical emergencies strike, our team is available 24/7 to provide immediate assistance and repairs to restore power and safety.',
    features: [
      {
        title: '24/7 Availability',
        description: 'Emergency services available around the clock'
      },
      {
        title: 'Rapid Response',
        description: 'Quick response times for urgent electrical issues'
      },
      {
        title: 'Safety Assessment',
        description: 'Immediate safety evaluation and hazard mitigation'
      }
    ],
    benefits: [
      {
        title: 'Peace of Mind',
        description: 'Knowing help is available when you need it most'
      },
      {
        title: 'Safety First',
        description: 'Immediate attention to prevent electrical hazards'
      },
      {
        title: 'Minimal Downtime',
        description: 'Quick restoration of electrical service'
      }
    ],
    pricing: {
      type: 'hourly',
      hourlyRate: 150,
      currency: 'USD',
      notes: 'Emergency rates apply, minimum 2-hour charge'
    },
    duration: {
      estimated: '1-4 hours',
      minHours: 2,
      maxHours: 8
    },
    isActive: true,
    isFeatured: true,
    isPopular: true,
    sortOrder: 3
  },
  {
    name: 'Electrical Panel Upgrade',
    category: 'residential',
    subcategory: 'Upgrade',
    description: 'Upgrade your electrical panel to meet modern electrical demands and safety standards.',
    longDescription: 'Modern homes require more electrical capacity than older panels can provide. Our panel upgrades ensure your home can safely handle today\'s electrical demands.',
    features: [
      {
        title: 'Capacity Upgrade',
        description: 'Increase electrical capacity for modern appliances'
      },
      {
        title: 'Safety Improvements',
        description: 'Modern circuit breakers and safety features'
      },
      {
        title: 'Code Compliance',
        description: 'Meets current electrical code requirements'
      }
    ],
    benefits: [
      {
        title: 'Increased Safety',
        description: 'Modern panels provide better protection against electrical hazards'
      },
      {
        title: 'Future Ready',
        description: 'Accommodates future electrical needs and additions'
      },
      {
        title: 'Insurance Benefits',
        description: 'May qualify for insurance discounts'
      }
    ],
    pricing: {
      type: 'fixed',
      basePrice: 2500,
      currency: 'USD',
      notes: 'Price includes panel, breakers, and installation'
    },
    duration: {
      estimated: '4-8 hours',
      minHours: 4,
      maxHours: 8
    },
    isActive: true,
    isFeatured: false,
    isPopular: true,
    sortOrder: 4
  },
  {
    name: 'LED Lighting Installation',
    category: 'residential',
    subcategory: 'Lighting',
    description: 'Energy-efficient LED lighting installation for homes and businesses.',
    longDescription: 'Upgrade to LED lighting for significant energy savings, longer bulb life, and better lighting quality. We handle both residential and commercial LED installations.',
    features: [
      {
        title: 'Energy Savings',
        description: 'Up to 90% energy savings compared to traditional lighting'
      },
      {
        title: 'Long Lifespan',
        description: 'LED bulbs last 10-25 times longer than incandescent'
      },
      {
        title: 'Smart Options',
        description: 'Smart LED systems with remote control and automation'
      }
    ],
    benefits: [
      {
        title: 'Lower Bills',
        description: 'Significant reduction in electricity costs'
      },
      {
        title: 'Better Lighting',
        description: 'Improved light quality and color options'
      },
      {
        title: 'Eco-Friendly',
        description: 'Reduced carbon footprint and environmental impact'
      }
    ],
    pricing: {
      type: 'quote',
      basePrice: 100,
      currency: 'USD',
      notes: 'Pricing depends on number of fixtures and complexity'
    },
    duration: {
      estimated: '2-6 hours',
      minHours: 2,
      maxHours: 6
    },
    isActive: true,
    isFeatured: false,
    isPopular: false,
    sortOrder: 5
  }
];

const sampleBlogs = [
  {
    title: 'Essential Electrical Safety Tips for Your Home',
    excerpt: 'Learn the most important electrical safety practices to keep your home and family safe from electrical hazards.',
    content: `
      <h2>Electrical Safety: Protecting Your Home and Family</h2>
      
      <p>Electrical safety is crucial for every homeowner. Understanding basic electrical safety practices can prevent accidents, fires, and injuries. Here are the most important electrical safety tips you should follow:</p>
      
      <h3>1. Regular Electrical Inspections</h3>
      <p>Schedule professional electrical inspections every 3-5 years, or when you purchase a new home. A qualified electrician can identify potential hazards before they become serious problems.</p>
      
      <h3>2. Don't Overload Outlets</h3>
      <p>Never plug too many devices into a single outlet or power strip. This can cause overheating and potentially start a fire. Use power strips with built-in circuit breakers for additional protection.</p>
      
      <h3>3. Check for Damaged Cords</h3>
      <p>Regularly inspect electrical cords for damage, fraying, or exposed wires. Replace damaged cords immediately and never attempt to repair them with tape.</p>
      
      <h3>4. Keep Electrical Devices Away from Water</h3>
      <p>Water and electricity don't mix. Keep all electrical devices, cords, and outlets away from water sources like sinks, bathtubs, and outdoor areas during rain.</p>
      
      <h3>5. Use Ground Fault Circuit Interrupters (GFCIs)</h3>
      <p>Install GFCIs in bathrooms, kitchens, laundry rooms, and outdoor areas. These devices can prevent serious electrical shocks by cutting off power when they detect a ground fault.</p>
      
      <h3>6. Childproof Your Outlets</h3>
      <p>If you have young children, install tamper-resistant outlets or outlet covers to prevent them from inserting objects into electrical outlets.</p>
      
      <h3>7. Know Your Electrical Panel</h3>
      <p>Locate your main electrical panel and know how to turn off power in case of an emergency. Label circuit breakers clearly for easy identification.</p>
      
      <h3>8. Don't Ignore Warning Signs</h3>
      <p>Pay attention to warning signs like:</p>
      <ul>
        <li>Frequent circuit breaker trips</li>
        <li>Flickering or dimming lights</li>
        <li>Warm outlets or switches</li>
        <li>Burning smells</li>
        <li>Buzzing sounds from electrical devices</li>
      </ul>
      
      <h3>9. Use the Right Bulbs</h3>
      <p>Always use light bulbs with the correct wattage for your fixtures. Using bulbs with higher wattage than recommended can cause overheating and fire.</p>
      
      <h3>10. Hire Qualified Professionals</h3>
      <p>For any electrical work beyond simple tasks like changing light bulbs, hire a licensed and insured electrician. DIY electrical work can be dangerous and may not meet code requirements.</p>
      
      <h2>Emergency Preparedness</h2>
      <p>In case of an electrical emergency:</p>
      <ol>
        <li>Turn off power at the main panel if safe to do so</li>
        <li>Call emergency services if there's a fire</li>
        <li>Contact a licensed electrician for repairs</li>
        <li>Don't attempt to fix electrical problems yourself</li>
      </ol>
      
      <p>Remember, electrical safety is not something to take lightly. By following these guidelines and staying vigilant, you can protect your home and family from electrical hazards.</p>
    `,
    category: 'safety',
    tags: ['safety', 'home', 'electrical', 'tips', 'prevention'],
    featuredImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
    readTime: '8 min read',
    status: 'published',
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date('2024-01-10')
  },
  {
    title: 'Understanding Your Home\'s Electrical System',
    excerpt: 'A comprehensive guide to understanding how your home\'s electrical system works and what each component does.',
    content: `
      <h2>Your Home's Electrical System: A Complete Guide</h2>
      
      <p>Understanding your home's electrical system is essential for every homeowner. This knowledge helps you make informed decisions about electrical upgrades, troubleshoot problems, and communicate effectively with electricians.</p>
      
      <h3>The Main Components</h3>
      
      <h4>1. Service Entrance</h4>
      <p>The service entrance is where electricity from the utility company enters your home. It consists of:</p>
      <ul>
        <li><strong>Service Drop:</strong> The overhead wires from the utility pole</li>
        <li><strong>Meter:</strong> Measures your electricity consumption</li>
        <li><strong>Main Disconnect:</strong> Allows you to shut off all power to your home</li>
      </ul>
      
      <h4>2. Electrical Panel (Circuit Breaker Box)</h4>
      <p>This is the heart of your electrical system. It contains:</p>
      <ul>
        <li><strong>Main Circuit Breaker:</strong> Controls power to the entire house</li>
        <li><strong>Individual Circuit Breakers:</strong> Protect specific circuits</li>
        <li><strong>Neutral and Ground Bars:</strong> Provide safe return paths for electricity</li>
      </ul>
      
      <h4>3. Branch Circuits</h4>
      <p>These are the individual circuits that power different areas of your home:</p>
      <ul>
        <li><strong>General Purpose Circuits:</strong> Power outlets and lights</li>
        <li><strong>Appliance Circuits:</strong> Dedicated circuits for major appliances</li>
        <li><strong>Specialty Circuits:</strong> For specific equipment like HVAC systems</li>
      </ul>
      
      <h3>Understanding Circuit Breakers</h3>
      <p>Circuit breakers are safety devices that automatically shut off power when they detect:</p>
      <ul>
        <li><strong>Overload:</strong> Too much current flowing through the circuit</li>
        <li><strong>Short Circuit:</strong> A direct connection between hot and neutral wires</li>
        <li><strong>Ground Fault:</strong> Current flowing through an unintended path</li>
      </ul>
      
      <h3>Types of Electrical Outlets</h3>
      
      <h4>Standard Outlets (120V)</h4>
      <p>These are the most common outlets in your home, used for:</p>
      <ul>
        <li>Lamps and small appliances</li>
        <li>Electronics and chargers</li>
        <li>Kitchen appliances</li>
      </ul>
      
      <h4>High-Voltage Outlets (240V)</h4>
      <p>Used for major appliances that require more power:</p>
      <ul>
        <li>Electric dryers</li>
        <li>Electric ranges</li>
        <li>Air conditioners</li>
        <li>Water heaters</li>
      </ul>
      
      <h4>GFCI Outlets</h4>
      <p>Ground Fault Circuit Interrupters provide additional protection in wet areas:</p>
      <ul>
        <li>Bathrooms</li>
        <li>Kitchens</li>
        <li>Laundry rooms</li>
        <li>Outdoor areas</li>
      </ul>
      
      <h3>Electrical Safety Devices</h3>
      
      <h4>Arc Fault Circuit Interrupters (AFCIs)</h4>
      <p>These devices detect dangerous electrical arcs and shut off power to prevent fires.</p>
      
      <h4>Ground Fault Circuit Interrupters (GFCIs)</h4>
      <p>GFCIs monitor the flow of current and shut off power if they detect a ground fault, preventing electrical shocks.</p>
      
      <h3>Common Electrical Problems</h3>
      
      <h4>1. Circuit Breaker Tripping</h4>
      <p>This usually indicates an overloaded circuit or a short circuit. Solutions include:</p>
      <ul>
        <li>Redistributing electrical loads</li>
        <li>Adding new circuits</li>
        <li>Fixing faulty appliances</li>
      </ul>
      
      <h4>2. Flickering Lights</h4>
      <p>Can be caused by loose connections, faulty switches, or voltage fluctuations.</p>
      
      <h4>3. Warm Outlets</h4>
      <p>This is a serious warning sign that requires immediate attention from a qualified electrician.</p>
      
      <h3>When to Upgrade Your Electrical System</h3>
      <p>Consider upgrading if you experience:</p>
      <ul>
        <li>Frequent circuit breaker trips</li>
        <li>Insufficient outlets for modern needs</li>
        <li>Older wiring (aluminum or knob-and-tube)</li>
        <li>Adding major appliances</li>
        <li>Home renovations or additions</li>
      </ul>
      
      <h3>Maintenance Tips</h3>
      <ol>
        <li>Test GFCI outlets monthly</li>
        <li>Check for loose outlets and switches</li>
        <li>Inspect electrical cords regularly</li>
        <li>Keep electrical panels accessible</li>
        <li>Schedule professional inspections</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>Understanding your home's electrical system empowers you to make better decisions about electrical safety and maintenance. While some basic troubleshooting is possible, always consult a qualified electrician for repairs and upgrades to ensure safety and code compliance.</p>
    `,
    category: 'education',
    tags: ['electrical system', 'home', 'education', 'circuits', 'safety'],
    featuredImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
    readTime: '12 min read',
    status: 'published',
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date('2024-01-08')
  },
  {
    title: 'The Benefits of LED Lighting: Why Make the Switch?',
    excerpt: 'Discover the advantages of LED lighting and why upgrading to LED can save you money while improving your home\'s lighting quality.',
    content: `
      <h2>LED Lighting: The Smart Choice for Modern Homes</h2>
      
      <p>LED (Light Emitting Diode) lighting has revolutionized the way we light our homes and businesses. With significant advances in technology, LEDs now offer superior performance, energy efficiency, and versatility compared to traditional lighting options.</p>
      
      <h3>Energy Efficiency: The Biggest Advantage</h3>
      <p>LEDs are incredibly energy-efficient, using up to 90% less energy than traditional incandescent bulbs. This translates to:</p>
      <ul>
        <li>Significantly lower electricity bills</li>
        <li>Reduced carbon footprint</li>
        <li>Less strain on electrical systems</li>
        <li>Lower cooling costs (LEDs produce minimal heat)</li>
      </ul>
      
      <h3>Longevity: Built to Last</h3>
      <p>LED bulbs have an impressive lifespan:</p>
      <ul>
        <li><strong>25,000-50,000 hours</strong> compared to 1,000 hours for incandescent</li>
        <li>10-25 times longer than traditional bulbs</li>
        <li>Fewer replacements mean less waste</li>
        <li>Reduced maintenance costs</li>
      </ul>
      
      <h3>Superior Light Quality</h3>
      <p>Modern LEDs offer excellent light quality with:</p>
      <ul>
        <li><strong>High Color Rendering Index (CRI):</strong> Better color accuracy</li>
        <li><strong>Multiple Color Temperatures:</strong> From warm to cool white</li>
        <li><strong>Instant On:</strong> No warm-up time required</li>
        <li><strong>Dimmable Options:</strong> Compatible with most dimmer switches</li>
      </ul>
      
      <h3>Versatility and Design Options</h3>
      <p>LEDs come in various shapes, sizes, and styles:</p>
      <ul>
        <li>Standard bulb shapes (A19, BR30, etc.)</li>
        <li>Strip lighting for under-cabinet and accent lighting</li>
        <li>Recessed lighting options</li>
        <li>Outdoor and landscape lighting</li>
        <li>Smart LED systems with remote control</li>
      </ul>
      
      <h3>Smart Lighting Integration</h3>
      <p>LED technology enables advanced smart lighting features:</p>
      <ul>
        <li><strong>Remote Control:</strong> Control lights from your smartphone</li>
        <li><strong>Voice Control:</strong> Integration with Alexa, Google Assistant, and Siri</li>
        <li><strong>Scheduling:</strong> Automate lighting based on time or occupancy</li>
        <li><strong>Color Changing:</strong> Create different moods and atmospheres</li>
        <li><strong>Energy Monitoring:</strong> Track usage and optimize efficiency</li>
      </ul>
      
      <h3>Environmental Benefits</h3>
      <p>LED lighting is environmentally friendly:</p>
      <ul>
        <li>Reduced energy consumption</li>
        <li>Lower greenhouse gas emissions</li>
        <li>No mercury content (unlike CFLs)</li>
        <li>Recyclable materials</li>
        <li>Reduced waste from fewer replacements</li>
      </ul>
      
      <h3>Cost Analysis: Initial vs. Long-term Savings</h3>
      <p>While LEDs have higher upfront costs, the long-term savings are substantial:</p>
      
      <h4>Example: Living Room Lighting</h4>
      <p>Replacing 10 incandescent bulbs (60W each) with LED equivalents (10W each):</p>
      <ul>
        <li><strong>Energy Savings:</strong> 500W reduction in power consumption</li>
        <li><strong>Annual Savings:</strong> $200-300 in electricity costs</li>
        <li><strong>Bulb Replacement:</strong> 1-2 times per year vs. every 10+ years</li>
        <li><strong>Payback Period:</strong> 6-12 months</li>
      </ul>
      
      <h3>Choosing the Right LED Bulbs</h3>
      
      <h4>Lumens vs. Watts</h4>
      <p>With LEDs, focus on lumens (brightness) rather than watts (power consumption):</p>
      <ul>
        <li>800 lumens ≈ 60W incandescent</li>
        <li>1100 lumens ≈ 75W incandescent</li>
        <li>1600 lumens ≈ 100W incandescent</li>
      </ul>
      
      <h4>Color Temperature</h4>
      <p>Choose the right color temperature for your space:</p>
      <ul>
        <li><strong>2700K-3000K:</strong> Warm white (cozy, residential)</li>
        <li><strong>3500K-4100K:</strong> Cool white (bright, task lighting)</li>
        <li><strong>5000K-6500K:</strong> Daylight (natural, outdoor)</li>
      </ul>
      
      <h3>Installation Considerations</h3>
      <p>When upgrading to LED lighting:</p>
      <ul>
        <li>Check compatibility with existing dimmer switches</li>
        <li>Consider upgrading to smart switches for enhanced control</li>
        <li>Plan for proper disposal of old bulbs</li>
        <li>Consult with an electrician for complex installations</li>
      </ul>
      
      <h3>Common Applications</h3>
      
      <h4>Residential</h4>
      <ul>
        <li>General lighting (living rooms, bedrooms)</li>
        <li>Task lighting (kitchens, home offices)</li>
        <li>Accent lighting (artwork, architectural features)</li>
        <li>Outdoor lighting (porches, gardens, security)</li>
      </ul>
      
      <h4>Commercial</h4>
      <ul>
        <li>Office lighting</li>
        <li>Retail displays</li>
        <li>Warehouse and industrial lighting</li>
        <li>Street and parking lot lighting</li>
      </ul>
      
      <h2>Making the Switch</h2>
      <p>Upgrading to LED lighting is one of the smartest investments you can make for your home or business. The combination of energy savings, longevity, and superior performance makes LEDs the clear choice for modern lighting needs.</p>
      
      <p>Start with high-use areas like kitchens and living rooms, then gradually replace other lighting throughout your home. The savings will add up quickly, and you'll enjoy better lighting quality immediately.</p>
    `,
    category: 'technology',
    tags: ['LED', 'lighting', 'energy efficiency', 'technology', 'savings'],
    featuredImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
    readTime: '10 min read',
    status: 'published',
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2024-01-05')
  }
];

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/electrical-services');
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Clear existing data
const clearData = async () => {
  try {
    await User.deleteMany({});
    await Blog.deleteMany({});
    await Service.deleteMany({});
    console.log('Existing data cleared');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

// Seed users
const seedUsers = async () => {
  try {
    const createdUsers = [];
    
    for (const userData of sampleUsers) {
      const user = await User.create(userData);
      createdUsers.push(user);
      console.log(`Created user: ${user.email}`);
    }
    
    return createdUsers;
  } catch (error) {
    console.error('Error seeding users:', error);
    return [];
  }
};

// Seed services
const seedServices = async () => {
  try {
    const createdServices = [];
    
    for (const serviceData of sampleServices) {
      const service = await Service.create(serviceData);
      createdServices.push(service);
      console.log(`Created service: ${service.name}`);
    }
    
    return createdServices;
  } catch (error) {
    console.error('Error seeding services:', error);
    return [];
  }
};

// Seed blogs
const seedBlogs = async (users) => {
  try {
    const adminUser = users.find(user => user.role === 'admin');
    if (!adminUser) {
      console.log('No admin user found for blog creation');
      return [];
    }
    
    const createdBlogs = [];
    
    for (const blogData of sampleBlogs) {
      const blog = await Blog.create({
        ...blogData,
        author: adminUser._id,
        authorName: `${adminUser.firstName} ${adminUser.lastName}`
      });
      createdBlogs.push(blog);
      console.log(`Created blog: ${blog.title}`);
    }
    
    return createdBlogs;
  } catch (error) {
    console.error('Error seeding blogs:', error);
    return [];
  }
};

// Main seeding function
const seedData = async () => {
  try {
    await connectDB();
    await clearData();
    
    console.log('Starting data seeding...');
    
    const users = await seedUsers();
    const services = await seedServices();
    const blogs = await seedBlogs(users);
    
    console.log('\nSeeding completed successfully!');
    console.log(`Created ${users.length} users`);
    console.log(`Created ${services.length} services`);
    console.log(`Created ${blogs.length} blogs`);
    
    console.log('\nSample login credentials:');
    console.log('Admin: admin@electricalservices.com / Admin123!');
    console.log('Technician: john@electricalservices.com / Tech123!');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedData();
}

module.exports = { seedData }; 