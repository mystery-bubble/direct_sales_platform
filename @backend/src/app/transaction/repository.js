const mongoose = require("mongoose")
const _ = require("lodash")

const Transaction = mongoose.model("Transaction")

const saveTransaction = async data => {
  data.sold_time = new Date( sold_time )
  const transaction = new Transaction( data )
  return await transaction.save()
}

const updateTransaction = async ( transaction, data ) => {
  data.sold_time = new Date( sold_time )
  const { employee_id, status, discount } = data
  const current = transaction

  _.assign( current, {
    employee_id: employee_id || current.employee_id,
    status: status || current.status,
    discount: discount || current.discount
  } )

  return await current.save()
}

const removeTransaction = async transaction => await transaction.remove()

const findTransationByObjectId = async id => await Transaction.findById( id )

const findTransationById = async id => await Transaction.findOne( { id } )

const findTransationByCustomer = async cid => await Transaction.find( { customer_id: cid } )

const findTransationByEmployee = async eid => await Transaction.find( { employee_id: eid } )

module.exports = {
  saveTransaction,
  updateTransaction,
  removeTransaction,
  findTransationByObjectId,
  findTransationById,
  findTransationByCustomer,
  findTransationByEmployee
}