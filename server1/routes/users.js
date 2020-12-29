var express = require('express');
var router = express.Router();
var mongodao = require('../mongodb1')
var cors = require('cors')

/* Signup User. */
router.options('/signup', cors())
router.post('/signup', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let username = req.body.username;
  let email = req.body.email;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let gender = req.body.gender;
  let password = req.body.password;

  let userjson = {
    username,
    email,
    fname,
    lname,
    gender,
    password
  }
  mongodao.addUser(function (result) {
    res.send(result)
  }, userjson)
});

//login users
router.options('/login', cors())
router.post('/login', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  console.log('uname', username)
  console.log('pass', password)

  let userjson = {
    username,
    password
  }
  mongodao.loginUser(function (result) {
    res.send(result)
  }, userjson)
});

//get all users
router.get('/users', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {

  mongodao.viewAllUsers(function (result) {
    res.send(result)
  })
});

//get user profile
router.get('/:uname/profile', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let username = req.params.uname;
  mongodao.viewUserProfile(function (result) {
    res.send(result)
  }, username)
});

//add user profile
router.options('/:username/addprofile', cors())
router.post('/:username/addprofile', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let username = req.params.username;
  let phone = parseInt(req.body.phone);
  let company = req.body.company || 'self';
  let address = req.body.address;
  let city = req.body.city;
  let pin = parseFloat(req.body.pin);
  let country = req.body.country || 'india';
  let about = req.body.about;
  let prs = req.body.prs || 'soild';

  let profilejson = {
    username,
    phone,
    company,
    address,
    city,
    pin,
    country,
    about,
    prs
  }
  mongodao.addUserProfile(function (result) {
    res.send(result)
  }, profilejson)
});
module.exports = router;