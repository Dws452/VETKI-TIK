require('dotenv').config();
const mongoose = require('mongoose');
const Threat = require('../models/threat');
const IOC = require('../models/ioc');
const threats = require('../data/threats');
const iocs = require('../data/iocs');
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tik_kernel');
    await Threat.deleteMany({}); await IOC.deleteMany({});
    await Threat.insertMany(threats); await IOC.insertMany(iocs);
    console.log(`Добавлено угроз: ${threats.length}; IOC: ${iocs.length}`);
  } catch (error) { console.error('Ошибка заполнения базы:', error.message); process.exitCode = 1; }
  finally { await mongoose.disconnect(); }
})();
