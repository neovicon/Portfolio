import '../../styles/Apps.css';

const SkillsApp = ({ isAdmin = false }) => {
    const skills = {
        'Frontend': ['React', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design'],
        'Backend': ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
        'Tools': ['Git', 'Vite', 'npm', 'VS Code'],
        'Soft Skills': ['Problem Solving', 'Communication', 'Team Collaboration']
    };

    return (
        <div className="app-container">
            {isAdmin && (
                <button className="edit-btn" onClick={() => alert('Skills editor coming soon!')}>
                    ✏️ Edit Skills
                </button>
            )}
            <div className="skills-container">
                {Object.entries(skills).map(([category, items]) => (
                    <div key={category} className="skill-category">
                        <h3 className="skill-category-title">{category}</h3>
                        <div className="skill-items">
                            {items.map((skill, index) => (
                                <div key={index} className="skill-item">
                                    <span className="skill-icon">✓</span>
                                    <span className="skill-name">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsApp;
