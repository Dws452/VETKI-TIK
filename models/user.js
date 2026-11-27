const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 32 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['Analyst', 'Admin'], default: 'Analyst' }
}, { timestamps: true });
userSchema.methods.setPassword = async function(password) { this.passwordHash = await bcrypt.hash(password, 12); };
userSchema.methods.checkPassword = function(password) { return bcrypt.compare(password, this.passwordHash); };
module.exports = mongoose.model('User', userSchema);
