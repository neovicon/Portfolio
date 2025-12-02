import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Project API calls
export const getProjects = async () => {
    const response = await api.get('/projects');
    return response.data;
};

export const getProjectById = async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
};

export const createProject = async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
};

export const updateProject = async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
};

export const deleteProject = async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
};

// Contact API calls
export const submitContact = async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
};

// About API calls
export const getAbout = async () => {
    const response = await api.get('/about');
    return response.data;
};

export const updateAbout = async (aboutData) => {
    const response = await api.put('/about', aboutData);
    return response.data;
};

// Wallpaper API calls
export const getWallpaper = async () => {
    const response = await api.get('/wallpaper');
    return response.data;
};

export const updateWallpaper = async (wallpaperId) => {
    const response = await api.put('/wallpaper', { wallpaperId });
    return response.data;
};

// Skills API calls
export const getSkills = async () => {
    const response = await api.get('/skills');
    return response.data;
};

export const createSkillCategory = async (skillData) => {
    const response = await api.post('/skills', skillData);
    return response.data;
};

export const updateSkillCategory = async (id, skillData) => {
    const response = await api.put(`/skills/${id}`, skillData);
    return response.data;
};

export const deleteSkillCategory = async (id) => {
    const response = await api.delete(`/skills/${id}`);
    return response.data;
};

export default api;
