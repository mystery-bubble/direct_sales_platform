const mongoose = require("mongoose")
const _ = require("lodash")

const Product = mongoose.model("Product")

const saveProduct = async data => {
  const product = new Product( data )
  return product.save()
}

const updateProduct = async ( product, data ) => {
  const { name, description } = data ;
  const current = product

  _.assign( current, {
    "name": name || current.name,
    "description": description || current.description
  } )

  return product.save()
}

const removeProduct = async product => await product.remove()

const findProductById = async id => await Product.findById( id )

const findProductbyName = async name => await Product.findOne( { name } )

const findAllProduct = async () => await Product.find()

module.exports = {
  saveProduct,
  updateProduct,
  removeProduct,
  findProductById,
  findProductbyName,
  findAllProduct
}