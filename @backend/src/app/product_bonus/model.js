const mongoose = require("mongoose")
const Schema = mongoose.Schema  

const NAME = "ProductBonus"

var lengthRestrict = val => {
  return val.length === 7
}

const productBonusSchema = new Schema({
  product_id: {
    type: mongoose.ObjectId,
    required: true,
    ref: "Product"
  },
  for_recruiter: {
    type: Number,
    required: true,
    default: 0
  },
  for_leader: {
    type: [Number],
    required: true,
    default: [ 0, 0, 0, 0, 0, 0, 0 ],
    validate: [ lengthRestrict, "{ PATH }'s length didn't match the proper number( Should be: 7 )." ]
  },
  for_saler: {
    type: [Number],
    required: true,
    default: [ 0, 0, 0, 0, 0, 0, 0 ],
    validate: [ lengthRestrict, "{ PATH }'s length didn't match the proper number( Should be: 7 )." ]
  }
})

productBonusSchema.virtual("limit").get( function() { this.for_saler[ this.for_saler.length - 1 ] + this.for_recruiter } )

module.exports = mongoose.model( NAME, productBonusSchema )