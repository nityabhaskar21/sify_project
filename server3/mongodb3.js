let mongoose = require('mongoose');
let mongoClient = require('mongodb').MongoClient;

let User = require('./models/userModel')
let Product = require('./models/productModel')
let Profile = require('./models/profileModel')
let Order = require('./models/orderModel')

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
module.exports.vieworderbyusername = (cb, uname) => {
  mongoose.connect(DB, options, (err, client) => {
    var resjson = {};
    //  console.log('Client', client)
    if (!err) {
      console.log('Success!');
      Order.find({
          username: uname
        },
        (err, data) => {
          if (err) {
            resjson = {
              msg: 'User not available'
            };
          } else {
            data.forEach(doc => {
              console.log('Info of order', doc);
              resjson = {
                msg: 'success',
                doc
              };
              Profile.find({
                  userid: doc._id
                },
                (perr, pdata) => {
                  if (perr) {
                    console.log('error occured', perr);
                    resjson = {
                      ...resjson,
                      pdata: 'No user profile available'
                    };
                    console.log('new resjson: ', resjson);
                  } else {
                    pdata.forEach(d => {
                      console.log('User Profile: ', d);
                      resjson.pdata = d;
                    });
                  }
                  cb(resjson);
                }
              );
            });
          }
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
            User.findOne({
              username: orderjson.buyerusername
            }, (err, doc) => {
              let buyerid = doc._id;
              delete orderjson.buyerusername;
              Order.create({
                ...orderjson,
                buyerid: buyerid,
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