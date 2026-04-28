const DeleteFileUsecase = require("../../../usecases/student/deleteFileUsecase");
const UploadFileUsecase = require("../../../usecases/student/uploadFileUsecase");
const STATUS_CODES = require("../../../utils/statusCodes");

class UploadController {
    constructor(fileRepo){
        this.uploadFileUsecase = new UploadFileUsecase(fileRepo)
        this.deleteFileUsecase = new DeleteFileUsecase(fileRepo)
    }

     uploadImg=async (req,res)=> {
        try {
            const result = this.uploadFileUsecase.execute(req.file)
            return res.status(STATUS_CODES.OK).json({success:true,message:"image upload successfully"})
        } catch (error) {
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
        }
    }

    async deleteImg(req,res){
        try {
            const result = this.deleteFileUsecase.execute(req.body)
            return res.status(STATUS_CODES.OK).json({success:true, message:"image deleted successfully"})
        } catch (error) {
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
        }
    }

}

module.exports = UploadController