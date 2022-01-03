const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NAME = "Customer"

const customerSchema = new Schema({
  call_as: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    index: true
  }
})

module.exports = mongoose.model( NAME, customerSchema )