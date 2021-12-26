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
  },
  bonus_id: {
    type: mongoose.ObjectId,
    required: true,
    ref: "ProductBonus"
  }
}, {
  timestamps: true
})

module.exports = mongoose.model( NAME, productSchema )