const GetHomeUsecases = require("../../../usecases/student/getHomeUsecases");
const STATUS_CODES = require("../../../utils/statusCodes");

class GetHomeController{
    constructor(studentRepo){
        this.getHomeUsecase = new GetHomeUsecases(studentRepo)
    }

    async getHome(req,res){
        try {
            const result = await this.getHomeUsecase.execute(req.user.id)
            return res.status(STATUS_CODES.OK).json({
                success:true,
                message:"Home accessed successfully",
                data:result
            })
        } catch (error) {
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
        }
    }
}

module.exports = GetHomeController