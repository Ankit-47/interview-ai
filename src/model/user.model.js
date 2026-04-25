const mangoose = require("mongoose")


const userSchema = new mangoose.Schema({
    username: {
        type: String,       
        unique: true, "username must be unique"
        required: true,
    },

    email: {
        type: String,
        unique: true, "email must be unique"
        required: true,
    },      

    password: {
        type: String,
        required: true,
    }
})

const userModel = mangoose.model("User", userSchema)