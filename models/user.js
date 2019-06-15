const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { mapMongoosErrors, mapMongoUniqueError } = require('../helpers');
const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email is Taken'],
    required: [true, 'Email is Required']
  },
  phoneNumber: {
    type: String,
    unique: [true, 'Phone Number is Used before'],
    validate: {
      validator: v => /^\+?[1-9]\d{1,14}$/.test(v),
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
    }
  },
  countryCode: {
    type: String
    // required: [true, 'password is required']
  },
  birthdate: {
    type: String
    // required: [true, 'password is required']
  },
  avatar: {
    type: String
    // required: [true, 'password is required']
  }
});

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function beforeSaveHook(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    user.password = await bcrypt.hash(user.password, 10);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.post('save', (error, doc, next) => {
  if (!error) next();
  if (error.name === 'MongoError' && error.code === 11000) {
    return next(mapMongoUniqueError(error));
  }

  return next(mapMongoosErrors(error.errors));
});

const User = mongoose.model('users', userSchema);

module.exports = User;
