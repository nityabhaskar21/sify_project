// hello everyone



//////////////////////////////////////////////////////////////
// Mongoose CRUD operations:

//Write or create data
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, (err, client) => {
  if (!err) {
    console.log("Success!")
    Test.create({
      "name": "sunil singh",
      "dept": "production",
      "salary": 7000
    }, (err, doc) => {
      console.log(doc)
    })
  } else console.log("ERROR!:", err.message)
})

//Read data using find and aggregate
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, (err, client) => {
  if (!err) {
    console.log("Success!")
    Test.find((err, data) => data.forEach((doc) => console.log(doc)))
  } else console.log("ERROR!:", err.message)
})

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, (err, client) => {
  if (!err) {
    console.log("Success!")
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

//Update data
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, (err, client) => {
  if (!err) {
    console.log("Success!")
    Test.updateOne({
      name: "sunil kumar"
    }, {
      $set: {
        salary: 9000
      }
    }, (err, doc) => console.log('doc updated'))
  } else console.log("ERROR!:", err.message)
})
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, (err, client) => {
  if (!err) {
    console.log("Success!")
    Test.updateOne({
      name: "sunil kumar"
    }, {
      $set: {
        salary: 9000
      }
    }, {
      new: true
    }, (err, doc) => console.log('doc updated'))
  } else console.log("ERROR!:", err.message)
})

//delete data for an specific id
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, (err, client) => {
  if (!err) {
    console.log("Success!")
    Test.findByIdAndDelete('5fe4b52fe69f50aa0ce86676', (err, doc) => console.log('deleted!'))
  } else console.log("ERROR!:", err.message)
})