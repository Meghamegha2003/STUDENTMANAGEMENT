const AddUserUsecase = require("../../../usecases/admin/addUserUsecase");
const AdminLoginUsecase = require("../../../usecases/admin/adminLoginUsecase");
const DeleteUserUsecase = require("../../../usecases/admin/deleteUserUsecase");
const GetDashboardUsecase = require("../../../usecases/admin/getDashboardUsecase");
const SearchUsecase = require("../../../usecases/admin/searchUsecase");
const UpdateProfileUsecase = require("../../../usecases/student/updateProfileUsecase");
const STATUS_CODES = require("../../../utils/statusCodes");

class AdminControllers {
  constructor(adminRepo) {
    this.adminLoginUsecase = new AdminLoginUsecase(adminRepo);
    this.searchUsecase = new SearchUsecase(adminRepo);
    this.getDashboardUsecase = new GetDashboardUsecase(adminRepo);
    this.addUsecase = new AddUserUsecase(adminRepo);
    this.updateUsecase = new UpdateProfileUsecase(adminRepo);
    this.deleteUsecase = new DeleteUserUsecase(adminRepo);
  }

  async loginAdmin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(STATUS_CODES.BAD_REQUEST).json({
          success: false,
          message: "All fields are required",
        });
      }

      const result = await this.adminLoginUsecase.execute(req.body);
      return res
        .status(STATUS_CODES.OK)
        .json({
          success: true,
          message: "Admin login successfully",
          data: result,
        });
    } catch (error) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ success: false, message: error.message });
    }
  }

  async getDashboard(req, res) {
    try {
      const result = await this.getDashboardUsecase.execute();
      return res.status(STATUS_CODES.OK).json({ success: true, data: result });
    } catch (error) {
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  }

  async searchUser(req, res) {
    try {
      const { name } = req.query;
      if (!name) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          success: false,
          message: "Name is required",
        });
      }
      const result = await this.searchUsecase.execute(name);
      return res.status(STATUS_CODES.OK).json({ success: true, data: result });
    } catch (error) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ success: false, message: error.message });
    }
  }

  async addUser(req, res) {
    try {
      const { email, name, password } = req.body;

      if (!email || !name || !password) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          success: false,
          message: "All fields are required",
        });
      }
      const result = await this.addUsecase.execute(req.body);
      return res
        .status(STATUS_CODES.CREATED)
        .json({
          success: true,
          message: "User created successfully",
          data: result,
        });
    } catch (error) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ success: false, message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const result = await this.updateUsecase.execute(id, req.body);
      return res.status(STATUS_CODES.OK).json({
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

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const result = await this.deleteUsecase.execute(id);

      return res.status(STATUS_CODES.OK).json({
        success: true,
        message: "User deleted successfully",
        data: result,
      });
    } catch (error) {
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  }
}

module.exports = AdminControllers;
