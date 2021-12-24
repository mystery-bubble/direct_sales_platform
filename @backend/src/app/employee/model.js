const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema

const NAME = "Employee"

const employeeSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  account: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  rank: {
    type: String,
    required: true,
    default: -1
  }
})

module.exports = mongoose.model( NAME, employeeSchema )