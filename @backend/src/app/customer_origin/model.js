const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NAME = "CustomerOrigin"

const customerOriginSchema = new Schema({
  origin_network_address: {
    type: String,
    required: true,
    index: true
  },
  customer_id: {
    type: mongoose.ObjectId,
    required: true,
    ref: "Customer"
  },
  used_count: {
    type: Number,
    default: 1
  }
})

customerOriginSchema.index({ origin_network_address: 1, customer_id: 1 }, { unique: true })

module.exports = mongoose.model( NAME, customerOriginSchema )