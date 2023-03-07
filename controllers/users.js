const {User} = require("../mongo")

function creatUser(req, res) {
        const { email, password } = req.body
        const user = new User({ email, password })
    
    user
        .save()
        .then(() => res.send({ message: "Utilisateur enregistré !" }))
        .catch((err) => console.log("User pas enregistré", err))
    }

    module.exports = {creatUser}