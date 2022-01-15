const _ = require("lodash")

const repository = {
  ...require("./repository"),
  customer_origin: require("../customer_origin/repository")
}

exports.create = async ( req, res ) => {
  try {
    const remote_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const savedCustomer = await repository.saveCustomer( req.body )
    await repository.customer_origin.saveCustomerOrigin( savedCustomer._id, {
      origin_network_address: remote_address
    })
  
    res.success( { "message": "Customer create successfully.", "cid": savedCustomer._id } )
  }
  catch ( err ) {
    console.log( err )
    res.send( err )
  }
}

exports.get = async ( req, res ) => {
  try {
    const remote_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const by = req.query.by || req.body.by
    var results = []
  
    switch( by ) {
      case "address":
        results = await repository.customer_origin.findCustomerOriginByAddress( remote_address )
        results = results.map( element => {
            return { ...element.customer_id.toObject(), address: element.origin_network_address, used_count: element.used_count }
        }) 
        break
      case "phone":
        results.push( await repository.findCustomerByPhone( req.body.phone ) )
        break
    }

  
    res.success( results )
  }
  catch ( err ) {
    console.log( err )
    res.send( err )
  }

}