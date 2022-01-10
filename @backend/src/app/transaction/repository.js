const mongoose = require("mongoose")
const _ = require("lodash")

const Transaction = mongoose.model("Transaction")

const saveTransaction = async ( customer_id, data ) => {
  data.customer_id = customer_id
  const transaction = new Transaction( data )
  return await transaction.save()
}

const updateTransaction = async ( transaction, data ) => {
  if ( data.sold_time ) {
    data.sold_time = new Date( sold_time )
  }
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

const findTransactionByObjectId = async id => await Transaction.findById( id )

const findTransactionById = async id => await Transaction.findOne( { id } )

const findTransactionByCustomer = async cid => await Transaction.find( { customer_id: cid } )

const findTransactionByEmployee = async eid => await Transaction.find( { employee_id: eid } )

module.exports = {
  saveTransaction,
  updateTransaction,
  removeTransaction,
  findTransactionByObjectId,
  findTransactionById,
  findTransactionByCustomer,
  findTransactionByEmployee
}