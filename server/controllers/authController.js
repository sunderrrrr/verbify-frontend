const ApiService = require('../services/apiService');
const config = require('../config/config');

const authController = {
    showLogin: (req, res) => {
        res.render('login', { title: 'Login' });
    },
    showReg: (req, res) => {
        res.render('register', { title: 'register' });
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const response = await ApiService.post('/api/v1/auth/login', { email, password });

            if (response.token) {
                res.cookie(config.tokenCookieName, response.token, {
                    maxAge: config.tokenExpiry,
                    httpOnly: true
                });
                return res.redirect('/');
            }

            res.render('login', { error: response.message || 'Login failed' });
        } catch (error) {
            res.render('login', { error: 'An error occurred during login' });
        }
    },
    reister: async (req, res) => {
        try {
            const { email, password } = req.body;
            const response = await ApiService.post('/api/v1/auth/sign-up', { email, password });

            if (response.token) {
                res.cookie(config.tokenCookieName, response.token, {
                    maxAge: config.tokenExpiry,
                    httpOnly: true
                });
                return res.redirect('/');
            }

            res.render('reister', { error: response.message || 'register failed' });
        } catch (error) {
            res.render('reister', { error: 'An error occurred during register' });
        }
    }
};

module.exports = authController;