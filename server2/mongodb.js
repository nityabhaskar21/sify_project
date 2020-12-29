let mongoose = require('mongoose');
let mongoClient = require('mongodb').MongoClient;
let Test = require('./models/testModel');
let User = require('./models/userModel')
let Product = require('./models/productModel')

const DB = "mongodb+srv://satya3003:passsify3003@cluster0.tfqsz.mongodb.net/test?retryWrites=true&w=majority"
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

//viewall product from product model
module.exports.viewAllProduct = (cb) => {
  mongoose.connect(DB, options, (err, client) => {
   
    if (!err) {
      console.log("Success!")
      Product.find((err, doc) => {
        if (err) {
          var resjson = {
            "error": err.errors || 'product not available'
          }
        } else {
          console.log('doc: ', doc)
          resjson = {
            ...doc
          }
        }
        mongoose.connection.close()
        cb(resjson)
      })

    } else console.log("ERROR!:", err.message)
  })
}

//view by user's product
module.exports.viewByUsername = (cb, uname) => {
  mongoose.connect(DB, options, (err, client) => {
    var resjson = {}
    
    if (!err) {
      console.log("Success!")
      User.find({
        "username": uname
      }, (err, data) => {
        if (err) {
          resjson = {
            "msg": "User not available"
          }
        } else {
          data.forEach(doc => {
            console.log('Info of user', doc)
            resjson = {
              "msg": "success",
              doc
            }
            Product.find({
              merchantid: doc._id
            }, (qerr, qdata) => {
              if (qerr) {
                console.log('This executes')
                resjson = {
                  ...resjson,
                  "qdata": "No user product available"
                }
                console.log('new resjson: ', resjson)
              } else {
                qdata.forEach(d => {
                  console.log('User Product: ', d);
                  resjson.qdata = d
                })
              }
              cb(resjson)
            })
          })
        }
        mongoose.connection.close();
      })
    } else console.log("ERROR!:", err.message)
  })
}

//add user's product
module.exports.addProduct = (cb, productjson) => {
  mongoose.connect(DB, options, (err, client) => {
    var resjson = {}
    //  console.log('Client', client)
    if (!err) {
      console.log("Success!")
      User.find({
        "username": productjson.username
      }, (err, data) => {
        if (err) {
          resjson = {
            "msg": "User not available"
          }
        } else {
          data.forEach(doc => {
            console.log('Info of user', doc)
            resjson = {
              "msg": "success",
              doc
            }
            console.log(typeof doc._id)
            console.log(productjson)
            
            delete productjson.username;
            Product.create({
              merchantid: mongoose.Types.ObjectId(doc._id),
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
}


//view product by category
module.exports.viewByCategory = (cb, cat) => {
  mongoose.connect(DB, options, (err, client) => {
    var resjson = {}
    
    if (!err) {
      console.log("Success!")
      Product.find({
        "category": cat
      }, (err, data) => {
        if (err) {
          resjson = {
            "msg": "Product not available"
        };
      } else {
        console.log('doc: ', doc);
        resjson = {
          msg: "View products successful",
          doc
        }
      }
      cb(resjson);
       mongoose.connection.close();
     
    })
  } else console.log('ERROR!:', err.message);
})
}

       