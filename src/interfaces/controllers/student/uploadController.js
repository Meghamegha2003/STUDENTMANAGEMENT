const DeleteFileUsecase = require("../../../usecases/student/deleteFileUsecase");
const UploadFileUsecase = require("../../../usecases/student/uploadFileUsecase");
const STATUS_CODES = require("../../../utils/statusCodes");

class UploadController {
  constructor(fileRepo) {
    this.uploadFileUsecase = new UploadFileUsecase(fileRepo);
    this.deleteFileUsecase = new DeleteFileUsecase(fileRepo);
  }

  uploadImg = async (req, res) => {
    try {
      const result = await this.uploadFileUsecase.execute(req.file);
      return res
        .status(STATUS_CODES.OK)
        .json({ success: true, message: "image upload successfully" ,data:result});
    } catch (error) {
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  };

  async deleteImg(req, res) {
    try {
      const { publicId } = req.params;
        if (!publicId) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          success: false,
          message: "publicId is required"
        });
      }
      const result = await this.deleteFileUsecase.execute(publicId);
      return res
        .status(STATUS_CODES.OK)
        .json({ success: true, ...result });
    } catch (error) {
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  }
}

module.exports = UploadController;
