const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NAME = "ProductType"

const productTypeSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  product_id: {
    type: mongoose.ObjectId,
    required: true,
    ref: "Product"
  },
  title: {
    type: String,
    required: true
  },
  inventory: {
    type: Number,
    required: true,
    default: 0
  },
  purchase_price: {
    type: Number,
    required: true
  },
  selling_price: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model( NAME, productTypeSchema )