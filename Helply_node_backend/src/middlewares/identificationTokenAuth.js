import jwt from "jsonwebtoken"
import generateUserToken from "../utils/userTokenGenerator.js"
import User from "../models/user.model.js"

const identificationTokenAuth = (req,_,next)=>{
    const token = req.cookies?.userIdentificationToken
    if(!token){
        console.log("Identification token not available")
        next()
    }
    const decodedToken = jwt.verify(token,process.env.USERTOKEN_SECRET)
    req.userid=decodedToken._id
    next()  
}

export {identificationTokenAuth}