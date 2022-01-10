const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { isEmail } = require("validator")

const NAME = "Customer"

const customerSchema = new Schema({
  call_as: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    validate: {
      validator: function( email ) {
        return isEmail( email )
      },
      message: "Unavailable email address."
    }
  },
  phone: {
    type: String,
    required: true,
    index: true,
    unique: true
  }
})

module.exports = mongoose.model( NAME, customerSchema )