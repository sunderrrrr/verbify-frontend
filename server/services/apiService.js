const fetch = require('node-fetch');
const config = require('../config/config');

class ApiService {
    constructor(baseUrl = config.apiBaseUrl) {
        this.baseUrl = baseUrl;
    }

    async post(endpoint, data, token = null) {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        return response.json();
    }

    async get(endpoint, token = null) {
        const headers = {};

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'GET',
            headers
        });

        return response.json();
    }
}

module.exports = new ApiService();