module.exports = {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8080', // Ваш Go-бекенд
    tokenCookieName: 'auth_token',
    tokenExpiry: 24 * 60 * 60 * 1000 // 24 часа
};