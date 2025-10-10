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
        console.log('🚀 Отправка запроса:', {
            method: request.method?.toUpperCase(),
            url: request.url,
            baseURL: request.baseURL,
            fullUrl: `${request.baseURL}${request.url}`,
            headers: request.headers,
            data: request.data,
            timeout: request.timeout,
        });
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
        console.log('✅ Получен ответ:', {
            status: response.status,
            statusText: response.statusText,
            url: response.config.url,
            data: response.data,
            headers: response.headers,
        });
        return response;
    },
    (error) => {
        const errorMessage = error.response?.data?.message || 'Network Error';
        const errorCode = error.response?.status || 500;

        console.error('❌ Ошибка ответа:', {
            message: errorMessage,
            code: errorCode,
            url: error.config?.url,
            method: error.config?.method?.toUpperCase(),
            responseData: error.response?.data,
            headers: error.response?.headers,
        });

        return Promise.reject({
            message: errorMessage,
            code: errorCode,
        });
    }
);

export default apiClient;