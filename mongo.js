const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")

const password = process.env.DB_PASSWORD
const username = process.env.DB_USER
const db = process.env.DB_NAME
const uri = `mongodb+srv://${username}:${password}@cluster0.ismex1a.mongodb.net/${db}?retryWrites=true&w=majority`

mongoose
.connect(uri)
.then(()=> console.log("Connected to Mongo!"))
.catch(err => console.error("Error connecting to Mongo: ", err))

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true}
})
userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema)

module.exports = {mongoose, User} 