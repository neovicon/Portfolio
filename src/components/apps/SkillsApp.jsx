import { useState, useEffect } from 'react';
import { getSkills } from '../../services/api';
import '../../styles/Apps.css';

const SkillsApp = ({ isAdmin = false }) => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const data = await getSkills();
                setSkills(data);
            } catch (error) {
                console.error('Error fetching skills:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    if (loading) {
        return (
            <div className="app-container">
                <div className="loading">Loading skills...</div>
            </div>
        );
    }

    return (
        <div className="app-container">
            {isAdmin && (
                <button className="edit-btn" onClick={() => alert('Open Settings → Skills tab to edit')}>
                    ✏️ Edit Skills
                </button>
            )}
            <div className="skills-container">
                {skills.map((skillCategory) => (
                    <div key={skillCategory._id} className="skill-category">
                        <h3 className="skill-category-title">{skillCategory.category}</h3>
                        <div className="skill-items">
                            {skillCategory.items.map((skill, index) => (
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
