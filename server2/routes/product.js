var express = require('express');
var router = express.Router();
var mongodao = require('../mongodb')
var cors = require('cors')
/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});


//get product
router.get('/viewall', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {

  mongodao.viewAllProduct(function (result) {
    res.send(result)
  })
});

module.exports = router;