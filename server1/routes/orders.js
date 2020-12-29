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
router.get('/:username/viewordersbyusername', cors({
  origin: "http://localhost:4200"
}), function (req, res, next) {
  let username = req.params.uname;
  mongodao.vieworderbyusername(function (result) {
    res.send(result)
  }, username)
});


//add orders for productid
//every product has a merchant associated 
//i.e. purchase product 
//first e have to find the merchant of the product
//then add merchantid, productid and buyerid to orders collection 
router.options('/:buyerusername/addorderforproduct', cors())
router.post('/:buyerusername/addorderforproduct', cors({
  origin: "http://localhost:4200"
}), async function (req, res, next) {
  let buyerusername = req.params.buyerusername;
  let productid = req.body.productid;
  let review = req.body.review;
  let orderstatus = req.body.orderstatus;
  let iscancelled = req.body.iscancelled;
  let rating = req.body.rating;

  let buyerid = await utilitya.getbuyerid(buyerusername);
  console.log('buyerid: ', buyerid)

  let orderjson = {
    productid,
    review,
    orderstatus,
    iscancelled,
    rating,
    buyerid,
    buyerusername
  }
  console.log('productjson: ', orderjson)
  mongodao.addOrderForProductid(function (result) {
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