const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NAME = "EmployeeRelations"

const employeeRelationsSchema = new Schema({
  employee_id: {
    type: mongoose.ObjectId,
    required: true,
    unique: true,
    ref: "Employee"
  },
  recruiter: {
    type: mongoose.ObjectId,
    required: true,
    default: function() {
      return this.employee_id
    },
    ref: "Employee"
  },
  leader: {
    type: mongoose.ObjectId,
    ref: "Employee"
  }
})

module.exports = mongoose.model( NAME, employeeRelationsSchema )