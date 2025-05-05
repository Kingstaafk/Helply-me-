import Services from "../models/services.model.js"
import cloudinaryUploader from "../utils/cloudinaryUploader.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/apiResponse.js"
import asyncHandler from "../utils/asynchandler.js"


const addService = asyncHandler(async(req,res)=>{

  const {name, price,desc,catagory}=req.body
  if(!name || !price || !desc || !catagory){
    throw new ApiError(403,"All fields are required")
  }

  const logoLocalpath= req.files?.logo?.[0]?.path
  if(!logoLocalpath){
    throw new ApiError(403,"Logo is required")
  }

  const servicePre_exists = await Services.findOne({
    name:name.toLowerCase()
  })

  if(servicePre_exists){
    throw new ApiError(401, "Service already exists")
  }
  // checks completed

  const logoCloud = (await cloudinaryUploader(logoLocalpath)).url
  if(!logoCloud){
    throw new ApiError(501,"Image upload on cloud failed! Please try again")
  }

  const newService = await Services.create({
    name:name.trim(),price,desc:desc.trim(),
    logo:logoCloud,
    catagory:catagory.trim()
  })

  if(!newService){
    throw new ApiError(504, "Server Error: New service creation failed! Please try again")
  }

  res.status(201)
  .json(new ApiResponse(
    newService,
    "new service added successfully",
    201
  ))

})

export default addService




