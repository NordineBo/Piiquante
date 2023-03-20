const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    userId: String,
    name: String,
    manufacturer: String,
    description: String,
    mainPepper: String,
    imageUrl: String,
    heat: Number,
    likes: Number,
    dislikes: Number,
    userLiked: [String],
    userDisliked: [String]
})
const Product = mongoose.model("Product", productSchema)



function getPiiquante(req, res) {
    console.log("le token a été validé, nous sommes dans getPiiquante")
        // console.log("le token a l'air bon", decoded)
        Product.find({}).then(products => res.send(products))
        // res.send({ message: [{piiquante: "piiquante1"}, {piiquante: "piiquante2"}] })
    }

function creatPiiquante(req,res) {
    const piiquante = JSON.parse(req.body.piiquante)

    const {name, manufacturer, description, mainPepper, heat, userId} = piiquante
    console.log('piiquante:', piiquante)


    console.log({ body: req.body.piiquante })
    console.log({ file: req.file })
    const imageUrl = req.file.destination + req.file.filename

    const product = new Product({
        userId,
        name,
        manufacturer,
        description,
        mainPepper,
        imageUrl,
        heat,
        likes: 0,
        dislikes: 0,
        userLiked: [],
        userDisliked: []
    })
    product.save().then((res)=> console.log("produit enregistré", res)).catch(console.error)
}

module.exports = { getPiiquante, creatPiiquante }