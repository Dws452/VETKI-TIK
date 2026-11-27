const User = require('../models/user');
module.exports = async function attachUser(req, res, next) {
  res.locals.currentUser = null;
  if (!req.session.userId || !req.app.locals.dbReady) return next();
  try {
    const user = await User.findById(req.session.userId).select('username role').lean();
    if (user) res.locals.currentUser = { id: user._id.toString(), username: user.username, role: user.role };
    next();
  } catch (error) { next(error); }
};
