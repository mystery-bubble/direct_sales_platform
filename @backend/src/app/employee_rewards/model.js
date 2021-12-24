const mongoose = require("mongoose")
const Schema = mongoose.Schema

const employeeRewardsSchema = new Schema({
  employee_id: {
    type: mongoose.ObjectId,
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  last_month_reward: {
    type: Number,
    required: true,
    default: 0
  },
  monthly_point: {
    type: Number,
    required: true,
    default: 0
  },
  total_point: {
    type: Number,
    default: 0
  }
})