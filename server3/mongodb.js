let mongoose = require('mongoose');
let mongoClient = require('mongodb').MongoClient;
let Test = require('./models/testModel');
let User = require('./models/userModel');
let Order = require('./models/orderModel')

const DB = "mongodb+srv://harika3003:passsify3003@cluster0.tfqsz.mongodb.net/test?retryWrites=true&w=majority"
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

//viewall orders from ordermodel
module.exports.viewAllOrder = (cb) => {
  mongoose.connect(DB, options, (err, client) => {
    //  console.log('Client', client)
    if (!err) {
      console.log("Success!")
      Order.find((err, doc) => {
        if (err) {
          var resjson = {
            "error": err.errors || 'orders not available'
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