const User = require('../models/user');

async function register({ username, email, password }, dbReady) {
  if (!dbReady) throw Object.assign(new Error('Для регистрации запусти MongoDB.'), { status: 503 });
  if (!username || !email || !password) throw new Error('Заполни все обязательные поля.');
  if (password.length < 8) throw new Error('Пароль должен содержать минимум 8 символов.');
  const exists = await User.findOne({ $or: [{ username }, { email }] });
  if (exists) throw Object.assign(new Error('Такой логин или email уже занят.'), { status: 409 });
  const user = new User({ username, email });
  await user.setPassword(password);
  return user.save();
}

async function login({ username, password }, dbReady) {
  if (!dbReady) throw Object.assign(new Error('Для входа запусти MongoDB.'), { status: 503 });
  if (!username || !password) throw new Error('Введи логин и пароль.');
  const user = await User.findOne({ username });
  if (!user || !(await user.checkPassword(password))) throw Object.assign(new Error('Неверный логин или пароль.'), { status: 401 });
  return user;
}

module.exports = { register, login };
