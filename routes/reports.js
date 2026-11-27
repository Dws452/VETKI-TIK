const express = require('express');
const router = express.Router();
const Threat = require('../models/threat');
const IOC = require('../models/ioc');
const sampleThreats = require('../data/threats');
const sampleIocs = require('../data/iocs');
router.get('/', async (req, res, next) => {
  try {
    const threats = req.app.locals.dbReady ? await Threat.find().lean() : sampleThreats;
    const iocs = req.app.locals.dbReady ? await IOC.find().lean() : sampleIocs;
    const counts = { critical: threats.filter(x => x.severity === 'Critical').length, high: threats.filter(x => x.severity === 'High').length, medium: threats.filter(x => x.severity === 'Medium').length, low: threats.filter(x => x.severity === 'Low').length };
    res.render('reports', { title: 'Аналитика и отчёты', counts, threats, iocs });
  } catch (error) { next(error); }
});
module.exports = router;
