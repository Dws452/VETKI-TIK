module.exports = function checkAuth(req, res, next) {
  if (!req.session.userId) return res.redirect('/login');
  next();
};
