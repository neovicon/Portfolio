import { useState } from 'react';
import '../../styles/SettingsPanel.css';

const SettingsPanel = ({ isOpen, onClose, currentWallpaper, onWallpaperChange, aboutData, onAboutChange, isAdmin = false }) => {
    const [activeTab, setActiveTab] = useState('wallpaper');
    const [customWallpaper, setCustomWallpaper] = useState(null);
    const [editedAbout, setEditedAbout] = useState(aboutData);

    if (!isOpen) return null;

    const wallpapers = [
        { id: 'gradient-1', name: 'Purple Dream', preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { id: 'gradient-2', name: 'Pink Sunset', preview: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
        { id: 'gradient-3', name: 'Ocean Blue', preview: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
        { id: 'gradient-4', name: 'Mint Fresh', preview: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
        { id: 'gradient-5', name: 'Warm Glow', preview: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
        { id: 'dark', name: 'Deep Space', preview: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' },
        { id: 'macos-light', name: 'macOS Light', preview: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' },
        { id: 'macos-dark', name: 'macOS Dark', preview: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' },
    ];

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;
                setCustomWallpaper(imageUrl);
                onWallpaperChange(`url(${imageUrl})`);

                if (!isAdmin) {
                    alert('✓ Wallpaper changed temporarily for your session only!');
                } else {
                    alert('✓ Wallpaper changed for all visitors!');
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAboutSave = () => {
        onAboutChange(editedAbout);
        alert('About section updated! ✓');
    };

    const handleWallpaperSelect = (wallpaperId) => {
        onWallpaperChange(wallpaperId);
        if (!isAdmin) {
            alert('✓ Wallpaper changed temporarily for your session!');
        }
    };

    return (
        <div className="settings-overlay" onClick={onClose}>
            <div className="settings-panel glass" onClick={(e) => e.stopPropagation()}>
                <div className="settings-header">
                    <h2>{isAdmin ? 'Admin Settings' : 'Customize Wallpaper'}</h2>
                    <button className="settings-close" onClick={onClose}>✕</button>
                </div>

                <div className="settings-tabs">
                    <button
                        className={`settings-tab ${activeTab === 'wallpaper' ? 'active' : ''}`}
                        onClick={() => setActiveTab('wallpaper')}
                    >
                        🖼️ Wallpaper
                    </button>
                    {isAdmin && (
                        <>
                            <button
                                className={`settings-tab ${activeTab === 'about' ? 'active' : ''}`}
                                onClick={() => setActiveTab('about')}
                            >
                                👤 About
                            </button>
                            <button
                                className={`settings-tab ${activeTab === 'appearance' ? 'active' : ''}`}
                                onClick={() => setActiveTab('appearance')}
                            >
                                🎨 Appearance
                            </button>
                        </>
                    )}
                </div>

                <div className="settings-content">
                    {activeTab === 'wallpaper' && (
                        <div className="wallpaper-section">
                            <h3>Choose Wallpaper</h3>

                            <div className="upload-section">
                                <label className="upload-btn">
                                    📤 Upload Custom Wallpaper
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                                {customWallpaper && (
                                    <p className="upload-hint">✓ Custom wallpaper uploaded!</p>
                                )}
                            </div>

                            <div className="wallpaper-grid">
                                {wallpapers.map(wallpaper => (
                                    <button
                                        key={wallpaper.id}
                                        className={`wallpaper-option ${currentWallpaper === wallpaper.id ? 'active' : ''}`}
                                        onClick={() => handleWallpaperSelect(wallpaper.id)}
                                    >
                                        <div
                                            className="wallpaper-preview"
                                            style={{ background: wallpaper.preview }}
                                        />
                                        <span className="wallpaper-name">{wallpaper.name}</span>
                                        {currentWallpaper === wallpaper.id && (
                                            <span className="wallpaper-check">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div className="about-section">
                            <h3>Edit About Section</h3>

                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={editedAbout.name}
                                    onChange={(e) => setEditedAbout({ ...editedAbout, name: e.target.value })}
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={editedAbout.title}
                                    onChange={(e) => setEditedAbout({ ...editedAbout, title: e.target.value })}
                                    placeholder="Full Stack Developer"
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={editedAbout.description}
                                    onChange={(e) => setEditedAbout({ ...editedAbout, description: e.target.value })}
                                    placeholder="Tell us about yourself..."
                                    rows="4"
                                />
                            </div>

                            <div className="form-group">
                                <label>Avatar Emoji</label>
                                <input
                                    type="text"
                                    value={editedAbout.avatar}
                                    onChange={(e) => setEditedAbout({ ...editedAbout, avatar: e.target.value })}
                                    placeholder="👨‍💻"
                                    maxLength="2"
                                />
                            </div>

                            <button className="save-btn" onClick={handleAboutSave}>
                                💾 Save Changes
                            </button>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="appearance-section">
                            <h3>Appearance Settings</h3>

                            <div className="form-group">
                                <label>Primary Accent Color</label>
                                <div className="color-picker-group">
                                    <input
                                        type="color"
                                        defaultValue="#667eea"
                                        onChange={(e) => {
                                            document.documentElement.style.setProperty('--accent', e.target.value);
                                        }}
                                    />
                                    <span className="color-hint">Used for buttons and highlights</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Font Size</label>
                                <select
                                    defaultValue="16"
                                    onChange={(e) => {
                                        document.documentElement.style.fontSize = e.target.value + 'px';
                                    }}
                                >
                                    <option value="14">Small</option>
                                    <option value="16">Medium (Default)</option>
                                    <option value="18">Large</option>
                                    <option value="20">Extra Large</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Border Radius</label>
                                <select
                                    defaultValue="12"
                                    onChange={(e) => {
                                        document.documentElement.style.setProperty('--radius-md', e.target.value + 'px');
                                        document.documentElement.style.setProperty('--radius-lg', (e.target.value * 1.5) + 'px');
                                    }}
                                >
                                    <option value="4">Sharp</option>
                                    <option value="8">Slightly Rounded</option>
                                    <option value="12">Rounded (Default)</option>
                                    <option value="16">Very Rounded</option>
                                </select>
                            </div>

                            <p className="appearance-note">
                                💡 Changes apply immediately and persist during your session
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;
