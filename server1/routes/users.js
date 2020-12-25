var express = require('express');
var router = express.Router();
var mongodao = require('../mongodb')
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

module.exports = router;