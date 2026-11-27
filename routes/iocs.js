const express = require('express');
const router = express.Router();
const IOC = require('../models/ioc');
const checkAuth = require('../middlewares/checkAuth');
const sampleIocs = require('../data/iocs');
router.get('/', async (req, res, next) => {
  try {
    const q = req.query.q || '';
    let iocs = req.app.locals.dbReady ? await IOC.find(q ? { value: new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') } : {}).sort({ createdAt: -1 }).lean() : sampleIocs.filter(x => x.value.toLowerCase().includes(q.toLowerCase()));
    res.render('iocs', { title: 'Индикаторы компрометации', iocs, q });
  } catch (error) { next(error); }
});
router.post('/', checkAuth, async (req, res, next) => {
  try {
    if (!req.app.locals.dbReady) return res.status(503).send('Для сохранения IOC запусти MongoDB.');
    await IOC.create({ ...req.body, confidence: Number(req.body.confidence) }); res.redirect('/iocs');
  } catch (error) { next(error); }
});
module.exports = router;
