var express = require('express');
var router = express.Router();
var mongodao = require('../mongodb')
var cors = require('cors')
/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});


//get orders by ratings
router.get('/viewordersbyrating', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let ratings = req.params.ratings;
  mongodao.viewOrderbyrating(function (result) {
    res.send(result)
  }, ratings)
});

//get orders by username
router.get('/viewordersbyusername', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let username = req.params.uname;
  mongodao.vieworderbyusername(function (result) {
    res.send(result)
  }, username)
});

//add orders for productid
router.options('/addproductid', cors())
router.post('/addproductid', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let productid = req.params.productid;
  let merchantid = req.params.merchantid;
  let buyerid = req.params.buyerid;
  let review = req.params.review;
  let orderstatus = req.params.orderstatus;
  let iscancelled = req.params.iscancelled;
  let rating = req.params.rating;
  
  let productjson = {
    productid,
    merchantid,
    buyerid,
    review,
    orderstatus,
    iscancelled,
    rating
  }
  mongodao.addProductid (function (result) {
    res.send(result)
  }, productjson)
});

module.exports = router;