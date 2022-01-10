const _ = require("lodash")
const uuid = require("uuid")

const repository = {
  ...require("./repository"),
  employee: require("../employee/repository"),
  customer: require("../customer/repository"),
  customer_origin: require("../customer_origin/repository"),
  transaction_content: require("../transaction_content/repository")
}

exports.create = async ( req, res ) => {
  try {
    const id = req.body.id || uuid.v4()
    const savedTransaction = await repository.saveTransaction( req.body.customer, {
      id,
      status: 0,
      discount: req.body.discount
    } )
    for ( let order of req.body.orders ) {
      await repository.transaction_content.saveTransactionContent( savedTransaction._id, {
        product_type_id: order.product,
        amount: order.amount
      })
    }

    res.success( { "message": "Transaction create successfully." } )
  }
  catch ( err ) {
    console.log( err )
    res.send( { err } )
  }
}

exports.remove = async ( req, res ) => {
  try {
    const target = await repository.findTransactionById( req.body.id )
    if ( target.status < 2 ) {
      await repository.removeTransaction( target )
      res.success( { "message": "Transaction remove successfully." } )
    }
    else {
      res.unprocessableEntity( { "message": "This transaction should not be delete because it has been finished." } )
    }
  }
  catch ( err ) {
    console.log( err )
    res.send( { err } )
  }
}

exports.edit = async ( req, res ) => {
  try {
    const remote_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const target = await repository.findTransactionById( req.body.id )
    const type = req.query.type
    var updatedTransaction = undefined

    switch( type ) {
      case "status":
        updatedTransaction = await repository.updateTransaction( target, req.body )
        if ( updatedTransaction.status === 1 && target.status === 0 ) {
          let target_origin = await repository.customer_origin.findCustomerOriginByCustomerAndAddress( target.customer_id, remote_address )
          await repository.customer_origin.updateCustomerOrigin( target_origin, ++target_origin.used_count )
        }
        break
      case "employee":
        updatedTransaction = await repository.updateTransaction( target, {
          employee_id: req.body.employee || req.body.employee_id
        })
        break
      case "content":
        for ( let order of req.body.add ) {
          await repository.transaction_content.saveTransactionContent( target._id, order )
        }
  
        for ( let order of req.body.change ) {
          let need_change_content = await repository.transaction_content.findTransactionContentByObjectId( order._id )
          await repository.transaction_content.updateTransactionContent( need_change_content, { amount: order.amount } )
        }
  
        for ( let id of req.body.remove ) {
          let need_delete_content = await repository.transaction_content.findTransactionContentByObjectId( id )
          await repository.transaction_content.removeTransactionContent( need_delete_content )
        }
        
        if ( req.body.discount ) {
          updatedTransaction = await repository.updateTransaction( target, { discount: req.body.discount  } )
        }
        break
    }
    res.success( { "message": "Transaction update successfully.", "target": updatedTransaction } )
  }
  catch ( err ) {
    console.log( err )
    res.send( err )
  }
}

exports.get = async ( req, res ) => {
  try {
    const id = req.query.tid || req.body.tid
    if ( !id ) {
      throw new Error("You need more params for this api to work! ")
    }
    var result = await repository.findTransationById( id )
    result.orders = await repository.transaction_content.findAllContentOfTransaction( id )

    res.success( result )
  }
  catch ( err ) {
    console.log( err )
    res.send( err )
  }
}