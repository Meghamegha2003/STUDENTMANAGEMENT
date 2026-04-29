const express = require("express")
const router = express.Router()

const authMiddleware = require("../../middlewares/authMiddleware")
const roleBasedMiddleware = require("../../middlewares/roleBasedMiddleware")
const AdminControllers = require("../../controllers/admin/AdminControllers")
const StudentRepository = require("../../../infrastructure/repositories/studentRepository")

const adminRepo = new StudentRepository()
const controller = new AdminControllers(adminRepo)

router.post("/admin/login",  controller.loginAdmin.bind(controller) )
router.get("/admin", authMiddleware ,roleBasedMiddleware("admin") , controller.getDashboard.bind(controller))
router.get("/admin/users/search", authMiddleware ,roleBasedMiddleware("admin") , controller.searchUser.bind(controller))
router.post("/admin/users",authMiddleware,roleBasedMiddleware("admin"),controller.addUser.bind(controller))
router.patch("/admin/users/:id",authMiddleware,roleBasedMiddleware("admin"),controller.updateUser.bind(controller))
router.delete("/admin/users/:id",authMiddleware,roleBasedMiddleware("admin"),controller.deleteUser.bind(controller))

module.exports = router