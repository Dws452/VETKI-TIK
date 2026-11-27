const express = require('express');
const router = express.Router();
const Threat = require('../models/threat');
const IOC = require('../models/ioc');
const sampleThreats = require('../data/threats');
const sampleIocs = require('../data/iocs');

router.get('/', async (req, res) => {
  let threats = sampleThreats.slice(0, 4), iocs = sampleIocs;
  let threatCount = sampleThreats.length, iocCount = sampleIocs.length;
  if (req.app.locals.dbReady) {
    try {
      threats = await Threat.find().sort({ createdAt: -1 }).limit(4).lean();
      iocs = await IOC.find().sort({ createdAt: -1 }).limit(5).lean();
      threatCount = await Threat.countDocuments(); iocCount = await IOC.countDocuments();
    } catch (error) { console.error('Не удалось получить сводку:', error.message); }
  }
  res.render('index', { title: 'Панель мониторинга', threats, iocs, threatCount, iocCount });
});

module.exports = router;
