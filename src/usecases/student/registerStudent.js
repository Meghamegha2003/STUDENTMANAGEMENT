const bcryptService = require("../../infrastructure/services/bcryptService");

class RegisterStudent {
    constructor(studentRepo){
        this.studentRepo = studentRepo
    }

    async execute({name,email,password}){
       const existStd = await this.studentRepo.findByEmail(email)
       if(existStd){
        throw new Error("User already exist");
       }

       const hashedPassword = await bcryptService.hashPassword(password)
       
       const student = await this.studentRepo.create({
        name,
        email,
        password:hashedPassword,
        profileImg
       })

       const userObj = student.toObject()
       delete userObj.password
       return userObj

    }
}

module.exports = RegisterStudent