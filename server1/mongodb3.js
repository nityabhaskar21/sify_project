let mongoose = require('mongoose');
let mongoClient = require('mongodb').MongoClient;

let User = require('./models/userModel')
let Product = require('./models/productModel')
let Profile = require('./models/profileModel')
let Order = require('./models/orderModel')

const DB = "mongodb+srv://user3003:passsify3003@cluster0.tfqsz.mongodb.net/test?retryWrites=true&w=majority"
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

//view orders by ratings
module.exports.viewOrderbyrating = (cb) => {
  mongoose.connect(DB, options, (err, client) => {
    var resjson = {};
    //  console.log('Client', client)
    if (!err) {
      console.log("Success!")
      Order.find({
        ratings: ratings
      }, (err, data) => {
        if (err) {
          resjson = {
            msg: 'orders not available'
          };
        } else {
          data.forEach(doc => {
            console.log('Info of orders', doc);
            resjson = {
              msg: 'success',
              doc
            };
          })
        }
        mongoose.connection.close()
        cb(resjson)
      })

    } else console.log("ERROR!:", err.message)
  })
};

//view orders by username
module.exports.vieworderbybuyerid = (cb, uid) => {
  mongoose.connect(DB, options, (err, client) => {
    let resjson = {};
    if (!err) {
      Order.find({
          buyerid: uid
        },
        (err, data) => {
          if (err) {
            resjson = {
              error: 'Order not available'
            };
          } else {
            console.log('Info of orders', data);
            resjson.msg = 'Successfull!';
            resjson.odata = data;
          }
          cb(resjson)
        }
      );
    } else console.log('ERROR!:', err.message);
  });
};


//add orders for productid
module.exports.addOrderForProductid = (cb, orderjson) => {

  mongoose.connect(DB, options, (err, client) => {

    if (!err) {
      let resjson;
      Product.findOneAndUpdate({
        _id: orderjson.productid,
        ispurchased: false
      }, {
        $set: {
          ispurchased: true
        }
      }, {
        new: true
      }, (err, data) => {
        if (err) {
          resjson = {
            "msg": "Something went wrong"
          }
        } else {
          if (data) {
            console.log('Info of product', data)
            console.log('Orderjson: ', orderjson)

            Order.create({
              ...orderjson,
              merchantid: mongoose.Types.ObjectId(data.merchantid),

            }, (qerr, qdata) => {
              if (qerr) {
                console.log('Error in creating Order', qerr)
                resjson = {
                  "msg": "Order failed to create "
                }
              } else {
                console.log('qdata', qdata)
                resjson = {
                  "msg": "Order created sucessfully",
                  "qdata": qdata
                }
                console.log('resjson ', resjson)
              }
            })

          } else {
            resjson = {
              "error": "Order already exists for the product"
            }
          }
          cb(resjson)
        }

      })
    } else console.log("ERROR!:", err.message)

  })

};

module.exports.addOrderForProductid2 = (cb, orderjson) => {

  mongoose.connect(DB, options, (err, client) => {
    let resjson = {}
    if (err) {
      console.log('Error connecting', err.message)
    } else {
      Product.findOne({
        _id: orderjson.productid
      }, (err, doc1) => {
        console.log('doc1: ', doc1);
        if (doc1.ispurchased == false || !doc1.ispurchased) {
          Order.create({
            ...orderjson,
            merchantid: doc1.merchantid
          }, (err, doc2) => {
            console.log('doc2 ', doc2)
          })
          Product.findOneAndUpdate({
            _id: orderjson.productid
          }, {
            ispurchased: true
          }, {
            new: true
          }, (err, doc3) => {
            console.log('doc3 ', doc3)
            resjson = {
              "msg": "Item added to cart!"
            }
            cb(resjson)
          })
        } else {
          resjson = {
            "error": "Item already sold!" //if doc1.ispurchased == true
          }
          cb(resjson)
        }
        console.log('resjson ', resjson)
        // cb(resjson)
      })


    }
  })
};



//orderdetails

module.exports.vieworderdetails = (cb, productid) => {

  mongoose.connect(DB, options, (err, client) => {
    let resjson = {}
    if (err) {
      console.log('Error connecting', err.message)
    } else {
      Product.findOne({
        _id: productid
      }, (err, doc1) => {
        console.log(productid)
        console.log('Doc1 ', doc1)
        resjson = {
          doc1
        }
        cb(resjson)
      })

    }
  })
};

module.exports.vieworderdetailsbyoid = (cb, orderid) => {

  mongoose.connect(DB, options, (err, client) => {
    let resjson = {}
    if (err) {
      console.log('Error connecting', err.message)
    } else {
      Order.findOne({
        _id: orderid
      }, (err, doc1) => {
        console.log('orderid:', orderid)
        console.log('Doc1 ', doc1)
        resjson = {
          doc1
        }
        cb(resjson)
      })

    }
  })
};

module.exports.editreview = (cb, orderjson, orderid) => {

  mongoose.connect(DB, options, (err, client) => {
    let resjson = {}
    if (err) {
      console.log('Error connecting', err.message)
    } else {
      Order.findOneAndUpdate({
        _id: orderid
      }, {
        rating: orderjson.rating,
        review: orderjson.review
      }, {
        new: true
      }, (err, doc) => {
        if (err) {
          console.log('Error in creating profile', perr);
          //console.log(perr)
          resjson = {
            error: 'Order failed to be updated/created '
          };
        } else {
          resjson = {
            msg: 'Order updated sucessfully',
            doc
          };
          console.log('doc : ', doc)
        }
        cb(resjson);
      })

    }
  })
};