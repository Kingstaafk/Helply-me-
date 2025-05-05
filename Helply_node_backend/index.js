import dotenv from "dotenv"
import DB_Connect from "./src/DB/index.js"
import app from "./app.js"

dotenv.config({
    path:"./.env"
})

DB_Connect().
then(()=>{   
    app.on("error",(error)=>{
        console.log("Error: ",error)
        throw error
    })
    
        app.listen(process.env.PORT,()=>{
            console.log(`⚙️  Server listening at port:`,process.env.PORT)
        })
})
.catch((error)=>{
    console.log("Database connection failed. Error:",error)
})


app.get("/",(req,res)=>{
    res.send("database is connected successfully")
})

export default app
