const session = require('express-session');
module.exports = function createSession() {
  return session({
    name: 'tik.sid',
    secret: process.env.SESSION_SECRET || 'tik-local-study-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 4 }
  });
};
