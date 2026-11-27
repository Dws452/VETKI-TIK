const mongoose = require('mongoose');
const threatSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 140 },
  category: { type: String, required: true, enum: ['Phishing', 'Malware', 'Reconnaissance', 'Command and Control', 'Data breach', 'Other'] },
  severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  status: { type: String, enum: ['New', 'Investigating', 'Monitoring', 'Contained', 'Closed'], default: 'New' },
  source: { type: String, default: 'Manual report' },
  description: { type: String, required: true, maxlength: 2000 },
  tags: [{ type: String, trim: true }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
threatSchema.index({ title: 'text', description: 'text', tags: 'text' });
module.exports = mongoose.model('Threat', threatSchema);
