const mongoose = require("mongoose")
const _ = require("lodash")

const TransactionContent = mongoose.model("TransactionContent")

const saveTransactionContent = async ( transaction_id, data ) => {
  data.transaction_id  = transaction_id
  const content = new TransactionContent( data )
  return await content.save()
}

const updateTransactionContent = async ( content, data ) => {
  const { amount } = data
  const current = content

  _.assign( current, {
    amount: amount || current.amount
  } )

  return current.save()
}

const removeTransactionContent = async content => await content.remove()

const findTransactionContentByObjectId = async id => await TransactionContent.findById( id )

const findAllContentOfTransaction = async tid => await TransactionContent.find( { transaction_id: tid } )

module.exports = {
  saveTransactionContent,
  updateTransactionContent,
  removeTransactionContent,
  findTransactionContentByObjectId,
  findAllContentOfTransaction
}