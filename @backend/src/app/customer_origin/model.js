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
    required: true
  },
  used_count: {
    type: Number
  }
})

module.exports = mongoose.model( NAME, customerOriginSchema )