const jwt = require("jsonwebtoken")

function getPiiquante(req, res){
    const header = req.header("Authorization")
    if (header == null) return res.status(403).send({ message: "Invalid" })

    const token = header.split(" ")[1]
    if (token == null) return res.status(403).send({ message: "Token cannot be null" })

    jwt.verify(token, process.env0JWT_PASSWORD, (err, decoded) => handleToken(err, decoded, res))

    
}

function handleToken(err, decoded, res) {
    if (err) res.status(403).send({ message: "Token invalid " + err })
    else {
        console.log("le token a l'air bon", decoded)
        res.send({ message: "ok voici tous les plats "})
    }
}

module.exports = {getPiiquante}