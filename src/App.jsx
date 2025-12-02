import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import useDeviceDetect from './hooks/useDeviceDetect';
import useTheme from './hooks/useTheme';
import { getAbout, getWallpaper } from './services/api';
import LockScreen from './components/LockScreen';
import Wallpaper from './components/ui/Wallpaper';
import AdminPanel from './components/admin/AdminPanel';
import MenuBar from './components/layout/MenuBar';
import Dock from './components/layout/Dock';
import IOSGrid from './components/layout/iOSGrid';
import MacWindow from './components/layout/MacWindow';
import IOSPanel from './components/layout/iOSPanel';
import AboutApp from './components/apps/AboutApp';
import ProjectsApp from './components/apps/ProjectsApp';
import SkillsApp from './components/apps/SkillsApp';
import ContactApp from './components/apps/ContactApp';
import './styles/index.css';

function App() {
  const { isLocked, isAdmin } = useAuth();
  const isMobile = useDeviceDetect();
  const { isDark, toggleTheme } = useTheme();
  const [openApp, setOpenApp] = useState(null);
  const [wallpaper, setWallpaper] = useState(isDark ? 'macos-dark' : 'gradient-1');
  const [aboutData, setAboutData] = useState({
    name: 'Your Name',
    title: 'Full Stack Developer',
    description: 'Passionate developer with expertise in building modern web applications using the MERN stack. I love creating beautiful, performant, and user-friendly interfaces that deliver exceptional experiences.',
    avatar: '👨‍💻'
  });

  // Fetch data from database on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutResponse, wallpaperResponse] = await Promise.all([
          getAbout(),
          getWallpaper()
        ]);

        if (aboutResponse) {
          setAboutData(aboutResponse);
        }

        if (wallpaperResponse) {
          setWallpaper(wallpaperResponse.wallpaperId);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Show lock screen if locked
  if (isLocked) {
    return <LockScreen />;
  }

  const apps = [
    { id: 'about', name: 'About Me', icon: '👤', component: AboutApp, props: { aboutData, isAdmin } },
    { id: 'projects', name: 'Projects', icon: '💼', component: ProjectsApp, props: { isAdmin } },
    { id: 'skills', name: 'Skills', icon: '⚡', component: SkillsApp, props: { isAdmin } },
    { id: 'contact', name: 'Contact', icon: '✉️', component: ContactApp, props: { isAdmin } },
  ];

  const handleOpenApp = (appId) => {
    setOpenApp(appId);
  };

  const handleCloseApp = () => {
    setOpenApp(null);
  };

  const currentApp = apps.find(app => app.id === openApp);

  return (
    <div className="app">
      <Wallpaper wallpaper={wallpaper} />
      <AdminPanel
        currentWallpaper={wallpaper}
        onWallpaperChange={setWallpaper}
        aboutData={aboutData}
        onAboutChange={setAboutData}
      />
      {isMobile ? (
        // iOS-style mobile view
        <>
          <IOSGrid apps={apps} onAppClick={handleOpenApp} isDark={isDark} toggleTheme={toggleTheme} />
          {currentApp && (
            <IOSPanel
              app={currentApp}
              onClose={handleCloseApp}
            />
          )}
        </>
      ) : (
        // macOS-style desktop view
        <>
          <MenuBar isDark={isDark} toggleTheme={toggleTheme} />
          <Dock apps={apps} onAppClick={handleOpenApp} />
          {currentApp && (
            <MacWindow
              app={currentApp}
              onClose={handleCloseApp}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
