require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/form';
mongoose.connect(mongoURL, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('db connected');
});

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const userController = require('./controllers/user');

app.use('/user', userController);

var port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});