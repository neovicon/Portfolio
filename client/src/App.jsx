import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import useDeviceDetect from './hooks/useDeviceDetect';
import useTheme from './hooks/useTheme';
import { getAbout, getWallpaper, getFolders, createFolder, addFileToFolder, deleteFolder } from './services/api';
// ... (imports remain same)

// ... (inside DesktopView)

const handleDeleteFolder = async (folderId) => {
  if (window.confirm('Are you sure you want to delete this folder?')) {
    try {
      await deleteFolder(folderId);
      setCustomApps(prevApps => prevApps.filter(app => app.id !== folderId));
      setOpenApp(null);
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  }
};

// ... (handleAddFile, handleAddApp remain same)

// ... (inside currentAppProps logic)

// ...
import LockScreen from './components/LockScreen';
import Wallpaper from './components/ui/Wallpaper';
import AdminPanel from './components/admin/AdminPanel';
import MenuBar from './components/layout/MenuBar';
import Dock from './components/layout/Dock';
import IOSGrid from './components/layout/iOSGrid';
import MacWindow from './components/layout/MacWindow';
import IOSPanel from './components/layout/iOSPanel';
import DesktopIcons from './components/layout/DesktopIcons';
import AboutApp from './components/apps/AboutApp';
import ProjectsApp from './components/apps/ProjectsApp';
import SkillsApp from './components/apps/SkillsApp';
import ContactApp from './components/apps/ContactApp';
import AdminPlusApp from './components/apps/AdminPlusApp';
import FolderApp from './components/apps/FolderApp';
import './styles/index.css';

function DesktopView() {
  const { isAdmin } = useAuth();
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
  const [customApps, setCustomApps] = useState([]);
  const [searchParams] = useSearchParams();

  // Fetch data from database on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutResponse, wallpaperResponse, foldersResponse] = await Promise.all([
          getAbout(),
          getWallpaper(),
          getFolders()
        ]);

        if (aboutResponse) {
          setAboutData(aboutResponse);
        }

        if (wallpaperResponse) {
          setWallpaper(wallpaperResponse.wallpaperId);
        }

        if (foldersResponse) {
          const mappedFolders = foldersResponse.map(folder => ({
            id: folder._id,
            name: folder.name,
            icon: folder.icon,
            files: folder.files,
            component: FolderApp,
            // props will be generated dynamically
          }));
          setCustomApps(mappedFolders);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle deep linking
  useEffect(() => {
    const folderId = searchParams.get('folder');
    if (folderId) {
      // Wait for customApps to be populated
      if (customApps.length > 0) {
        const folder = customApps.find(app => app.id === folderId);
        if (folder) {
          setOpenApp(folderId);
        }
      }
    }
  }, [searchParams, customApps]);

  const handleAddFile = async (folderId, fileData) => {
    try {
      const updatedFolder = await addFileToFolder(folderId, fileData);
      setCustomApps(prevApps => prevApps.map(app => {
        if (app.id === folderId) {
          return {
            ...app,
            files: updatedFolder.files
          };
        }
        return app;
      }));
    } catch (error) {
      console.error('Error adding file:', error);
    }
  };

  const handleAddApp = async (newApp) => {
    try {
      const createdFolder = await createFolder({
        name: newApp.name,
        icon: newApp.icon
      });

      const newFolderApp = {
        id: createdFolder._id,
        name: createdFolder.name,
        icon: createdFolder.icon,
        files: [],
        component: FolderApp,
      };
      setCustomApps([...customApps, newFolderApp]);
      setOpenApp(null);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  const handleDeleteFolder = async (folderId) => {
    if (window.confirm('Are you sure you want to delete this folder?')) {
      try {
        await deleteFolder(folderId);
        setCustomApps(prevApps => prevApps.filter(app => app.id !== folderId));
        setOpenApp(null);
      } catch (error) {
        console.error('Error deleting folder:', error);
      }
    }
  };

  const defaultApps = [
    { id: 'about', name: 'About Me', icon: '👤', component: AboutApp, props: { aboutData, isAdmin } },
    { id: 'projects', name: 'Projects', icon: '💼', component: ProjectsApp, props: { isAdmin } },
    { id: 'skills', name: 'Skills', icon: '⚡', component: SkillsApp, props: { isAdmin } },
    { id: 'contact', name: 'Contact', icon: '✉️', component: ContactApp, props: { isAdmin } },
  ];

  const adminPlusApp = {
    id: 'admin-plus',
    name: 'Add Folder',
    icon: '➕',
    component: AdminPlusApp,
    props: { onAdd: handleAddApp, onClose: () => setOpenApp(null) }
  };

  // For Dock/Grid: Default apps always shown. 
  // Custom apps shown in Grid (Mobile) or DesktopIcons (Desktop).
  // Admin Plus shown in Grid (Mobile) or DesktopIcons (Desktop) if admin.

  const desktopIconApps = isAdmin ? [...customApps, adminPlusApp] : customApps;
  const mobileApps = isAdmin ? [...defaultApps, ...customApps, adminPlusApp] : [...defaultApps, ...customApps];

  const handleOpenApp = (appId) => {
    setOpenApp(appId);
  };

  const handleCloseApp = () => {
    setOpenApp(null);
  };

  // Merge all apps for finding current app
  const allApps = [...defaultApps, ...customApps, adminPlusApp];
  const currentAppObj = allApps.find(app => app.id === openApp);

  // Prepare props for the current app
  let currentAppProps = currentAppObj?.props || {};
  if (currentAppObj?.id && !defaultApps.find(a => a.id === currentAppObj.id) && currentAppObj.id !== 'admin-plus') {
    // It's a custom folder
    const fileId = searchParams.get('file');
    currentAppProps = {
      ...currentAppProps,
      folder: currentAppObj,
      isAdmin,
      onAddFile: (fileData) => handleAddFile(currentAppObj.id, fileData),
      onDeleteFolder: () => handleDeleteFolder(currentAppObj.id),
      name: currentAppObj.name,
      icon: currentAppObj.icon,
      initialFileId: fileId // Pass deep linked file ID
    };
  }

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
          <IOSGrid apps={mobileApps} onAppClick={handleOpenApp} isDark={isDark} toggleTheme={toggleTheme} />
          {currentAppObj && (
            <IOSPanel
              app={{ ...currentAppObj, props: currentAppProps }}
              onClose={handleCloseApp}
            />
          )}
        </>
      ) : (
        // macOS-style desktop view
        <>
          <MenuBar isDark={isDark} toggleTheme={toggleTheme} />
          <DesktopIcons apps={desktopIconApps} onAppClick={handleOpenApp} />
          <Dock apps={defaultApps} onAppClick={handleOpenApp} />
          {currentAppObj && (
            <MacWindow
              app={{ ...currentAppObj, props: currentAppProps }}
              onClose={handleCloseApp}
            />
          )}
        </>
      )}
    </div>
  );
}

function App() {
  const { isAdmin } = useAuth();

  // If user is admin (unlocked via auth), they are redirected to / by the LockScreen logic or manual navigation
  // If user is guest (default), they are on /

  return (
    <Routes>
      <Route path="/auth" element={isAdmin ? <Navigate to="/" /> : <LockScreen />} />
      <Route path="/" element={<DesktopView />} />
    </Routes>
  );
}

export default App;
