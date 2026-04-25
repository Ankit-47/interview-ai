require("dotenv").config({ path: "./src/.env" })  // ✅ explicit path
const app = require("./app")
const connectToDB = require("./config/database")    
connectToDB()
app.listen(3000, () => {
    console.log("Server is running in port 3000")
})