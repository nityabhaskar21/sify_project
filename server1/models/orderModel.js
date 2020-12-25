let mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Oder must be associated to a product!']
  },
  merchantid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Product must have a merchant!']
  },
  buyerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Product Order must have a buyer!']
  },
  review: {
    type: String,
    default: 'Not reviewed yet!'
  },
  orderstatus: {
    type: Boolean,
    default: true
  },
  iscancelled: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 7
  },
  createdat: {
    type: Date,
    default: Date.now()
  }

})

const Order = mongoose.model('Product', OrderSchema, 'orders')
module.exports = Order;