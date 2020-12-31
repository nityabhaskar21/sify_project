var express = require('express');
var router = express.Router();
var mongodao = require('../mongodb3')
var cors = require('cors')

var utilitya = require('../utility')

//get orders by ratings
//i.e. get top products
router.get('/viewordersbyrating', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let ratings = req.params.ratings;
  mongodao.viewOrderbyrating(function (result) {
    res.send(result)
  }, ratings)
});


//get orders of an user using his/her username
//i.e. get orders for buyer's username
//i.e. purchased products of an user
//first we have to find id of the username and search the orders table
//for the buyerid match
router.get('/viewordersbybuyerid/:uid', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let uid = req.params.uid;
  mongodao.vieworderbybuyerid(function (result) {
    res.send(result)
  }, uid)
});


//get order details
router.get('/vieworderdetails/:pid', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let pid = req.params.pid;
  mongodao.vieworderdetails(function (result) {
    res.send(result)
  }, pid)
});

//add orders for productid
//every product has a merchant associated 
//i.e. purchase product 
//first e have to find the merchant of the product
//then add merchantid, productid and buyerid to orders collection 
router.options('/addproductid', cors())
router.post('/addproductid', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let productid = req.body.productid;
  let merchantid = req.body.merchantid;
  let buyerid = req.body.buyerid;
  let review = req.body.review || 'Not reviewed';
  let orderstatus = req.body.orderstatus;
  let iscancelled = req.body.iscancelled;
  let rating = req.body.rating || 7;

  let orderjson = {
    productid,
    buyerid,
    review,
    orderstatus,
    iscancelled,
    rating
  }
  console.log('orderjson: ', orderjson)
  mongodao.addOrderForProductid(function (result) {
    res.send(result)
  }, orderjson)
});

router.options('/addproductid2', cors())
router.post('/addproductid2', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let productid = req.body.productid;
  let buyerid = req.body.buyerid;
  let review = req.body.review || 'Not reviewed';
  let orderstatus = req.body.orderstatus;
  let iscancelled = req.body.iscancelled;
  let rating = req.body.rating || 7;

  let orderjson = {
    productid,
    buyerid,
    review,
    orderstatus,
    iscancelled,
    rating
  }
  console.log('orderjson: ', orderjson)
  mongodao.addOrderForProductid2(function (result) {
    res.send(result)
  }, orderjson)
});


//add rating and review order
//i.e. add reviews for purchased items by thebuyer of that product
router.options('/:buyerusername/addreview', cors())
router.post('/:buyerusername/addreview', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let productid = req.body.productid;
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