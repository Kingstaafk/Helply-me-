import {v2 as cloudinary} from 'cloudinary'
import { nanoid } from 'nanoid';
import fs from "fs"
import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
})


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET
});


const cloudinaryUploader = async (localfilepath)=>{
    try{
     const response=  await cloudinary.uploader
        .upload(
            localfilepath, 
            {
                public_id: nanoid(),
                resource_type:"auto",
            }
        )    
        fs.unlinkSync(localfilepath)
        return response  
    }catch(error){
        fs.unlinkSync(localfilepath)   
      throw error
    }      
}    

export default cloudinaryUploader
