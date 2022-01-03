const mongoose = require("mongoose")
const _ = require("lodash")

const CustomerOrigin = mongoose.model("CustomerOrigin")

const saveCustomerOrigin = async data => {
  const origin = new CustomerOrigin( data )
  return await origin.save()
}

const updateCustomerOrigin = async ( customer, data ) => {
  const { used_count } = data
  const current = customer
  
  _.assign( current, {
    used_count: used_count || current.used_count
  } )
}

const removeCustomerOrigin = async origin => await origin.remove()

const findCustomerOriginByAddress = async address => await CustomerOrigin.find( { origin_network_address: address } ).sort( { used_count: 1 } )