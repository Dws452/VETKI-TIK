const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

module.exports = function createSession() {
  const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tik_kernel';
  const memoryStore = new session.MemoryStore();
  const mongoStore = MongoStore.create({
    mongoUrl,
    collectionName: 'sessions',
    ttl: 60 * 60 * 4,
    autoRemove: 'native'
  });

  // Пока MongoDB недоступна, сессии временно живут в памяти.
  // После подключения запросы автоматически переходят на MongoStore.
  class HybridStore extends session.Store {
    activeStore() { return mongoose.connection.readyState === 1 ? mongoStore : memoryStore; }
    get(sid, callback) { return this.activeStore().get(sid, callback); }
    set(sid, value, callback) { return this.activeStore().set(sid, value, callback); }
    destroy(sid, callback) { return this.activeStore().destroy(sid, callback); }
    touch(sid, value, callback) { return this.activeStore().touch(sid, value, callback); }
  }

  return session({
    name: 'tik.sid',
    secret: process.env.SESSION_SECRET || 'tik-local-study-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 4 },
    store: new HybridStore()
  });
};
