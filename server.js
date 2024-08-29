const express=require("express");
require('dotenv').config();

const reporterRouter = require("./router/reporterRouter")
const userRouter = require('./router/userRouter')

require("./config/dataBase");

const app = express()
app.use(express.json())

// app.use("/api", userRouter)
// app.use("/api", reporterRouter)

const PORT=process.env.PORT||2025
app.listen(PORT,()=>{
console.log(`app is running on port:${PORT}`)
})
app.get("/",(req,res)=>{
res.status(200).json({message:"welcome"})
})
