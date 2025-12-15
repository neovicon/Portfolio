import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GITHUB_API_BASE = 'https://api.github.com';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Simple in-memory cache
const cache = {
    profile: {
        data: null,
        timestamp: 0
    },
    repos: {
        data: null,
        timestamp: 0
    }
};

const getHeaders = () => {
    const headers = {
        'Accept': 'application/vnd.github.v3+json'
    };
    if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }
    return headers;
};

export const getProfile = async (req, res) => {
    try {
        const now = Date.now();
        if (cache.profile.data && (now - cache.profile.timestamp < CACHE_DURATION)) {
            return res.json(cache.profile.data);
        }

        const username = process.env.GITHUB_USERNAME;
        if (!username) {
            return res.status(500).json({ error: 'GitHub username not configured' });
        }

        const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`, {
            headers: getHeaders()
        });

        const { login, followers, public_repos, avatar_url, html_url } = response.data;

        const profileData = {
            username: login,
            followers,
            publicRepos: public_repos,
            avatarUrl: avatar_url,
            profileUrl: html_url
        };

        cache.profile = {
            data: profileData,
            timestamp: now
        };

        res.json(profileData);
    } catch (error) {
        console.error('Error fetching GitHub profile:', error.message);
        res.status(500).json({ error: 'Failed to fetch GitHub profile' });
    }
};

export const getRepos = async (req, res) => {
    try {
        const now = Date.now();
        if (cache.repos.data && (now - cache.repos.timestamp < CACHE_DURATION)) {
            return res.json(cache.repos.data);
        }

        const username = process.env.GITHUB_USERNAME;
        if (!username) {
            return res.status(500).json({ error: 'GitHub username not configured' });
        }

        const response = await axios.get(`${GITHUB_API_BASE}/users/${username}/repos`, {
            headers: getHeaders(),
            params: {
                sort: 'updated', // Fetch recently updated first, we will sort by stars manually or trust API
                per_page: 100
            }
        });

        // Filter and map
        const repos = response.data
            .filter(repo => !repo.fork) // Optional: filter out forks if desired, but requirement says "Fetch public repositories"
            .map(repo => ({
                name: repo.name,
                description: repo.description,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                language: repo.language,
                repoUrl: repo.html_url
            }))
            .sort((a, b) => b.stars - a.stars); // Sort by stars descending

        cache.repos = {
            data: repos,
            timestamp: now
        };

        res.json(repos);
    } catch (error) {
        console.error('Error fetching GitHub repos:', error.message);
        res.status(500).json({ error: 'Failed to fetch GitHub repositories' });
    }
};
