require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createSession = require('./config/session');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const indexRouter = require('./routes/index');
const threatRouter = require('./routes/threats');
const iocRouter = require('./routes/iocs');
const reportRouter = require('./routes/reports');
const authRouter = require('./routes/auth');
const logoutRouter = require('./routes/logout');
const { attachLocals } = require('./middlewares/attachLocals');
const visitCounter = require('./middlewares/visitCounter');
const createMenu = require('./middlewares/createMenu');
const attachUser = require('./middlewares/attachUser');

const app = express();
const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tik_kernel';
app.locals.dbReady = false;

mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 2500 })
  .then(() => { app.locals.dbReady = true; console.log('MongoDB подключена'); })
  .catch((error) => console.warn('MongoDB недоступна — включён демонстрационный режим:', error.message));

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(createSession());
app.use(visitCounter);
app.use(createMenu);
app.use(attachLocals);
app.use(attachUser);

app.use('/', indexRouter);
app.use('/threats', threatRouter);
app.use('/iocs', iocRouter);
app.use('/reports', reportRouter);
app.use('/', authRouter);
app.use('/logout', logoutRouter);

app.use((req, res, next) => next(createError(404, 'Страница не найдена')));
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', { title: 'Ошибка', message: err.message, status: err.status || 500 });
});

module.exports = app;
