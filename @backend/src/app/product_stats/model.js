const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NAME = "ProductStats"

const productStatsSchema = new Schema({
  action: {
    type: Number,
    required: true
  },
  product_id: {
    type: mongoose.ObjectId,
    required: true,
    ref: "ProductType"
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

module.exports = mongoose.model( NAME, productStatsSchema )