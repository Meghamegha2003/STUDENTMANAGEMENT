const jwtServices = require("../../infrastructure/services/jwtServices");
const STATUS_CODES = require("../../utils/statusCodes")

const authMiddleware = (req,res,next)=>{
    
    try {

         const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                success: false,
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                success: false,
                message: "Invalid token format"
            });
        }
         
        const decode = jwtServices.verifyAccessToken(token)
        req.user = decode
        next()
    } catch (error) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({success:false,message:"Invalid or expired token"})
    }
}

module.exports = authMiddleware