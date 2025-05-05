import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    price:{
        type:Number,
        required:true
    },
    
    desc:{
        type:String,
        required:true
    },
    catagory:{
        type:String,
        required:true,
        lowercase:true
    },

    logo:{
        type:String,
        required:true
    }
},{timestampstamps:true})

const Services = mongoose.model("Services",serviceSchema)
export default Services