let mongoose = require('mongoose');
let mongoClient = require('mongodb').MongoClient;
let Test = require('./models/testModel');
let User = require('./models/userModel');
let Order = require('./models/orderModel');
let Profile = require('./models/profileModel')

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
            msg: 'success', doc
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
                msg: 'success', doc
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
module.exports.addProductid = (cb, productjson) => {
  mongoose.connect(DB, options, (err, client) => {
    var resjson = {}
    //  console.log('Client', client)
    if (!err) {
      console.log("Success!")
      Order.find({
        "productid": productjson.productid
      }, (err, data) => {
        if (err) {
          resjson = {
            "msg": "Order not available"
          }
        } else {
          data.forEach(doc => {
            console.log('Info of order', doc)
            resjson = {
              "msg": "success",
              doc
            }
            console.log(typeof doc._id)
            console.log(productjson)
            
            Product.create({
              merchaneid: mongoose.Types.ObjectId(doc._id),
              ...productjson
            }, (qerr, qdata) => {
              if (qerr) {
                console.log('Error in creating product', qerr)
                //console.log(perr)
                resjson = {
                  "msg": "Product failed to create "
                }
              } else {
                resjson = {
                  "msg": "Product created sucessfully",
                  qdata
                }
              }
              cb(resjson)
            })
          })
        }
        //  mongoose.connection.close();
      })
    } else console.log("ERROR!:", err.message)
  })
};