module.exports = function createMenu(req, res, next) {
  res.locals.navItems = [
    { label: 'Обзор', href: '/', icon: '◫' },
    { label: 'База угроз', href: '/threats', icon: '⌁' },
    { label: 'Индикаторы IOC', href: '/iocs', icon: '◎' },
    { label: 'Аналитика', href: '/reports', icon: '▥' }
  ];
  next();
};
