const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NAME = "Product"

const productSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
})

module.exports = mongoose.model( NAME, productSchema )