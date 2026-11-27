const mongoose = require('mongoose');
const iocSchema = new mongoose.Schema({
  value: { type: String, required: true, unique: true, trim: true },
  type: { type: String, enum: ['IPv4', 'Domain', 'URL', 'MD5', 'SHA1', 'SHA256'], required: true },
  confidence: { type: Number, min: 0, max: 100, default: 50 },
  source: { type: String, default: 'Manual report' },
  threat: { type: String, default: 'Не привязана' },
  status: { type: String, enum: ['New', 'Investigating', 'Monitoring', 'Blocked', 'Confirmed'], default: 'New' }
}, { timestamps: true });
module.exports = mongoose.model('IOC', iocSchema);
