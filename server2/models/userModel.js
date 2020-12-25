let mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'Username must be unique!'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required!']
  },
  fname: {
    type: String,
    required: [true, 'First Name is required!'],
    trim: true
  },
  lname: {
    type: String,
    required: [true, 'First Name is required!'],
    trim: true
  },
  gender: {
    type: String,
    required: [true, 'Gender is required!'],
    enum: ['male', 'female', 'other']
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, 'Password is required!']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const User = mongoose.model('User', userSchema, 'users')
module.exports = User;