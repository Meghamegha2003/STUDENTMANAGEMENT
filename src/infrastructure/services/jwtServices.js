const jwt = require("jsonwebtoken")

class jwtService {
    generateAccessToken(payload){
        return jwt.sign(payload,process.env.JWT_ACCESS_SECRET,{
            expiresIn:"15m"
        })
    }

    generateRefreshToken(payload){
        return jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{
            expiresIn:"7d"
        })
    }

    verifyAccessToken(token){
        return jwt.verify(token,process.env.JWT_ACCESS_SECRET)
    }

    verifyRefreshToken(token){
        return jwt.verify(token,process.env.JWT_REFRESH_SECRET)
    }
}

module.exports= new jwtService()