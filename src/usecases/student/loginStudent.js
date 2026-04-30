const bcryptService = require("../../infrastructure/services/bcryptService");
const jwtServices = require("../../infrastructure/services/jwtServices");

class LoginStudent{
    constructor(studentRepo){
        this.studentRepo = studentRepo
    }

    async execute({email,password}){
        const user =  await this.studentRepo.findByEmail(email)
        if(!user|| user.role !== "user"){
            throw new Error("User not exist or access denied");
        }

        const isMatch = await bcryptService.comparePassword(password,user.password)
        if(!isMatch){
            throw new Error("Password not match");
            
        }
        const payload = {id:user._id,name:user.name,role:user.role}
        const accessToken = await jwtServices.generateAccessToken(payload)
        const refreshToken = await jwtServices.generateRefreshToken(payload)

        const userObj = user.toObject()
        delete userObj.password

        return {
            user : userObj,
            accessToken,
            refreshToken
        }
    }
}

module.exports = LoginStudent