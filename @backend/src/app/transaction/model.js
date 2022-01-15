const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NAME = "Transaction"

const transactionSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  employee_id: {
    type: String,
    index: true,
    default: new mongoose.Types.ObjectId( null ) 
  },
  status: {
    type: Number,
    required: true,
    enum: [ 0, 1, 2 ], // 0 for established, 1 for claimed, 2 for sold
    default: 0
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