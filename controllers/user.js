const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
  const { body } = req;
  try {
    const user = await User.create({
      email: body.email,
      password: body.password,
      phoneNumber: body.phoneNumber,
      firstName: body.firstName,
      lastName: body.lastName,
      gender: body.gender,
      countryCode: body.countryCode,
      birthdate: body.birthdate,
      avatar: body.avatar
    });
    res
      .status(200)
      .send({ data: user });
  } catch (errors) {
    res
      .status(400)
      .send({ errors });
  }
});

router.post('/login', async (req, res) => {
  // debugger;
  const { body: { phoneNumber, password } } = req;
  try {
    const user = await User.findOne({ phoneNumber });
    const matchedPassword = await user.comparePassword(password);
    if (!matchedPassword) throw new Error('Wrong Password');
    const token = jwt.sign({ userId: user._id }, 'secret');
    res
      .status(200)
      .send({ token });
  } catch (error) {
    res
      .status(400)
      .send({ message: error.message });
  }
});

module.exports = router;
