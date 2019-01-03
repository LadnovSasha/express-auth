require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { userRoutes } = require('./routes');
const { errorMiddleware } = require('./middlewares');

const app = express();

app.use(session({
  secret: process.env.SECRET,
  maxAge: 3600000,
  resave: false,
  saveUninitialized: false,
}));

app.use('/user', userRoutes);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))
