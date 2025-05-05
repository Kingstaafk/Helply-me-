import {Router} from "express"
import userRegister from "../controllers/userRegister.controller.js"
import servicesDataProvider from "../controllers/frontend_requirements/servicesData.controller.js"
import multerUploader from "../middlewares/multerUploader.js"

const serviceRoute = Router()

serviceRoute.route("/register").post(multerUploader.fields([
    {
        name:"avatar",
        maxCount:1
    }
]),userRegister)

serviceRoute.route("/servicesData").get(servicesDataProvider)

export default serviceRoute