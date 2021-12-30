const mongoose = require("mongoose")
const _ = require("lodash")

const Product = mongoose.model("Product")

const saveProduct = async data => {
  const product = new Product( data )
  return await product.save()
}

const updateProduct = async ( product, data ) => {
  const { name, description } = data ;
  const current = product

  _.assign( current, {
    "name": name || current.name,
    "description": description || current.description,
  } )

  return await product.save()
}

const removeProduct = async product => await product.remove()

const findProductByObjectId = async id => await Product.findById( id )

const findProductById = async id => await Product.findOne( { id } )

const findProductbyName = async name => {
  return await Product.find(
    {
      name: { 
        $text: {
          $search: name
        }
      }
    }
  )
}

const findAllProduct = async () => await Product.find()

module.exports = {
  saveProduct,
  updateProduct,
  removeProduct,
  findProductByObjectId,
  findProductById,
  findProductbyName,
  findAllProduct
}