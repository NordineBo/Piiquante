const {User} = require("../mongo")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function creatUser(req, res) {
    try { 
        const { email, password } = req.body
        const hashedPassword = await hashPassword(password)
        const user = new User({ email, password: hashedPassword })
        await user.save()
        res.status(201).send({ message: "Utilisateur enregistré !" })
    } catch (err){
        res.status(409).send({ message: "User pas enregistré :" + err })
    }
}
    

    function hashPassword(password) {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds)
    }

    async function logUser(req, res) {
        try{ 
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({email: email})

        const isPasswordOK = await bcrypt.compare(password, user.password)
        if (!isPasswordOK) {
            res.status(403).send({ message: "Mot de passe incorect" })
        }
        
        const token = createToken(email)
        res.status(200).send({ userId: user?._id, token: token })
    } catch (err){
        console.error(err)
        res.status(500).send({ message: "Erreur interne"})
    }

}

    function creatToken(email) {
        const jwtPassword = process.env.JWT_PASSWORD
        return jwt.sign({email: email}, "salut", {expiresIn: "24h"})
    }

    module.exports = { creatUser, logUser }