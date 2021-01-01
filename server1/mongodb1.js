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