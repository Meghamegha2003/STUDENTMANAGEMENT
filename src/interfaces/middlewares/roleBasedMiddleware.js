const STATUS_CODES = require("../../utils/statusCodes")

const roleBasedMiddleware = (...roles)=>{
        return (req,res,next)=>{
            if(!req.user){
                return res.status(STATUS_CODES.UNAUTHORIZED).json({success:false,message:"UNAUTHORIZED"})
            }

            if(!roles.includes(req.user.role)){
                return res.status(STATUS_CODES.UNAUTHORIZED).json({success:false,message:"Access denied: you do not have permission to access this resource"})
            }

            next()
        }
}

module.exports = roleBasedMiddleware