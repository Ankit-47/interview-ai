const mangoose = require("mongoose")


const userSchema = new mangoose.Schema({
    username : {
        type: String,       
        unique: true,
        required: true,
    },

    email: {
        type: String,
        unique: true, 
        required: true,
    },      

    password: {
        type: String,
        required: true,
    }
})

const userModel = mangoose.model("User", userSchema)

module.exports = userModel  