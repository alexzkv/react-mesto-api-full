require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { regex } = require('./utils/regex');

const { login, createUser, logout } = require('./controllers/users');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      'https://app-mesto.nomorepartiesxyz.ru',
      'http://app-mesto.nomorepartiesxyz.ru',
    ],
    credentials: true,
  }),
);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string()
      .regex(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.get('/logout', logout);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Произошла ошибка на сервере'
      : message,
  });
  next();
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT);

  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на ${PORT} порту`);
}

main();
