import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GITHUB_API_URL = 'https://api.github.com';
const username = process.env.GITHUB_USERNAME || 'neovicon';
const token = process.env.GITHUB_TOKEN;

const axiosConfig = token ? {
    headers: {
        Authorization: `token ${token}`
    }
} : {};

// Get GitHub profile
export const getProfile = async (req, res) => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/users/${username}`, axiosConfig);
        res.json(response.data);
    } catch (error) {
        console.error('GitHub Profile Error:', error.response?.data || error.message);
        
        // Fallback to unauthenticated if token is invalid
        if (error.response?.status === 401 && token) {
            console.warn('GitHub token invalid, falling back to unauthenticated request');
            try {
                const fallbackResponse = await axios.get(`${GITHUB_API_URL}/users/${username}`);
                return res.json(fallbackResponse.data);
            } catch (fallbackError) {
                return res.status(fallbackError.response?.status || 500).json({
                    error: 'Failed to fetch GitHub profile (fallback)',
                    message: fallbackError.message
                });
            }
        }

        res.status(error.response?.status || 500).json({
            error: 'Failed to fetch GitHub profile',
            message: error.message
        });
    }
};

// Get GitHub repositories
export const getRepos = async (req, res) => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos?sort=updated&per_page=100`, axiosConfig);
        res.json(response.data);
    } catch (error) {
        console.error('GitHub Repos Error:', error.response?.data || error.message);
        
        // Fallback to unauthenticated if token is invalid
        if (error.response?.status === 401 && token) {
            console.warn('GitHub token invalid, falling back to unauthenticated request');
            try {
                const fallbackResponse = await axios.get(`${GITHUB_API_URL}/users/${username}/repos?sort=updated&per_page=100`);
                return res.json(fallbackResponse.data);
            } catch (fallbackError) {
                return res.status(fallbackError.response?.status || 500).json({
                    error: 'Failed to fetch GitHub repositories (fallback)',
                    message: fallbackError.message
                });
            }
        }

        res.status(error.response?.status || 500).json({
            error: 'Failed to fetch GitHub repositories',
            message: error.message
        });
    }
};
