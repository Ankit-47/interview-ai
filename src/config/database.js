const mangoose = require("mongoose")


async function connectToDB() {
   try {
        await mangoose.connect(process.env.MONGO_URI)

        console.log("Connected to MongoDB")
    }
    catch (err) {
        console.log(err)
    }
}    

module.exports = connectToDB
 