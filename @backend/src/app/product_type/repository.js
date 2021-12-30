const mongoose = require("mongoose")
const uuid = require("uuid")
const _ = require("lodash")

const ProductType = mongoose.model("ProductType")

const saveProductType = async ( product_id, data ) => {
  data.product_id = product_id
  const type = new ProductType( data )
  return type.save()
}

const updateProductType = async ( type, data ) => {
  const { title, inventory, purchase_price, selling_price } = data ;
  const current = type

  _.assign( current, {
    "title": title || current.title,
    "inventory": inventory || current.inventory,
    "purchase_price": purchase_price || current.purchase_price,
    "selling_price": selling_price || current.selling_price
  } )

  return type.save()
}

const removeProductType = async type => await type.remove()

const findAllTypesOfProduct = async product_id => await ProductType.find( { product_id } ).sort({ id: 1 })

const findTypeByObjectId = async id => await ProductType.findById( id )

const findTypeById = async id => await ProductType.findOne( { id } )

module.exports = {
  saveProductType,
  updateProductType,
  removeProductType,
  findAllTypesOfProduct,
  findTypeByObjectId,
  findTypeById
}