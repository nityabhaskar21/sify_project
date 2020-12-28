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
  let productid = req.body.productid;
  let merchantid = req.body.merchantid;
  let buyerid = req.body.buyerid;
  let review = req.body.review;
  let orderstatus = req.body.orderstatus;
  let iscancelled = req.body.iscancelled;
  let rating = req.body.rating;
  
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