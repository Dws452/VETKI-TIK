module.exports = [
  { value: '185.199.110.42', type: 'IPv4', confidence: 92, source: 'Abuse feed', threat: 'Фишинговая кампания', status: 'Blocked' },
  { value: 'secure-auth-check.example', type: 'Domain', confidence: 87, source: 'DNS monitor', threat: 'Поддельная форма входа', status: 'Investigating' },
  { value: 'hxxps://cdn-update.example/payload', type: 'URL', confidence: 95, source: 'Sandbox', threat: 'Загрузчик вредоносного ПО', status: 'Blocked' },
  { value: '44d88612fea8a8f36de82e1278abb02f', type: 'MD5', confidence: 99, source: 'Malware sample', threat: 'Тестовый образец', status: 'Confirmed' },
  { value: '91.214.124.18', type: 'IPv4', confidence: 74, source: 'Firewall', threat: 'Сканирование периметра', status: 'Monitoring' }
];
