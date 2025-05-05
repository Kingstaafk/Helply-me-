import {Router} from "express";
import multerUploader from "../middlewares/multerUploader.js"

import placeOrder from "../controllers/placeOrder.controller.js";
import { identificationTokenAuth } from "../middlewares/identificationTokenAuth.js";
const userRoute = Router()

userRoute.route("/placeOrder").post(identificationTokenAuth,placeOrder)

export default userRoute

