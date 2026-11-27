const express = require('express');
const router = express.Router();
const Threat = require('../models/threat');
const checkAuth = require('../middlewares/checkAuth');
const sampleThreats = require('../data/threats');
router.get('/', async (req, res, next) => {
  try {
    const { q = '', severity = '' } = req.query;
    let threats = sampleThreats;
    if (req.app.locals.dbReady) {
      const filter = {};
      if (q) filter.$or = [{ title: new RegExp(escapeRegex(q), 'i') }, { description: new RegExp(escapeRegex(q), 'i') }];
      if (severity) filter.severity = severity;
      threats = await Threat.find(filter).sort({ createdAt: -1 }).lean();
    } else {
      threats = sampleThreats.filter(t => (!q || `${t.title} ${t.description}`.toLowerCase().includes(q.toLowerCase())) && (!severity || t.severity === severity));
    }
    res.render('threats', { title: 'База угроз', threats, filters: { q, severity } });
  } catch (error) { next(error); }
});
router.get('/new', checkAuth, (req, res) => res.render('threat-form', { title: 'Добавить угрозу', error: null, threat: {} }));
router.post('/', checkAuth, async (req, res, next) => {
  try {
    if (!req.app.locals.dbReady) return res.status(503).render('threat-form', { title: 'База недоступна', error: 'Запусти MongoDB, чтобы сохранять записи.', threat: req.body });
    const threat = new Threat({ ...req.body, createdBy: req.session.userId, tags: (req.body.tags || '').split(',').map(x => x.trim()).filter(Boolean) });
    await threat.save(); res.redirect('/threats');
  } catch (error) { next(error); }
});
function escapeRegex(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
module.exports = router;
