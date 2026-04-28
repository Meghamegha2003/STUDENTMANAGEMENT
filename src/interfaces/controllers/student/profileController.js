const GetProfileUsecase = require("../../../usecases/student/getProfileUsecase");
const UpdateProfileUsecase = require("../../../usecases/student/updateProfileUsecase");
const STATUS_CODES = require("../../../utils/statusCodes");

class ProfileController {
  constructor(studentRepo) {
    this.getProfileUsecase = new GetProfileUsecase(studentRepo);
    this.updateProfileUsecase = new UpdateProfileUsecase(studentRepo)
  }

  async getProfile(req, res) {
    try {
      const result = await this.getProfileUsecase.execute(req.user._id);
      return res.json({ status: true, data: result });
    } catch (error) {
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const result = await this.updateProfileUsecase.execute(req.user._id, req.body);
      return res
        .status(STATUS_CODES.OK)
        .json({
          success: true,
          message: "profile updated successfully",
          data: result,
        });
    } catch (error) {
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  }
}


module.exports = ProfileController