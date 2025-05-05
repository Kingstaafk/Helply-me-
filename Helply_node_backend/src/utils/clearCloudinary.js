import {v2 as cloudinary} from 'cloudinary'
import dotenv from "dotenv"
import asyncHandler from './asynchandler.js';

dotenv.config({
    path:"./.env"
})


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const clearCloudinary = asyncHandler(async(req,res)=>{
   (await cloudinary.api.delete_all_resources())
   .then(()=>{
    res.status(209)
    .json({message:"Cloudinary Clear"})
   })
})

export default clearCloudinary
