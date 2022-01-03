const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NAME = "TransactionContent"

const transactionContentSchema = new Schema({
  transaction_id: {
    type: mongoose.ObjectId,
    required: true,
    ref: "Transaction"
  },
  product_type_id: {
    type: mongoose.ObjectId,
    required: true,
    ref: "ProductType"
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model( NAME, transactionContentSchema )