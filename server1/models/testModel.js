let mongoose = require('mongoose');
const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dept: {
    type: String,
    maxlength: 20,
  },
  salary: {
    type: Number,
    required: true
  }
})

const TestModel = mongoose.model('TestModel', testSchema, 'testCollection')
module.exports = TestModel;