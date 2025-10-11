import axios from 'axios';
import config from './app';

const apiClient = axios.create({
    baseURL: config.api.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Интерцептор для запросов - вывод в консоль при отправке
apiClient.interceptors.request.use(
    (request) => {

        return request;
    },
    (error) => {
        console.error('❌ Ошибка при подготовке запроса:', error);
        return Promise.reject(error);
    }
);

// Интерцептор для ответов
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
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