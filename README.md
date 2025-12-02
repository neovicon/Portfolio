# 🍎 MERN Portfolio with Apple-Inspired UI

A high-performance portfolio website featuring adaptive UI that mimics macOS on desktop and iOS on mobile devices. Built with the MERN stack (MongoDB, Express, React, Node.js) with a focus on performance and stunning visual design.

## ✨ Features

### Desktop (macOS-style)
- 🖥️ macOS-inspired menu bar with system icons and time
- 🎯 Dock with app icons and smooth hover animations
- 🪟 Draggable windows with glassmorphism effects
- 🎨 Traffic light window controls (close, minimize, maximize)

### Mobile (iOS-style)
- 📱 iOS-inspired home screen with app grid
- 🔄 Smooth slide-up panel animations
- 👆 Touch-optimized interactions
- 📊 Status bar and home indicator

### General
- 🌓 Light/Dark mode toggle with localStorage persistence
- 💼 Dynamic project loading from MongoDB
- ✉️ Contact form with backend integration
- ⚡ CSS-only animations for optimal performance
- 🎭 Glassmorphism and blur effects
- 📱 Fully responsive design

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Vite (fast build tool)
- Axios (HTTP client)
- CSS3 (glassmorphism, animations)

**Backend:**
- Node.js
- Express
- MongoDB with Mongoose
- CORS

## 📁 Project Structure

```
Portfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── apps/      # App components
│   │   │   │   ├── AboutApp.jsx
│   │   │   │   ├── ProjectsApp.jsx
│   │   │   │   ├── SkillsApp.jsx
│   │   │   │   └── ContactApp.jsx
│   │   │   └── layout/    # Layout components
│   │   │       ├── MenuBar.jsx
│   │   │       ├── Dock.jsx
│   │   │       ├── MacWindow.jsx
│   │   │       ├── iOSGrid.jsx
│   │   │       └── iOSPanel.jsx
│   │   ├── hooks/         # Custom React hooks
│   │   │   ├── useDeviceDetect.js
│   │   │   └── useTheme.js
│   │   ├── services/      # API services
│   │   │   └── api.js
│   │   ├── styles/        # CSS files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
└── server/                # Express backend
    ├── models/
    │   ├── Project.js
    │   └── Contact.js
    ├── routes/
    │   ├── projectRoutes.js
    │   └── contactRoutes.js
    ├── controllers/
    │   ├── projectController.js
    │   └── contactController.js
    ├── server.js
    ├── seedData.js
    ├── .env
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd /home/daniel/Portfolio
```

2. **Set up the backend**
```bash
cd server
npm install
```

3. **Configure environment variables**

Create `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
```

4. **Seed the database**
```bash
npm run seed
```

5. **Start the backend server**
```bash
npm run dev
```

6. **Set up the frontend** (in a new terminal)
```bash
cd client
npm install
```

7. **Configure frontend environment**

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

8. **Start the frontend**
```bash
npm run dev
```

9. **Open your browser**
```
http://localhost:5173
```

## 📡 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (for seeding)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)

### Health
- `GET /api/health` - Server health check

## 🎨 Customization

### Update Personal Information

Edit `client/src/components/apps/AboutApp.jsx`:
```javascript
<h2 className="about-name">Your Name</h2>
<p className="about-title">Your Title</p>
```

### Add Your Projects

Edit `server/seedData.js` or use the API to add projects:
```javascript
{
  title: 'Project Name',
  description: 'Project description',
  image: 'https://example.com/image.jpg',
  link: 'https://project-url.com',
  technologies: ['React', 'Node.js'],
  featured: true
}
```

### Customize Skills

Edit `client/src/components/apps/SkillsApp.jsx`:
```javascript
const skills = {
  'Frontend': ['React', 'JavaScript', ...],
  'Backend': ['Node.js', 'Express', ...],
  // Add your skills
};
```

### Theme Colors

Edit `client/src/styles/index.css` CSS variables:
```css
:root {
  --accent: #0071e3;
  --accent-hover: #0077ed;
  /* Customize colors */
}
```

## ⚡ Performance Optimizations

- ✅ CSS-only animations (no heavy JS libraries)
- ✅ Lazy loading for images
- ✅ Minimal bundle size
- ✅ Optimized re-renders with React hooks
- ✅ WebP image format support
- ✅ Backdrop-filter for glassmorphism
- ✅ Reduced motion support

## 📱 Responsive Breakpoints

- Mobile: < 768px (iOS-style)
- Desktop: ≥ 768px (macOS-style)

## 🔧 Scripts

### Backend
```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
npm run seed    # Populate database with sample data
```

### Frontend
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

## 🌐 Deployment

### Backend (Render, Railway, etc.)
1. Set environment variables
2. Deploy from GitHub
3. Update `MONGODB_URI` to production database

### Frontend (Vercel, Netlify, etc.)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Update `VITE_API_URL` to production API

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🙏 Acknowledgments

- Inspired by Apple's macOS and iOS design language
- Built with modern web technologies
- Focused on performance and user experience

---

**Made with ❤️ using the MERN stack**
# Portfolio
