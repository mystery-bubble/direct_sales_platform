const mongoose = require("mongoose")

const Schema = mongoose.Schema

const productTypeSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  product_id: {
    type: mongoose.ObjectId,
    required: true
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