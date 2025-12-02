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

// Contact API calls
export const submitContact = async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
};

export default api;
