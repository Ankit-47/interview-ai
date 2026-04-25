const userModel = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

/**
 * @routes registerUserController
 * @description Controller to handle user registration
 * @access Public
 */


async function registerUserController(req, res) {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const existingUser = await userModel.findOne({ email })

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" })
    } 

    const hash = await bcrypt.hash(password, 10)
    const newUser = new userModel({
        username,
        email,
        password: hash
    })

    await newUser.save()
    const token = jwt.sign(
                { id: newUser._id },
                  process.env.JWT_SECRET, 
                 {expiresIn: "1d" }
    )

    res.cookie("token", token, )

    res.status(201).json({
         message: "User registered successfully",   
         user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
         },
         token
    })    

}

/**
 * @routes loginUserController
 * @description Controller to handle user login
 * @access Public
 */

async function loginUserController(req, res) {      
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({ 
        message: "All fields are required" 
    })
    }

    const IsPasswordValid = await bcrypt.compare(password, user.password)
    if (!IsPasswordValid) {
        return res.status(400).json({ 
            message: "Invalid credentials"
     })
    }

    const token = jwt.sign(
        { id: user._id },
          process.env.JWT_SECRET, 
        {expiresIn: "1d" }
    )   
    res.cookie("token", token, )
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        },
    })

}

module.exports = {
    registerUserController,
    loginUserController
}