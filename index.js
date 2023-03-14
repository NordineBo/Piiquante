require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")
const port = 3000

//Connection to database
require("./mongo")

//Controllers
const { creatUser, logUser } = require("./controllers/users")
const { getPiiquante } = require("./controllers/piiquante")

//Middleware
app.use(cors())
app.use(express.json())

//Routes

app.post("/api/auth/signup", creatUser)
app.post("/api/auth/login", logUser)
app.get("/api/piiquante", getPiiquante)
app.get("/", (req, res) => res.send("Hello World!"))


//Listen
app.listen(port, ()=> console.log("Listening on port" + port))

