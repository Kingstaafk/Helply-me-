import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cookieParser())
app.use(cors({
    origin:[process.env.CLIENT_URL, `http://localhost:${process.env.PORT}`],
    credentials:true,
    methods:['GET','POST','PUT']
}))

app.use(express.json({limit:"10Kb"}))
app.use(express.urlencoded({limit:"10kb",extended:true}))


import userRoute from "./src/routes/userRoutes.js"
import adminRoute from "./src/routes/adminRoutes.js"
import serviceRoute from "./src/routes/serviceRoutes.js"

app.use("/api/v1/users",userRoute)
app.use("/api/v1/admin",adminRoute)
app.use("/api/v1/service",serviceRoute)

app.use((err,req,res,next)=>{
  res.status(err.statusCode || 500).json({
      success:false,
      statusCode:err.statusCode||500,
      message:err.message
  })
})

export default app