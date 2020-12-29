let mongoose = require('mongoose');
let mongoClient = require('mongodb').MongoClient;
let Test = require('./models/testModel');
let User = require('./models/userModel');
let Profile = require('./models/profileModel');

const DB =
  'mongodb+srv://user3003:passsify3003@cluster0.tfqsz.mongodb.net/test?retryWrites=true&w=majority';
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};

//add user to User Model
module.exports.addUser = (cb, userjson) => {
  mongoose.connect(DB, options, (err, client) => {
    //  console.log('Client', client)
    if (!err) {
      console.log('Success!');
      User.create(userjson, (err, doc) => {
        if (err) {
          var resjson = {
            error: err.errors || 'User already exists'
          };
        } else {
          console.log(doc);
          resjson = {
            msg: 'User added!',
            doc
          };
        }
        console.log('doc', doc);
        mongoose.connection.close();
        cb(resjson);
      });
    } else console.log('ERROR!:', err.message);
  });
};

//login user
module.exports.loginUser = (cb, userjson) => {
  mongoose.connect(DB, options, (err, client) => {
    //  console.log('Client', client)
    if (!err) {
      console.log('Success!');
      User.findOne(userjson, (err, doc) => {
        if (err) {
          var resjson = {
            error: err.errors || 'Wrong credentials!'
          };
        } else if (doc) {
          console.log(doc);
          resjson = {
            msg: 'User logged!',
            doc
          };
        } else {
          var resjson = {
            error: 'Wrong credentials. Please provide correct username and password.'
          };
        }
        console.log('doc', doc);
        mongoose.connection.close();
        cb(resjson);
      });
    } else console.log('ERROR!:', err.message);
  });
};

//view all users from UserModel
module.exports.viewAllUsers = cb => {
  mongoose.connect(DB, options, (err, client) => {
    //  console.log('Client', client)
    if (!err) {
      console.log('Success!');
      User.find((err, doc) => {
        if (err) {
          var resjson = {
            error: err.errors || 'Users not available'
          };
        } else {
          console.log('doc: ', doc);
          resjson = {
            msg: "View users successful",
            doc
          };
        }
        mongoose.connection.close();
        cb(resjson);
      });
    } else console.log('ERROR!:', err.message);
  });
};

//view User's Profile
module.exports.viewUserProfile = (cb, uname) => {
  mongoose.connect(DB, options, (err, client) => {
    var resjson = {};
    //  console.log('Client', client)
    if (!err) {
      console.log('Success!');
      User.find({
          username: uname
        },
        (err, data) => {
          if (err) {
            resjson = {
              msg: 'User not available'
            };
          } else {
            data.forEach(doc => {
              console.log('Info of user', doc);
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

//Add User profile
module.exports.addUserProfile = (cb, profilejson) => {
  mongoose.connect(DB, options, (err, client) => {
    var resjson = {};
    //  console.log('Client', client)
    if (!err) {
      console.log('Success!');
      User.find({
          username: profilejson.username
        },
        (err, data) => {
          if (err) {
            resjson = {
              error: 'User not available'
            };
          } else {
            data.forEach(doc => {
              console.log('Info of user', doc);
              resjson = {
                msg: 'success in finding user'
              };
              console.log(doc._id);
              //  phone: profilejson.phone,
              //  company: profilejson.company,
              //  address: profilejson.address,
              //  city: profilejson.city,
              //  pin: profilejson.pin,
              //  country: profilejson.country,
              //  about: profilejson.about,
              //  ps: profilejson.prs
              profilejson.username;
              console.log(profilejson);
              Profile.findOneAndUpdate({
                  userid: doc._id
                },
                profilejson, {
                  new: true,
                  upsert: true
                },
                (perr, pdata) => {
                  if (perr) {
                    console.log('Error in creating profile', perr);
                    //console.log(perr)
                    resjson = {
                      error: 'Profile failed to be updated/created '
                    };
                  } else {
                    resjson = {
                      msg: 'Profile updated sucessfully',
                      pdata
                    };
                    console.log('pdata: ', pdata)
                  }
                  cb(resjson);
                }
              );
            });
          }
          //  mongoose.connection.close();
        }
      );
    } else console.log('ERROR!:', err.message);
  });
};

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
//  mongoose.connect(DB, {
//    useNewUrlParser: true,
//    useCreateIndex: true,
//    useFindAndModify: false,
//    useUnifiedTopology: true
//  }, (err, client) => {
//    if (!err) {
//      console.log("Success!")
//      Test.find((err, data) => data.forEach((doc) => console.log(doc)))
//      Test.aggregate([{
//        $group: {
//          "_id": 0,
//          "no of collections ": {
//            $sum: 1
//          }
//        }
//      }], (err, result) => result.forEach(doc => console.log(doc)))
//    } else console.log("ERROR!:", err.message)
//  })

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