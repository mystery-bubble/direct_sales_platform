require("./model")
require("../employee_rewards/model")
require("../employee_relations/model")

const controller = require("./controller")
const logger = require("../../utilities/logger")

const express = require("express");
const router = express.Router();

router.use( ( req, res, next ) => {
  logger.info( "Requset Type: Employee" )
  next()
})

router.post( "/create", controller.create )
router.post( "/edit", controller.edit )
router.delete( "/remove", controller.remove )
router.get( "/", controller.get )

module.exports = router