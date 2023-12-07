const express = require("express")
require("dotenv").config()
const {connection} = require("./config/db")
const { userRouter } = require("./routes/user.route")
const { doctorRouter } = require("./routes/doctor.route")
const cors = require("cors")



const app = express()
app.use(express.json())
app.use(cors())

app.use("/api",userRouter)
app.use("/api",doctorRouter)

app.get("/",(req,res)=>{
    res.send("Welcome to The masai Hospitals")
})


app.listen(process.env.PORT,async()=>{
    try{
           await connection
           console.log("Connected to the db")
    }
    catch(err){
        console.log("Not connected")
    }
    console.log(`port is running at the ${process.env.PORT}`)
})
