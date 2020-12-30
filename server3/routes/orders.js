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
router.get('/viewordersbybuyerid/:customerid', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let buyerid = req.params.customerid;
  console.log(buyerid)
  mongodao.vieworderbybuyerid(function (result) {
   console.log(result)
    res.send(result)
  }, buyerid)
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

  let orderjson = {
    productid,
    buyerid,
    review,
    orderstatus,
    iscancelled,
    rating
  }
  console.log('productjson: ', orderjson)
  mongodao.addOrderForProductid(function (result) {
    res.send(result)
  }, orderjson)
});

module.exports = router;