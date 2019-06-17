require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userController = require('./controllers/user');
const statusController = require('./controllers/status');
const { authMiddleware } = require('./middlewares');

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/form';
mongoose.connect(mongoURL, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('db connected');
});

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userController);

app.use(authMiddleware);
app.use('/status', statusController);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

module.exports = app;
