const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema
const { isEmail } = require("validator")

const NAME = "Employee"
const SALT = 12

const employeeSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    validate: {
      validator: function( email ) {
        return isEmail( email )
      },
      message: "Unavailable email address."
    }
  },
  phone: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  account: {
    type: String,
    required: true,
    index: true,
    unique: true
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

employeeSchema.methods.setPassword = async function( pwd ) {
  const hashpwd = await bcrypt.hash( pwd, SALT )
  this.password = hashpwd
}

employeeSchema.methods.checkPassword = async function( pwd ) {
  const result = await bcrypt.compare( pwd, this.password )
  return result
}

module.exports = mongoose.model( NAME, employeeSchema )