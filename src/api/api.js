import axios from 'axios';
import { getToken } from './utils';

const api = axios.create({
    baseURL: 'https://your-api-endpoint.com', // Замените на ваш API
});

// Добавляем Bearer-токен к каждому запросу
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get('/profile');
    return response.data;
};

export default api;