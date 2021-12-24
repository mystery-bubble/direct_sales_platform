const mongoose = require("mongoose")
const Schema = mongoose.Schema

const employeeRelationsSchema = new Schema({
  employee_id: {
    type: mongoose.ObjectId,
    required: true,
    unique: true
  },
  recruiter: {
    type: mongoose.ObjectId,
    required: true,
    ref: "Employee"
  },
  leader: {
    type: mongoose.ObjectId,
    ref: "Employee"
  }
})