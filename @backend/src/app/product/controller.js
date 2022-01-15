const _ = require("lodash")
const uuid = require("uuid")

const logger = require("../../utilities/logger")
const repository = {
  ...require("./repository"),
  product_type: require("../product_type/repository"),
  product_bonus: require("../product_bonus/repository")
}

exports.create = async ( req, res ) => {
  try {
    logger.info( "Method: create" )
    if ( !req.body.info.id ) {
      req.body.info.id = uuid.v4()
    }
    const savedProduct = await repository.saveProduct( req.body.info )
    await repository.product_bonus.saveProductBonus( savedProduct._id, req.body.bonus )
    for ( let index in req.body.types ) {
      req.body.types[ index ].id = uuid.v5( "type", req.body.info.id ) + `-${ index }`
      await repository.product_type.saveProductType( savedProduct._id, req.body.types[ index ] )
    }

    res.success( { "message": "Product create successfully." } )
  }
  catch ( err ) {
    // res.send( err )
    console.log( err )
  }
}

exports.remove = async ( req, res ) => {
  try {
    const target = await repository.findProductById( req.body.id )
    const target_types = await repository.product_type.findAllTypesOfProduct( target._id )
    const target_bonus = await repository.product_bonus.findBonusByProduct( target._id )

    if ( _.isEmpty( target ) ) {
      res.notFound()
    }
    else {
      const deletedProduct = await repository.removeProduct( target )
      for ( let type of target_types ) {
        await repository.product_type.removeProductType( type )
      }
      await repository.product_bonus.removeProductBonus( target_bonus )

      res.success( { "message": "Product remove successfully.", "target": deletedProduct } )
    }
  }
  catch ( err ) {
    res.send( err )
  }
}

exports.search = async ( req, res ) => {
  try {
    let results = await repository.findAllProduct()
    let pharse = req.query.s
    if ( !pharse ) {
      results = await repository.findProductbyName( pharse )
    }
    results = results.map( function( element ) {
      return element.toObject()
    } )
    for ( let result of results ) {
      let range = { 
        min: Infinity,
        max: -Infinity
      }
      let result_types = await repository.product_type.findAllTypesOfProduct( result._id )
      for ( let type of result_types ) {
        if ( type.purchase_price < range.min ) {
          range.min = type.purchase_price
        }
        if ( type.purchase_price > range.max ) {
          range.max = type.purchase_price
        }
      }
      result.price = range
    }
    res.success( results )
  }
  catch ( err ) {
    res.send( err )
    console.log( err )
  }
}

exports.info = async ( req, res ) => {
  try {
    const product_id = req.query.pid || req.body.product_id || req.params.pid ;
    var target = await repository.findProductById( product_id )
    target = target.toObject()
    var target_types = await repository.product_type.findAllTypesOfProduct( target._id )
    target.types = target_types
    res.success( target )
  }
  catch ( err ) {
    res.send( err )
  }
}

exports.edit = async ( req, res ) => {
  try {
    const target = await repository.findProductById( req.body.id )
    const target_bonus = await repository.product_bonus.findBonusByProduct( target._id )
    const every_type = await repository.product_type.findAllTypesOfProduct( target._id )

    var lastTypeID = every_type[ every_type.length - 1 ].id.split("-")
    var lastIndex = parseInt( lastTypeID[ lastTypeID.length - 1 ] )   

    let type = req.query.type || req.params.type
    switch( type ) {
      case "info":
        await repository.updateProduct( target, req.body.data )
      case "types":
        for ( let index in req.body.data.remove ) {
          let need_delete = await repository.product_type.findTypeById( req.body.data.remove[ index ] )
          if ( need_delete ) {
            await repository.product_type.removeProductType( need_delete )
          }
        }
        for ( let index in req.body.data.add ) {
          req.body.data.add[ index ].id = uuid.v5( "type", target.id ) + `-${ lastIndex + parseInt( index ) + 1 }`
          await repository.product_type.saveProductType( target._id, req.body.data.add[ index ] )
        }
      case "bonus":
        await repository.product_bonus.updateProductBonus( target_bonus, req.body.data )
    }

    res.success( { "message": `Product ${ type } update successfully.` } )
  } 
  catch ( err ) {
    res.send( err )
    console.log( err )
  }
}