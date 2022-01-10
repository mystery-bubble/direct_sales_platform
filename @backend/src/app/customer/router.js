require("./model")
require("../customer_origin/model")

const controller = require("./controller")
const logger = require("../../utilities/logger")

const express = require("express");
const router = express.Router();

router.use( ( req, res, next ) => {
  logger.info( "Requset Type: Customer" )
  next()
})

router.post( "/create", controller.create )
router.get( "/", controller.get )

module.exports = router