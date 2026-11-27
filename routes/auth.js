const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/login', (req, res) => res.render('auth', { title: 'Вход в систему', error: null, mode: 'login' }));
router.get('/register', (req, res) => res.render('auth', { title: 'Создать аккаунт', error: null, mode: 'register' }));
const authService = require('../services/authService');
router.post('/auth', async (req, res, next) => {
  const { username, email, password, mode } = req.body;
  try {
    const user = mode === 'register'
      ? await authService.register({ username, email, password }, req.app.locals.dbReady)
      : await authService.login({ username, password }, req.app.locals.dbReady);
    req.session.userId = user._id.toString();
    req.session.user = { id: user._id.toString(), username: user.username, role: user.role };
    req.session.save(() => res.redirect('/'));
  } catch (error) {
    const status = error.status || 400;
    res.status(status).render('auth', { title: 'Проверка данных', error: error.message, mode: mode === 'register' ? 'register' : 'login' });
  }
});
module.exports = router;
