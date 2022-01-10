const mongoose = require("mongoose")
const _ = require("lodash")

const CustomerOrigin = mongoose.model("CustomerOrigin")

const saveCustomerOrigin = async ( customer_id, data ) => {
  data.customer_id = customer_id
  const origin = new CustomerOrigin( data )
  return await origin.save()
}

const updateCustomerOrigin = async ( origin, data ) => {
  const { used_count } = data
  const current = customer
  
  _.assign( current, {
    used_count: used_count || current.used_count
  } )
}

const removeCustomerOrigin = async origin => await origin.remove()

const findCustomerOriginByObjectId = async id => await CustomerOrigin.findById( id )

const findCustomerOriginByCustomer = async cid => await CustomerOrigin.find( { customer_id: cid } )
                                                                      .populate("customer_id")
                                                                      .sort( { used_count: -1 } )

const findCustomerOriginByAddress = async address => await CustomerOrigin.find( { origin_network_address: address } )
                                                                         .populate("customer_id")
                                                                         .sort( { used_count: -1 } )

const findCustomerOriginByCustomerAndAddress = async ( customer_id, address ) => await CustomerOrigin.findOne( { customer_id, origin_network_address: address } )

module.exports = {
  saveCustomerOrigin,
  updateCustomerOrigin,
  removeCustomerOrigin,
  findCustomerOriginByObjectId,
  findCustomerOriginByCustomer,
  findCustomerOriginByAddress,
  findCustomerOriginByCustomerAndAddress
}