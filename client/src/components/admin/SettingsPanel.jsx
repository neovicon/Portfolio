import { useState, useEffect } from 'react';
import { updateAbout, updateWallpaper, getSkills, createSkillCategory, updateSkillCategory, deleteSkillCategory } from '../../services/api';
import '../../styles/SettingsPanel.css';

const SettingsPanel = ({ isOpen, onClose, currentWallpaper, onWallpaperChange, aboutData, onAboutChange, isAdmin = false }) => {
    const [activeTab, setActiveTab] = useState('wallpaper');
    const [customWallpaper, setCustomWallpaper] = useState(null);
    const [editedAbout, setEditedAbout] = useState(aboutData);
    const [skills, setSkills] = useState([]);
    const [editingSkill, setEditingSkill] = useState(null);
    const [newSkillCategory, setNewSkillCategory] = useState({ category: '', items: [] });
    const [newSkillItem, setNewSkillItem] = useState('');

    useEffect(() => {
        if (isOpen && isAdmin) {
            fetchSkills();
        }
    }, [isOpen, isAdmin]);

    const fetchSkills = async () => {
        try {
            const data = await getSkills();
            setSkills(data);
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };

    const handleAddSkillItem = () => {
        if (newSkillItem.trim()) {
            setNewSkillCategory({
                ...newSkillCategory,
                items: [...newSkillCategory.items, newSkillItem.trim()]
            });
            setNewSkillItem('');
        }
    };

    const handleRemoveSkillItem = (index) => {
        setNewSkillCategory({
            ...newSkillCategory,
            items: newSkillCategory.items.filter((_, i) => i !== index)
        });
    };

    const handleSaveSkillCategory = async () => {
        if (!newSkillCategory.category || newSkillCategory.items.length === 0) {
            alert('Please enter a category name and at least one skill.');
            return;
        }

        try {
            if (editingSkill) {
                await updateSkillCategory(editingSkill._id, {
                    ...newSkillCategory,
                    order: editingSkill.order
                });
                alert('Skill category updated! ✓');
            } else {
                await createSkillCategory({
                    ...newSkillCategory,
                    order: skills.length + 1
                });
                alert('Skill category added! ✓');
            }

            setNewSkillCategory({ category: '', items: [] });
            setEditingSkill(null);
            fetchSkills();
        } catch (error) {
            console.error('Error saving skill category:', error);
            alert('Failed to save skill category. Please try again.');
        }
    };

    const handleEditSkillCategory = (skill) => {
        setEditingSkill(skill);
        setNewSkillCategory({
            category: skill.category,
            items: [...skill.items]
        });
    };

    const handleDeleteSkillCategory = async (id) => {
        if (window.confirm('Are you sure you want to delete this skill category?')) {
            try {
                await deleteSkillCategory(id);
                alert('Skill category deleted! ✓');
                fetchSkills();
            } catch (error) {
                console.error('Error deleting skill category:', error);
                alert('Failed to delete skill category. Please try again.');
            }
        }
    };

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

    const handleAboutSave = async () => {
        try {
            await updateAbout(editedAbout);
            onAboutChange(editedAbout);
            alert('About section updated! ✓');
        } catch (error) {
            console.error('Error saving about data:', error);
            alert('Failed to save about data. Please try again.');
        }
    };

    const handleWallpaperSelect = async (wallpaperId) => {
        onWallpaperChange(wallpaperId);

        if (isAdmin) {
            try {
                await updateWallpaper(wallpaperId);
            } catch (error) {
                console.error('Error saving wallpaper:', error);
                alert('Failed to save wallpaper. Please try again.');
            }
        } else {
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
                            <button
                                className={`settings-tab ${activeTab === 'skills' ? 'active' : ''}`}
                                onClick={() => setActiveTab('skills')}
                            >
                                ⚡ Skills
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

                    {activeTab === 'skills' && (
                        <div className="skills-section">
                            <h3>{editingSkill ? 'Edit Skill Category' : 'Add New Skill Category'}</h3>

                            <div className="form-group">
                                <label>Category Name</label>
                                <input
                                    type="text"
                                    value={newSkillCategory.category}
                                    onChange={(e) => setNewSkillCategory({ ...newSkillCategory, category: e.target.value })}
                                    placeholder="e.g., Frontend, Backend, Tools"
                                />
                            </div>

                            <div className="form-group">
                                <label>Skills</label>
                                <div className="skill-input-group">
                                    <input
                                        type="text"
                                        value={newSkillItem}
                                        onChange={(e) => setNewSkillItem(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddSkillItem()}
                                        placeholder="Add a skill and press Enter"
                                    />
                                    <button type="button" className="add-skill-btn" onClick={handleAddSkillItem}>
                                        ➕ Add
                                    </button>
                                </div>
                                <div className="skill-tags">
                                    {newSkillCategory.items.map((item, index) => (
                                        <div key={index} className="skill-tag">
                                            <span>{item}</span>
                                            <button onClick={() => handleRemoveSkillItem(index)}>✕</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="save-btn" onClick={handleSaveSkillCategory}>
                                💾 {editingSkill ? 'Update Category' : 'Add Category'}
                            </button>

                            {editingSkill && (
                                <button
                                    className="cancel-btn"
                                    onClick={() => {
                                        setEditingSkill(null);
                                        setNewSkillCategory({ category: '', items: [] });
                                    }}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Cancel
                                </button>
                            )}

                            <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)' }} />

                            <h3>Existing Categories</h3>
                            <div className="existing-skills">
                                {skills.map((skill) => (
                                    <div key={skill._id} className="skill-category-item">
                                        <div className="skill-category-header">
                                            <h4>{skill.category}</h4>
                                            <div className="skill-category-actions">
                                                <button onClick={() => handleEditSkillCategory(skill)}>✏️</button>
                                                <button onClick={() => handleDeleteSkillCategory(skill._id)}>🗑️</button>
                                            </div>
                                        </div>
                                        <div className="skill-tags">
                                            {skill.items.map((item, index) => (
                                                <div key={index} className="skill-tag readonly">
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;
