const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email is Taken"],
    required: [true, 'Email is Required']
  },
  phoneNumber: {
    type: String,
    unique: [true, "Phone Number is Used before"],
    validate: {
      validator: function (v) {
        return /^\+?[1-9]\d{1,14}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'Phone Number is Required']
  },
  password: {
    type: String,
    required: [true, 'Password is Required']
  },
  firstName: {
    type: String,
    required: [true, 'First Name is Required']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is Required']
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: 'Please enter valid gender'
    },
  },
  countryCode: {
    type: String,
    // required: [true, 'password is required']
  },
  birthdate: {
    type: String,
    // required: [true, 'password is required']
  },
  avatar: {
    type: String,
    // required: [true, 'password is required']
  },
});

//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {return next()};
  bcrypt.hash(user.password,10).then((hashedPassword) => {
      user.password = hashedPassword;
      next();
  })
}, function (err) {
  next(err)
})
const User = mongoose.model('users', userSchema);

module.exports = User;
