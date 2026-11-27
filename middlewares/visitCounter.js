module.exports = function visitCounter(req, res, next) {
  const visits = Number(req.cookies.tik_visits || 0) + 1;
  req.visitCount = visits;
  res.cookie('tik_visits', String(visits), { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true, sameSite: 'lax' });
  next();
};
