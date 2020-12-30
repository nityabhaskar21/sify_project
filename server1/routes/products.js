var express = require('express');
var router = express.Router();
var mongodao = require('../mongodb2')
var cors = require('cors')

//get products or view all products in marketplace
router.get('/viewall', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  mongodao.viewAllProduct(function (result) {
    res.send(result)
  })
});


//view products by category in the marketplace
router.get('/viewcat/:category', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let category = req.params.category;
  mongodao.viewProductByCategory(function (result) {
    res.send(result)
  }, category)
});


//view product by merchant username
//i.e. show the products sold by a merchant

router.get('/viewproductbymerchantid/:uid', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let merchantid = req.params.uid;
  console.log(merchantid)
  mongodao.viewproductbymerchantid(function (result) {
   console.log(result)
    res.send(result)
  },merchantid)
});



//add or sell product for a merchant
//i.e. add product for a merchant username
router.options('/:username/merchaddproduct', cors())
router.post('/:username/merchaddproduct', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let username = req.params.username;
  let pname = req.body.pname;
  let category = req.body.category;
  let price = req.body.price;
  let description = req.body.description;

  let productjson = {
    username,
    pname,
    category,
    price,
    description
  }
  mongodao.addProduct(function (result) {
    res.send(result)
  }, productjson)
});















module.exports = router;