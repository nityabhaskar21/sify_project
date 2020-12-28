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


//add product 
router.options('/:username/addproduct', cors())
router.post('/:username/addproduct', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let username = req.params.username;
  let pname = req.body.pname;
  let category = req.body.category;
  let merchaneid = req.body.merchaneid;
  let price = req.body.price;
  let description = req.body.description;
  
  let productjson = {
    username,
    pname,
    category,
    merchaneid,
    price,
    description
  }
  mongodao.addProduct (function (result) {
    res.send(result)
  }, productjson)
});

module.exports = router;