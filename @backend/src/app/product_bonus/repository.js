const mongoose = require("mongoose")
const _ = require("lodash")

const ProductBonus = mongoose.model("ProductBonus")

const saveProductBonus = async ( product_id, data ) => {
  data.product_id = product_id
  const bonus = new ProductBonus( data )
  return bonus.save()
}

const updateProductBonus = async ( bonus, data ) => {
  const { product_id, limit, for_recruiter, for_leader, for_saler } = data ;
  const current = bonus

  _.assign( current, {
    "product_id": product_id || current.product_id,
    "limit": limit || current.limit,
    "for_recruiter": for_recruiter || current.for_recruiter,
    "for_leader": for_leader || current.for_leader,
    "for_saler": for_saler || current.for_saler
  } )

  return bonus.save()
}

const removeProductBonus = async bonus => await bonus.remove()

const findBonusByObjectId = async id => await ProductBonus.findById( id )

const findBonusByProduct = async product_id => await ProductBonus.findOne( { product_id } )

module.exports = {
  saveProductBonus,
  updateProductBonus,
  removeProductBonus,
  findBonusByObjectId,
  findBonusByProduct
}