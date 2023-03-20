require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")
const port = 3000
const multer = require("multer")
const bodyParser = require("body-parser")
const path = require('path')

//Connection to database
require("./mongo")

//Controllers
const { creatUser, logUser } = require("./controllers/users")
const { getPiiquante, creatPiiquante } = require("./controllers/piiquante")


//Middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json)
app.use(express.static("/images"))

const {authenticateUser} = require("./middleware/authenticate")
const multer = require("multer")
const multer = require('multer')
const storage = multer.diskStorage({destination: "images/", filename: makeFilename})
const upload = multer({ storage: storage })

function makeFilename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
}

//Routes

app.post("/api/auth/signup", creatUser)
app.post("/api/auth/login", logUser)
app.get("/api/piiquante", authenticateUser, getPiiquante)
app.post("/api/piiquante", authenticateUser, upload.single("image"), creatPiiquante)
app.get("/", (req, res) => res.send("Hello World!"))


//Listen
app.listen(port, ()=> console.log("Listening on port" + port))

