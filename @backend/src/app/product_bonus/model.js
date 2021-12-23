const mongoose = require("mongoose")
const Schema = mongoose.Schema

const rewardLength = 7;

const productBonusSchema = new Schema({
  product_id: {
    type: mongoose.ObjectId,
    required: true,
    ref: "Product"
  },
  limit: {
    type: Number,
    required: true
  },
  for_recruiter: {
    type: [Number],
    required: true,
    default: [ 0, 0, 0, 0, 0, 0, 0 ],
    validate: [ lengthRestrict( rewardLength ), `{ PATH }'s length didn't match the proper number( Should be: ${ rewardLength } ).` ]
  },
  for_leader: {
    type: [Number],
    required: true,
    default: [ 0, 0, 0, 0, 0, 0, 0 ],
    validate: [ lengthRestrict( rewardLength ), `{ PATH }'s length didn't match the proper number( Should be: ${ rewardLength } ).` ]
  },
  for_saler: {
    type: [Number],
    required: true,
    default: [ 0, 0, 0, 0, 0, 0, 0 ],
    validate: [ lengthRestrict( rewardLength ), `{ PATH }'s length didn't match the proper number( Should be: ${ rewardLength } ).` ]
  }
})