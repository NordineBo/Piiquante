const { app, express } = require("./server")
const { piiquanteRouter } = require("./routers/piiquante.router")
const { authRouter } = require("./routers/auth.router")
const port = 3000
const path = require("path")
const bodyParser = require("body-parser")

// Connection to database
require("./mongo")

// Middleware
app.use(bodyParser.json())
app.use("/api/piiquante", piiquanteRouter)
app.use("/api/auth", authRouter)

//Routes
app.get("/", (req, res) => res.send("Hello World!"))

// Listen
app.use("/images", express.static(path.join(__dirname, "images")))
app.listen(port, () => console.log("Listening on port " + port))
