const mongoose = require("mongoose")
const _ = require("lodash")

const Customer = mongoose.model("Customer")

const saveCustomer = async data => {
  const customer = new Customer( data )
  return await customer.save()
}

const updateCustomer = async ( customer, data ) => {
  const { call_as, email, phone } = data
  const current = customer

  _.assign( customer, {
    call_as: call_as || current.call_as,
    email: email || current.email,
    phone: phone || current.phone
  } )
}

const removeCustomer = async customer => await customer.remove()

const findCustomerByObjectId = async id => await Customer.findById( id )

const findCustomerByPhone = async phone => await Customer.findOne( { phone } )

module.exports = {
  saveCustomer,
  updateCustomer,
  removeCustomer,
  findCustomerByObjectId,
  findCustomerByPhone
}