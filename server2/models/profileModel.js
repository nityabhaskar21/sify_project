let mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'UserID must be assigned!']
  },
  phone: {
    type: Number
  },
  company: {
    type: String,
    default: 'self'
  },
  address: {
    type: String,
    default: 'address unknown!'
  },
  city: {
    type: String,
    default: 'city unknown!'
  },
  pin: {
    type: Number
  },
  country: {
    type: String,
    default: 'india'
  },
  about: {
    type: String,
    maxLength: 200,
    trim: true
  },
  prs: {
    type: String,
    maxLength: 20,
    trim: true
  }

})

const Profile = mongoose.model('Profile', ProfileSchema, 'profiles')
module.exports = Profile;