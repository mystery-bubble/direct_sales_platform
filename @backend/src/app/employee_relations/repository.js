const mongoose = require("mongoose")
const _ = require("lodash")

const EmployeeRelations = mongoose.model("EmployeeRelations")

const saveEmployeeRelations = async ( employee_id, data ) => {
  data.employee_id = employee_id
  let relations = new EmployeeRelations( data )
  return await relations.save()
}

const updateEmployeeRelations = async ( relations, data ) => {
  let { recruiter, leader } = data
  let current = relations

  _.assign( current, {
    recruiter: recruiter || current.recruiter,
    leader: leader || current.leader
  })

  return await current.save()
}

const removeEmployeeRelations = async relations => await relations.remove()

const findEmployeeRelationsByObjectId = async id => await EmployeeRelations.findById( id )

const findEmployeeRelationsByEmployee = async eid => await EmployeeRelations.findOne( { employee_id: eid } )

module.exports = {
  saveEmployeeRelations,
  updateEmployeeRelations,
  removeEmployeeRelations,
  findEmployeeRelationsByObjectId,
  findEmployeeRelationsByEmployee
}