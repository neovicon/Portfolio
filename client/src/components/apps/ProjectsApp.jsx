import { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../../services/api';
import AppModal from './AppModal';
import '../../styles/Apps.css';

const ProjectsApp = ({ isAdmin = false }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingApp, setEditingApp] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

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

    const handleAddApp = () => {
        setEditingApp(null);
        setShowModal(true);
    };

    const handleEditApp = (app) => {
        setEditingApp(app);
        setShowModal(true);
    };

    const handleSaveApp = async (appData) => {
        try {
            if (editingApp && editingApp._id) {
                // Update existing project
                await updateProject(editingApp._id, {
                    title: appData.name,
                    description: appData.description || 'App',
                    image: appData.logo,
                    link: appData.url
                });
            } else {
                // Create new project
                await createProject({
                    title: appData.name,
                    description: appData.description || 'App',
                    image: appData.logo,
                    link: appData.url
                });
            }

            // Refresh projects list
            await fetchProjects();
            setShowModal(false);
            setEditingApp(null);
        } catch (error) {
            console.error('Error saving app:', error);
            alert('Failed to save app. Please try again.');
        }
    };

    const handleDeleteApp = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this app?')) {
            try {
                await deleteProject(projectId);
                await fetchProjects();
            } catch (error) {
                console.error('Error deleting app:', error);
                alert('Failed to delete app. Please try again.');
            }
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

    // Convert project data to app format for modal
    const appDataForModal = editingApp ? {
        name: editingApp.title,
        logo: editingApp.image,
        url: editingApp.link,
        description: editingApp.description
    } : null;

    return (
        <div className="app-container">
            {isAdmin && (
                <button
                    className="edit-btn"
                    onClick={handleAddApp}
                >
                    ➕ Add App
                </button>
            )}
            <div className="app-launcher-grid">
                {/* All Projects/Apps */}
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
                        {isAdmin && (
                            <div className="app-launcher-actions">
                                <button
                                    className="app-action-btn edit"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditApp(project);
                                    }}
                                    title="Edit"
                                >
                                    ✏️
                                </button>
                                <button
                                    className="app-action-btn delete"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteApp(project._id);
                                    }}
                                    title="Delete"
                                >
                                    🗑️
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                {/* Empty State */}
                {projects.length === 0 && (
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
                appData={appDataForModal}
            />
        </div>
    );
};

export default ProjectsApp;
