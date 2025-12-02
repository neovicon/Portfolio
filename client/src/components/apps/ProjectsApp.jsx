import { useState, useEffect } from 'react';
import { getProjects } from '../../services/api';
import AppModal from './AppModal';
import '../../styles/Apps.css';

const ProjectsApp = ({ isAdmin = false }) => {
    const [projects, setProjects] = useState([]);
    const [customApps, setCustomApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingApp, setEditingApp] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (err) {
                setError('Failed to load projects. Please try again later.');
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();

        // Load custom apps from localStorage
        const savedApps = localStorage.getItem('customApps');
        if (savedApps) {
            setCustomApps(JSON.parse(savedApps));
        }
    }, []);

    const handleAddApp = () => {
        setEditingApp(null);
        setShowModal(true);
    };

    const handleEditApp = (app, index) => {
        setEditingApp({ ...app, index });
        setShowModal(true);
    };

    const handleSaveApp = (appData) => {
        let updatedApps;

        if (editingApp && editingApp.index !== undefined) {
            // Edit existing app
            updatedApps = [...customApps];
            updatedApps[editingApp.index] = appData;
        } else {
            // Add new app
            updatedApps = [...customApps, appData];
        }

        setCustomApps(updatedApps);
        localStorage.setItem('customApps', JSON.stringify(updatedApps));
        setShowModal(false);
        setEditingApp(null);
    };

    const handleDeleteApp = (index) => {
        if (window.confirm('Are you sure you want to delete this app?')) {
            const updatedApps = customApps.filter((_, i) => i !== index);
            setCustomApps(updatedApps);
            localStorage.setItem('customApps', JSON.stringify(updatedApps));
        }
    };

    const handleAppClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    if (loading) {
        return (
            <div className="app-container">
                <div className="loading">Loading apps...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app-container">
                <div className="error">{error}</div>
            </div>
        );
    }

    console.log('ProjectsApp - Projects:', projects.length, 'Custom Apps:', customApps.length, 'isAdmin:', isAdmin);

    return (
        <div className="app-container">
            {isAdmin && (
                <button
                    className="edit-btn"
                    onClick={handleAddApp}
                    style={{ background: isAdmin ? 'var(--accent)' : '#ff5f57' }}
                >
                    {isAdmin ? '➕ Add App (Admin)' : '➕ Add App (Guest - Debug)'}
                </button>
            )}
            <div className="app-launcher-grid">
                {/* Custom Apps */}
                {customApps.map((app, index) => (
                    <div key={`custom-${index}`} className="app-launcher-item">
                        <button
                            className="app-launcher-btn"
                            onClick={() => handleAppClick(app.url)}
                        >
                            <div className="app-launcher-logo">
                                <img src={app.logo} alt={app.name} />
                            </div>
                            <span className="app-launcher-name">{app.name}</span>
                        </button>
                        {isAdmin && (
                            <div className="app-launcher-actions">
                                <button
                                    className="app-action-btn edit"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditApp(app, index);
                                    }}
                                    title="Edit"
                                >
                                    ✏️
                                </button>
                                <button
                                    className="app-action-btn delete"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteApp(index);
                                    }}
                                    title="Delete"
                                >
                                    🗑️
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                {/* Default Project Apps */}
                {projects.map(project => (
                    <div key={project._id} className="app-launcher-item">
                        <button
                            className="app-launcher-btn"
                            onClick={() => handleAppClick(project.link)}
                        >
                            <div className="app-launcher-logo">
                                {project.image ? (
                                    <img src={project.image} alt={project.title} />
                                ) : (
                                    <div className="app-launcher-placeholder">
                                        {project.title.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <span className="app-launcher-name">{project.title}</span>
                        </button>
                    </div>
                ))}

                {/* Empty State */}
                {customApps.length === 0 && projects.length === 0 && (
                    <div className="empty-state">
                        <p>No apps available yet.</p>
                        {isAdmin && <p>Click "➕ Add App" to create your first app!</p>}
                    </div>
                )}
            </div>

            <AppModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditingApp(null);
                }}
                onSave={handleSaveApp}
                appData={editingApp}
            />
        </div>
    );
};

export default ProjectsApp;
