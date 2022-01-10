const mongoose = require("mongoose")
const _ = require("lodash")

const Employee = mongoose.model("Employee")

const saveEmployee = async data => {
  const employee = new Employee( data )
  await employee.setPassword( data.password )
  return await employee.save()
}

const updateEmployee = async ( employee, data ) => {
  const { name, email, phone, account, password, rank } = data
  const current = employee 

  _.assign( current, {
    name: name || current.name,
    email: email || current.email,
    phone: phone || current.phone,
    account: account || current.account,
    rank: rank || current.rank
  } )

  if ( !!password && !( await current.checkPassword( password ) ) ) {
    await current.setPassword( password )
  }

  return await current.save()
}

const removeEmployee = async employee => await employee.remove()

const findEmployeeByObjectId = async id => await Employee.findById( id )

const findEmployeeById = async id => await Employee.findOne( { id } )

const findEmployeeByPhone = async phone => await Employee.findOne( { phone } )

const findEmployeeByEmail = async email => await Employee.findOne( { email } )

const findEmployeeByAccount = async account => await Employee.findOne( { account } )

const findEmployeeByName = async name => {
  let regex_object = new RegExp( name )
  return await Employee.find(
    {
      name: { $regex: regex_object, $options: 'i' }
    }
  )
}

module.exports = {
  saveEmployee,
  updateEmployee,
  removeEmployee,
  findEmployeeByObjectId,
  findEmployeeById,
  findEmployeeByPhone,
  findEmployeeByEmail,
  findEmployeeByAccount,
  findEmployeeByName
}