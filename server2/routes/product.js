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

//veiw product by username
router.get('/:uname/product', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let username = req.params.uname;
  mongodao.viewByUsername(function (result) {
    res.send(result)
  }, username)
});


//add product by user
router.options('/:username/addproduct', cors())
router.post('/:username/addproduct', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let username = req.body.username;
  let pname = req.body.pname;
  let category = req.body.category;
  let merchantid = req.body.merchantid;
  let price = req.body.price;
  let description = req.body.description;
  
  let productjson = {
    username,
    pname,
    category,
    merchantid,
    price,
    description
  }
  mongodao.addProduct (function (result) {
    res.send(result)
  }, productjson)
});


router.get('/:cat/product', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let category = req.params.cat;
  mongodao.viewByCategory(function (result) {
    res.send(result)
  })
});

module.exports = router;