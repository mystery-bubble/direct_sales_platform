const express = require("express")
const controller = require("./controller")

const router = express.Router()

router.post("/create/:type/:id", controller.create )
// router.post("/update/:type/:id", controller.fileUploader.single("image"), controller.update )
router.post("/remove/:type/:id", controller.remove )
router.get("/:type/:id", controller.get )

module.exports = router