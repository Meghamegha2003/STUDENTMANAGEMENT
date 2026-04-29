const bcryptService = require("../../infrastructure/services/bcryptService");
const jwtServices = require("../../infrastructure/services/jwtServices");

class AdminLoginUsecase {
    constructor(adminRepo){
        this.adminRepo = adminRepo
    }

    async execute({email,password}){
        const admin = await this.adminRepo.findByEmail(email)
        if(!admin){
            throw new Error(" Admin not exist");
        }

        const isMatch = await bcryptService.comparePassword(password,admin.password)
        if(!isMatch){
            throw new Error("Incorrect Password");
        }

        const payload = {id:admin._id,name:admin.name,role:admin.role}
        const accessToken = await jwtServices.generateAccessToken(payload)
        const refreshToken = await jwtServices.generateRefreshToken(payload)

        const adminObj = admin.toObject()
        delete adminObj.password
        return{
            admin:adminObj,
            accessToken,
            refreshToken
        }
    }
}

module.exports = AdminLoginUsecase