const ApiService = require('../services/apiService');
const config = require('../config/config');

const homeController = {
    showHome: async (req, res) => {
        try {
            const token = req.cookies[config.tokenCookieName];

            if (!token) {
                return res.redirect('/login');
            }

            const userData = await ApiService.get('/api/v1/user', token);
            res.render('home', {
                title: 'Home',
                user: userData
            });
        } catch (error) {
            res.redirect('/login');
        }
    }
};

module.exports = homeController;