const mongoose = require("mongoose")

const Schema = mongoose.Schema

const productStatsSchema = new Schema({
  action: {
    type: Number,
    required: true
  },
  product_type_id: {
    type: mongoose.ObjectId,
    required: true,
    ref: "ProductType"
  },
  amount: {
    type: Number,
    required: true
  } 
},{
  timestamps: true
})