let mongoose = require('mongoose');
let mongoClient = require('mongodb').MongoClient;
let Test = require('./models/testModel');
let User = require('./models/userModel')

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
    //  console.log('Client', client)
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