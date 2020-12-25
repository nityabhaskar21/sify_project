let mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({

  pname: {
    type: String,
    required: [true, 'Name of product is required!'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Product must belong to a category!'],
    lowercase: true
  },
  merchantid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Product must have a merchant!']
  },
  buyerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  ispurchased: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: [true, 'Price is required!'],
    min: 0
  },
  description: {
    type: String,
    maxLength: 200,
    trim: true
  },
  createdat: {
    type: Date,
    default: Date.now()
  }
})

const Product = mongoose.model('Product', ProductSchema, 'products')
module.exports = Product;