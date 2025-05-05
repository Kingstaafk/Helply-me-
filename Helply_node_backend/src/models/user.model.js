import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firebaseId:{
        type:String,
        // required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    token:{
        type:String
    }

},{timestamps:true})

const User = mongoose.model("User",userSchema)

export default User