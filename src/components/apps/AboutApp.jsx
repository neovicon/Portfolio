import '../../styles/Apps.css';

const AboutApp = ({ aboutData = {}, isAdmin = false }) => {
    const data = {
        name: aboutData.name || 'Your Name',
        title: aboutData.title || 'Full Stack Developer',
        description: aboutData.description || 'Passionate developer...',
        avatar: aboutData.avatar || '👨‍💻'
    };

    return (
        <div className="app-container">
            {isAdmin && (
                <button className="edit-btn" onClick={() => alert('Open Settings → About tab to edit')}>
                    ✏️ Edit
                </button>
            )}
            <div className="about-card">
                <div className="about-avatar">
                    <span className="avatar-emoji">{data.avatar}</span>
                </div>
                <h2 className="about-name">{data.name}</h2>
                <p className="about-title">{data.title}</p>
                <p className="about-description">
                    {data.description}
                </p>
                <div className="about-stats">
                    <div className="stat">
                        <span className="stat-value">5+</span>
                        <span className="stat-label">Years Experience</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">50+</span>
                        <span className="stat-label">Projects</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">100%</span>
                        <span className="stat-label">Dedication</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutApp;
