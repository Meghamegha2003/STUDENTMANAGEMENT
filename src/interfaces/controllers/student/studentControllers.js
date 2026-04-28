const LoginStudent = require("../../../usecases/student/loginStudent");
const RegisterStudent = require("../../../usecases/student/registerStudent");
const STATUS_CODES = require("../../../utils/statusCodes");

class StudentController {
    constructor(studentRepo){
        this.registerStudent = new RegisterStudent(studentRepo)
        this.loginStudent = new LoginStudent(studentRepo)
    }

    async register(req,res){
        try {
            const result = await this.registerStudent.execute(req.body)
            return res.status(STATUS_CODES.CREATED).json({success:true, data:result})
        } catch (error) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({success:false, message: error.message });
        }
    }

    async login(req,res){
        try {
            const result = await this.loginStudent.execute(req.body)
            return res.status(STATUS_CODES.OK).json({success:true, data:result})
        } catch (error) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({success:false, message:error.message})
        }
    }
}

module.exports = StudentController