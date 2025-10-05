import axios from 'axios';
import config from './app';

const apiClient = axios.create({
    baseURL: config.api.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = error.response?.data?.message || 'Network Error';
        const errorCode = error.response?.status || 500;

        return Promise.reject({
            message: errorMessage,
            code: errorCode,
        });
    }
);

export default apiClient;