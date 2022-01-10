require("./model")
require("../product_type/model")
require("../product_bonus/model")

const controller = require("./controller")
const logger = require("../../utilities/logger")

const express = require("express");
const router = express.Router();

router.use( ( req, res, next ) => {
  logger.info( "Requset Type: Product" )
  next()
} )

router.post( "/create", controller.create )
router.post( "/edit", controller.edit )
router.post( "/edit/:type", controller.edit )
router.delete( "/remove", controller.remove )
router.get( "/search", controller.search )
router.get( "/:pid", controller.info )
router.get( "/", controller.info )

module.exports = router