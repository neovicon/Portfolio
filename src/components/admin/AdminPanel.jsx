import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import SettingsPanel from './SettingsPanel';
import '../../styles/AdminPanel.css';

const AdminPanel = ({ currentWallpaper, onWallpaperChange, aboutData, onAboutChange }) => {
    const { isAdmin, lock } = useAuth();
    const [showSettings, setShowSettings] = useState(false);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            lock();
        }
    };

    // Show settings button for everyone, but different features based on role
    return (
        <>
            {isAdmin && (
                <div className="admin-panel">
                    <div className="admin-toolbar glass">
                        <div className="admin-badge">
                            🔐 Admin Mode
                        </div>
                        <div className="admin-actions">
                            <button
                                className="admin-btn"
                                onClick={() => setShowSettings(true)}
                                title="Settings"
                            >
                                ⚙️
                            </button>
                            <button className="admin-btn logout-btn" onClick={handleLogout} title="Logout & Lock">
                                🚪
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!isAdmin && (
                <div className="guest-settings-btn">
                    <button
                        className="settings-fab glass"
                        onClick={() => setShowSettings(true)}
                        title="Customize Wallpaper"
                    >
                        🎨
                    </button>
                </div>
            )}

            <SettingsPanel
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
                currentWallpaper={currentWallpaper}
                onWallpaperChange={onWallpaperChange}
                aboutData={aboutData}
                onAboutChange={onAboutChange}
                isAdmin={isAdmin}
            />
        </>
    );
};

export default AdminPanel;
