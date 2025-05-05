import Cart from "../models/cart.model.js"
import User from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/apiResponse.js"
import asyncHandler from "../utils/asynchandler.js"

const placeOrder = asyncHandler(async(req,res)=>{

    let orderedBy = req.userid   // if token were there in cookies
    if(!orderedBy){
        orderedBy = req.params.username
        const user = await User.findOne({username:orderedBy})
        orderedBy=user?._id
    }
    let {orderDetail,orderTotal} = req.body

    if(!orderedBy || !orderDetail || !orderTotal){
       throw new ApiError(401,"Either orderedby or orderDetails or orderTotal is missing") 
    }
    // if(Array.isArray(orderDetail)){
    //     throw new ApiError(409, "orderDetail must be an array")
    // }

    const order = await Cart.create({
        orderedBy,orderDetail,orderTotal
    })
    if(!order){
        throw new ApiError(504, "Internal server error, please try again")
    }

    res.status(201)
    .json(new ApiResponse(order,"order Placed",201))

})

export default placeOrder