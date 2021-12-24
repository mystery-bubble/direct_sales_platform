const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NAME = "TransactionContent"

const transactionContentSchema = new Schema({
  product_type_id: {
    type: mongoose.ObjectId,
    required: true,
    ref: "ProductType"
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  sold_time: {
    type: Date
  }
}, {
  timestamps: true
})

module.exports = mongoose.model( NAME, transactionContentSchema )