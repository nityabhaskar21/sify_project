let mongoose = require('mongoose');
let mongoClient = require('mongodb').MongoClient;
let Test = require('./models/testModel');
let User = require('./models/userModel');
let Order = require('./models/orderModel');
let Profile = require('./models/profileModel')
let Product = require('./models/productModel')


const DB = "mongodb+srv://harika3003:passsify3003@cluster0.tfqsz.mongodb.net/test?retryWrites=true&w=majority"
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
module.exports.vieworderbybuyerid = (cb, customerid) => {
  mongoose.connect(DB, options, (err, client) => {
    var resjson = {};
    //  console.log('Client', client)
    if (!err) {
      console.log('Success!');
      Order.find({
          buyerid: customerid
        },
        (err, data) => {
          if (err) {
            resjson = {
              msg: 'User not available'
            };
          } else {
            console.log(data)
            cb(data)
                }});
              } else console.log('ERROR!:', err.message);
            });
        };
      

//add orders for productid
module.exports.addOrderForProductid = (cb, orderjson) => {
  mongoose.connect(DB, options, (err, client) => {
    var resjson = {}
    //  console.log('Client', client)
    if (!err) {
      console.log("Success connecting!")
      Product.findOne({
        _id: orderjson.productid
      }, (err, data) => {
        if (err) {
          resjson = {
            "msg": "Product not available"
          }
        } else {

          console.log('Info of product', data)
          console.log('merchant id type', typeof data.merchantid)
          let buyerid = data.buyerid
          delete orderjson.buyerid
          Order.create({
            ...orderjson,
            merchantid: mongoose.Types.ObjectId(data.merchantid),
            buyerid: mongoose.Types.ObjectId(buyerid)
          }, (qerr, qdata) => {
            if (qerr) {
              console.log('Error in creating Order', qerr)
              resjson = {
                "msg": "Order failed to create "
              }
            } else {
              resjson = {
                "msg": "Order created sucessfully",
                qdata
              }
            }
            cb(resjson)
          })

        }
      //  mongoose.connection.close();
      })
    } else console.log("ERROR!:", err.message)
  })
};