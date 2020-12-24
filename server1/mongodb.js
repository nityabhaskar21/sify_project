 let mongoose = require('mongoose');
 let mongoClient = require('mongodb').MongoClient;
 let Test = require('./models/testModel');

 const DB = "mongodb+srv://user3003:passsify3003@cluster0.tfqsz.mongodb.net/test?retryWrites=true&w=majority"
 //  mongoose.connect(DB, {
 //    useNewUrlParser: true,
 //    useCreateIndex: true,
 //    useFindAndModify: false,
 //    useUnifiedTopology: true
 //  }, (err, client) => {
 //    if (!err) {
 //      console.log("Success!")
 //      Test.findByIdAndDelete('5fe4b52fe69f50aa0ce86676', (err, doc) => console.log('deleted!'))
 //    } else console.log("ERROR!:", err.message)
 //  })
 // mongoose.connect(DB, {
 //   useNewUrlParser: true,
 //   useCreateIndex: true,
 //   useFindAndModify: false,
 //   useUnifiedTopology: true
 // }, (err, client) => {
 //   if (!err) {
 //     console.log("Success!")
 //     Test.updateOne({
 //       name: "sunil kumar"
 //     }, {
 //       $set: {
 //         salary: 9000
 //       }
 //     }, {
 //       new: true
 //     }, (err, doc) => console.log('doc updated'))
 //   } else console.log("ERROR!:", err.message)
 // })
 //  mongoose.connect(DB, {
 //    useNewUrlParser: true,
 //    useCreateIndex: true,
 //    useFindAndModify: false,
 //    useUnifiedTopology: true
 //  }, (err, client) => {
 //    if (!err) {
 //      console.log("Success!")
 //      Test.create({
 //        "name": "sunil singh",
 //        "dept": "production",
 //        "salary": 7000
 //      }, (err, doc) => {
 //        console.log(doc)
 //      })
 //    } else console.log("ERROR!:", err.message)
 //  })
 mongoose.connect(DB, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false,
   useUnifiedTopology: true
 }, (err, client) => {
   if (!err) {
     console.log("Success!")
     Test.find((err, data) => data.forEach((doc) => console.log(doc)))
     Test.aggregate([{
       $group: {
         "_id": 0,
         "no of collections ": {
           $sum: 1
         }
       }
     }], (err, result) => result.forEach(doc => console.log(doc)))
   } else console.log("ERROR!:", err.message)
 })

 // mongoClient.connect(DB, {
 //     useUnifiedTopology: true
 //   },
 //   function (err, client) {
 //     if (!err) {
 //       console.log("connected!");
 //       var db = client.db("test");
 //       db.collection('testCollection', (err, collection) => {
 //         collection.find().toArray((err, res) => {
 //           console.log(res);
 //           client.close();

 //         })
 //       })
 //     } else console.log(err.message)
 //   })

 // module.exports.viewprojects = (cb) => {
 //   mongoClient.connect(DB, {
 //       useUnifiedTopology: true
 //     },
 //     function (err, client) {
 //       if (!err) {
 //         console.log("connected!");
 //         var db = client.db("test");
 //         db.collection('testCollection', (err, collection) => {
 //           collection.find().toArray((err, res) => {
 //             console.log(res);
 //             client.close();
 //             cb(res);
 //           })
 //         })
 //       } else console.log(err.message)
 //     })
 // }