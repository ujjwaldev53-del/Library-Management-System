 require ("dotenv").config()
const connectDB = require("./config/db")
const app = require("./app")


  connectDB() .then( () =>
    app.listen(process.env.PORT , ()=>{
        console.log("app is working")
    })
 )

.catch((error) => {
    console.log("failed to load", error)
    process.exit(1)
})
