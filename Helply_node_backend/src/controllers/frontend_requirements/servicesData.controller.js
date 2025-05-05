import asyncHandler from "../../utils/asynchandler.js"
import Services from "../../models/services.model.js"

const servicesDataProvider = asyncHandler(async(req,res)=>{
    const groupedServices = await Services.aggregate([       
        {
            $group:{
                _id:"$catagory",
                services:{$push:"$$ROOT"}
            }
        },
        {
            $project:{
                catagory:"$_id",
                services:1,
                _id:0
            }
        }
    ])

    console.log(groupedServices)
    res.status(200)
    .send(groupedServices)
})

export default servicesDataProvider