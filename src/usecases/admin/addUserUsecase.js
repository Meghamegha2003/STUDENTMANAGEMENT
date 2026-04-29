const bcryptService = require("../../infrastructure/services/bcryptService");

class AddUserUsecase {
    constructor(adminRepo){
        this.adminRepo = adminRepo
    }

    async execute({email,name,password}){
        const exist = await this.adminRepo.findByEmail(email)
        if(exist){
            throw new Error("Student already exists");
        }
        
        const hashedPassword = await bcryptService.hashPassword(password)
        const student = await this.adminRepo.create({
            name,
            email,
            password:hashedPassword,
        })

        const studentObj  = student.toObject()
        delete studentObj.password
        return studentObj 
    }

}


module.exports = AddUserUsecase