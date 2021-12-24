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
    required: true
  },
  status: {
    type: String,
    required: true
  },
  customer_id: {
    type: mongoose.ObjectId
  }
})

module.exports = mongoose.model( NAME, transactionSchema )