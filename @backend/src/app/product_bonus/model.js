const mongoose = require("mongoose")
const Schema = mongoose.Schema  

const NAME = "ProductBonus"

const productBonusSchema = new Schema({
  product_id: {
    type: mongoose.ObjectId,
    required: true,
    ref: "Product"
  },
  limit: {
    type: Number,
    default: () => this.for_saler[ this.for_saler.legnth - 1 ] + this.for_recruiter
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
    validate: [ lengthRestrict, `{ PATH }'s length didn't match the proper number( Should be: ${ rewardLength } ).` ]
  },
  for_saler: {
    type: [Number],
    required: true,
    default: [ 0, 0, 0, 0, 0, 0, 0 ],
    validate: [ lengthRestrict, `{ PATH }'s length didn't match the proper number( Should be: ${ rewardLength } ).` ]
  }
})

var lengthRestrict = val => {
  return val.length === 7
}

module.exports = mongoose.model( NAME, productBonusSchema )