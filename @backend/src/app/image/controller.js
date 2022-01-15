const multer = require("multer")
const path = require("path")
const { mkdirSync } = require("fs")
const { unlink } = require("fs/promises")

const repository = {
  product: require("../product/repository"),
  employee: require("../employee/repository")
}

var storage = multer.diskStorage({
  destination: function ( req, file, callback ) {
    let folder = `./storage/${ req.params.type }`
    mkdirSync( folder, { recursive: true } )

    callback( null, folder )
  },
  filename: function ( req, file, callback ) {
    callback( null, `${ req.params.id }.png` )
  }
})

const uploader = multer({ storage: storage, onError: function( err, next ) {
  console.error( err )
  next( err )
}})

exports.create = async ( req, res, next ) => {
  try {
    switch( req.params.type ) {
      case "product":
        if ( !!( await repository.product.findProductById( req.params.id ) ) ) {
          uploader.single("image")( req, {}, function() {
            res.success({ "message": `Image of ${ req.params.type } ( ${ req.params.id } ) create successfully.` })
          })
        }
        else {
          res.preconditionFailed({ "message": `Connot find target ${ req.params.type.toLowerCase() } using input id.` })
        }
        break
      case "employee":
        if ( !!( await repository.employee.findEmployeeById( req.params.id ) ) ) {
          uploader.single("image")( req, {}, function() {
            res.success({ "message": `Image of ${ req.params.type } ( ${ req.params.id } ) create successfully.` })
          })
        }
        else {
          res.preconditionFailed({ "message": `Connot find target ${ req.params.type.toLowerCase() } using input id.` })
        }
        break
      default:
        res.preconditionFailed({"message": "Unavailable type."})
        break
    }
  }
  catch ( err ) {
    console.log( err )
    res.send( err )
  }
}

exports.update = async ( req, res ) => {
  try {
    switch( req.params.type ) {
      case "product":
        if ( !!( await repository.product.findProductById( req.params.id ) ) ) {
          uploader.single("image")( req, {}, function() {
            res.success({ "message": `Image of ${ req.params.type } ( ${ req.params.id } ) update successfully.` })
          })
        }
        else {
          res.preconditionFailed({ "message": `Connot find target ${ req.params.type.toLowerCase() } using input id.` })
        }
        break
      case "employee":
        if ( !!( await repository.employee.findEmployeeById( req.params.id ) ) ) {
          uploader.single("image")( req, {}, function() {
            res.success({ "message": `Image of ${ req.params.type } ( ${ req.params.id } ) update successfully.` })
          })
        }
        else {
          res.preconditionFailed({ "message": `Connot find target ${ req.params.type.toLowerCase() } using input id.` })
        }
        break
      default:
        res.preconditionFailed({"message": "Unavailable type."})
        break
    }
  }
  catch ( err ) {
    console.log( err )
    res.send( err )
  }
}

exports.remove = async ( req, res ) => {
  try {
    let file = `../storage/${ req.params.type }/${ req.params.id }`
    await unlink( file )
    res.success({ "message": `Photo of ${ req.params.type } ( ${ req.params.id } ) remove successfully` })
  }
  catch ( err ) {
    console.error( err )
    res.send( err )
  }
}

exports.get = async ( req, res ) => {
  try {
    let folder = path.resolve( `./storage/${ req.params.type }/${ req.params.id }.png` )
    res.status(200).sendFile( folder )
  }
  catch ( err ) {
    console.error( err )
    res.send( err )
  }
}