import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';

dotenv.config();

const sampleProjects = [
    {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce application with cart, checkout, and payment integration.',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
        link: 'https://example.com/ecommerce',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        featured: true
    },
    {
        title: 'Social Media Dashboard',
        description: 'Analytics dashboard for tracking social media metrics across multiple platforms.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        link: 'https://example.com/dashboard',
        technologies: ['React', 'D3.js', 'Express', 'PostgreSQL'],
        featured: true
    },
    {
        title: 'Task Management App',
        description: 'Collaborative task management tool with real-time updates and team features.',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
        link: 'https://example.com/tasks',
        technologies: ['React', 'Firebase', 'Material-UI'],
        featured: false
    },
    {
        title: 'Weather Forecast App',
        description: 'Beautiful weather application with 7-day forecasts and location-based alerts.',
        image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80',
        link: 'https://example.com/weather',
        technologies: ['React', 'OpenWeather API', 'CSS3'],
        featured: false
    },
    {
        title: 'Blog Platform',
        description: 'Modern blogging platform with markdown support and SEO optimization.',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
        link: 'https://example.com/blog',
        technologies: ['Next.js', 'MongoDB', 'TailwindCSS'],
        featured: true
    },
    {
        title: 'Fitness Tracker',
        description: 'Track workouts, nutrition, and progress with detailed analytics and charts.',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
        link: 'https://example.com/fitness',
        technologies: ['React Native', 'Node.js', 'MongoDB'],
        featured: false
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing projects
        await Project.deleteMany({});
        console.log('🗑️  Cleared existing projects');

        // Insert sample projects
        await Project.insertMany(sampleProjects);
        console.log('✅ Sample projects inserted successfully');

        console.log(`📊 Total projects: ${sampleProjects.length}`);

        mongoose.connection.close();
        console.log('👋 Database connection closed');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
