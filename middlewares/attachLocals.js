const Threat = require('../models/threat');
const sampleThreats = require('../data/threats');
module.exports.attachLocals = async function(req, res, next) {
  res.locals.currentUser = req.session.user || null;
  res.locals.currentPath = req.path;
  res.locals.visitCount = req.visitCount || 1;
  res.locals.dbReady = req.app.locals.dbReady;
  try {
    const total = req.app.locals.dbReady ? await Threat.countDocuments() : sampleThreats.length;
    res.locals.threatTotal = total;
  } catch { res.locals.threatTotal = sampleThreats.length; }
  next();
};
