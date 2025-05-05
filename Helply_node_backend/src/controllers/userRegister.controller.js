import asyncHandler from "../utils/asynchandler.js"
import ApiError from "../utils/ApiError.js"
import User from "../models/user.model.js"
import cloudinaryUploader from "../utils/cloudinaryUploader.js"
import ApiResponse from "../utils/apiResponse.js"
import generateUserToken from "../utils/userTokenGenerator.js"

const userRegister = asyncHandler(async(req,res)=>{
    const {fullname,username,email="",phone,firebaseUserid}=req.body

    if(!fullname || !username || !phone || !firebaseUserid){
        throw new ApiError(401, "Either fullname, username or phone is missing")
    }

    const alreadyExistedUser = await User.findOne({username})
    if(alreadyExistedUser){
        throw new ApiError(402, "User already exists")
    }

    const avatarlocalpath = req.files?.avatar?.[0].path
    let avatarCloud=""
    if(avatarlocalpath){
        avatarCloud = (await cloudinaryUploader(avatarlocalpath)).url
    }

    const newUser = await User.create({
        fullname,username:username.toLowerCase(),phone,email,
        avatar:avatarCloud,
        token:""
    })

    const userIdentificationToken = generateUserToken(newUser)
    newUser.token = userIdentificationToken
    await newUser.save()

    if(!newUser){
        throw new ApiError(504, "Server Error: New user creation failed! Please try again")
    }

    const cookieOptions ={
        httpOnly:true,
        secure:true
    }

    res.cookie("userIdentificationToken",userIdentificationToken,cookieOptions)
    .status(201)
    .json(new ApiResponse(newUser,"User added successfully",201))

})

export default userRegister