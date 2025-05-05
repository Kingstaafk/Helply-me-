import {Router} from "express";
import addService from "../controllers/addService.controller.js";
import multerUploader from "../middlewares/multerUploader.js";
import clearCloudinary from "../utils/clearCloudinary.js";

const adminRoute = Router()

adminRoute.route("/addService").post(multerUploader.fields([
    {
        name:"logo",
        maxCount:1
    }
]),addService)


// !! WARNING !! -> all logo and avatar data from cloudinary will be deleted permanently
adminRoute.route("/clearCloudImageData").get(clearCloudinary)



export default adminRoute

