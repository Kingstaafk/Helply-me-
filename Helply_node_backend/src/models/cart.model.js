import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    orderedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderDetail:[
        {
            service:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Services",
                required: true
            },
            catagory:{
                type:String,
                required:true
            },
            totalPrice:{
                type:Number
            },
            delivered:{
                type:Boolean,
                required:true,
                default:false
            }
        }
    ],
    orderTotal:{
        type:Number,
        required:true
    }
},{timestamps:true})

const Cart = mongoose.model("Cart",cartSchema)
export default Cart