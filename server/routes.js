const express = require('express');
const { showLogin, login, reister, showReg } = require('./controllers/authController');
const { showHome } = require('./controllers/homeController');

const router = express.Router();

router.get('/login', showLogin);
router.post('/login', login);

router.get('/register', showReg);
router.post('/register',reister);

router.get('/', showHome);

module.exports = router;