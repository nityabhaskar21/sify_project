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

module.exports.getbuyerid = (uname) => {
  var userid;
  mongoose.connect(DB, options, (err, client) => {
    User.findOne({
      username: uname
    }, (err, doc) => {
      userid = doc._id;
      console.log('Getbuyerid: ', doc)
    })
  })


  return userid;
};