import jwt from "jsonwebtoken"

const generateUserToken = (user)=>{
    return jwt.sign(
        {
            _id:user._id,
            username:user.username
        },
        process.env.USERTOKEN_SECRET,
        {
            expiresIn:process.env.USERTOKEN_EXPIRY
        }
    )
}
export default generateUserToken