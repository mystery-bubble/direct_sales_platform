const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NAME = "Transaction"

const transactionSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  employee_id: {
    type: String,
    required: true,
    index: true
  },
  status: {
    type: String,
    required: true
  },
  customer_id: {
    type: mongoose.ObjectId,
    index: true,
    ref: "Customer"
  },
  discount: {
    type: Number,
    default: 0
  },
  sold_time: {
    type: Date,
    default: new Date( null )
  }
}, {
  timestamps: true
})

module.exports = mongoose.model( NAME, transactionSchema )