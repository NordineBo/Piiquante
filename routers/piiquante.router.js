const express = require("express")
const {
  getPiiquante,
  createPiiquante,
  getPiiquanteById,
  deletePiiquante,
  modifyPiiquante,
  likePiiquante
} = require("../controllers/piiquante")
const { authenticateUser } = require("../middleware/auth")
const { upload } = require("../middleware/multer")
const piiquanteRouter = express.Router()
const bodyParser = require("body-parser")

piiquanteRouter.use(bodyParser.json())
piiquanteRouter.use(authenticateUser)

piiquanteRouter.get("/", getPiiquante)
piiquanteRouter.post("/", upload.single("image"), createPiiquante)
piiquanteRouter.get("/:id", getPiiquanteById)
piiquanteRouter.delete("/:id", deletePiiquante)
piiquanteRouter.put("/:id", upload.single("image"), modifyPiiquante)
piiquanteRouter.post("/:id/like", likePiiquante)

module.exports = { piiquanteRouter }
