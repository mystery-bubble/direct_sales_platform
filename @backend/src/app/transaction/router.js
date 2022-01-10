require("./model")
require("../transaction_content/model")
require("../employee/model")
require("../customer/model")
require("../customer_origin/model")

const controller = require("./controller")
const logger = require("../../utilities/logger")

const express = require("express");
const router = express.Router();

router.use( ( req, res, next ) => {
  logger.info( "Requset Type: Transaction" )
  next()
})

router.post( "/create", controller.create )
router.post( "/edit", controller.edit )
router.delete( "/remove", controller.remove )
router.get( "/:tid", controller.get )

module.exports = router