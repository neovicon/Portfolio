import React, { useState, useEffect } from 'react';
import { getVisitorCount, getGithubProfile, getGithubRepos } from '../services/api';
import '../styles/VisitorWidget.css';

const VisitorWidget = () => {
    const [visitorCount, setVisitorCount] = useState(0);
    const [githubProfile, setGithubProfile] = useState(null);
    const [githubRepos, setGithubRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [visitsRes, profileRes, reposRes] = await Promise.all([
                    getVisitorCount(),
                    getGithubProfile(),
                    getGithubRepos()
                ]);

                setVisitorCount(visitsRes.totalVisits);
                setGithubProfile(profileRes);
                setGithubRepos(reposRes.slice(0, 3)); // Show top 3 repos
            } catch (error) {
                console.error('Error fetching widget data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="visitor-widget-loading">Loading...</div>;
    }

    return (
        <div className="visitor-widget-container">
            {/* Visitor Count Card */}
            <div className="widget-card visitor-card">
                <div className="icon-container">
                    <span className="widget-icon">👥</span>
                </div>
                <div className="widget-content">
                    <h3>Total Visits</h3>
                    <p className="count-number">{visitorCount.toLocaleString()}</p>
                </div>
            </div>

            {/* GitHub Profile Card */}
            {githubProfile && (
                <div className="widget-card github-card">
                    <div className="github-header">
                        <img src={githubProfile.avatarUrl} alt="GitHub Avatar" className="github-avatar" />
                        <div className="github-info">
                            <h3>@{githubProfile.username}</h3>
                            <div className="github-stats">
                                <span>⭐ {githubProfile.publicRepos} Repos</span>
                                <span>👥 {githubProfile.followers} Followers</span>
                            </div>
                        </div>
                    </div>
                    <a href={githubProfile.profileUrl} target="_blank" rel="noopener noreferrer" className="github-link">
                        View Profile
                    </a>
                </div>
            )}

            {/* Top Repos List */}
            <div className="widget-card repos-card">
                <h3>Top Repositories</h3>
                <div className="repos-list">
                    {githubRepos.map(repo => (
                        <a key={repo.name} href={repo.repoUrl} target="_blank" rel="noopener noreferrer" className="repo-item">
                            <div className="repo-name">
                                <span>📚</span> {repo.name}
                            </div>
                            <div className="repo-stars">
                                ⭐ {repo.stars}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VisitorWidget;
