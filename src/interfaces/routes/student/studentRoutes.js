const express = require("express")
const multer = require("multer")

const StudentController = require("../../controllers/student/studentControllers")
const StudentRepository = require("../../../infrastructure/repositories/studentRepository")
const GetHomeController = require("../../controllers/student/getHomeController")
const authMiddleware = require("../../middlewares/authMiddleware")
const roleBasedMiddleware = require("../../middlewares/roleBasedMiddleware")
const ProfileController = require("../../controllers/student/profileController")
const FileUploadRepository = require("../../../infrastructure/repositories/fileUploadRepository")
const UploadController = require("../../controllers/student/uploadController")

const router = express.Router()

const studentRepo = new StudentRepository()
const imageRepo = new FileUploadRepository()  

const controller = new StudentController(studentRepo)
const homeController = new GetHomeController(studentRepo)
const profileController = new ProfileController(studentRepo)
const imageController = new UploadController(imageRepo)

const storage = multer.memoryStorage()
const upload = multer({storage})


router.post('/register', controller.register.bind(controller))
router.post('/login',controller.login.bind(controller))

router.get('/', authMiddleware , roleBasedMiddleware('user'), homeController.getHome.bind(homeController) )

router.get('/profile',authMiddleware,roleBasedMiddleware("user") , profileController.getProfile.bind(profileController))
router.patch('/profile/update',authMiddleware,roleBasedMiddleware("user"), profileController.updateProfile.bind(profileController))

router.post('/upload/img',authMiddleware , roleBasedMiddleware("user"), upload.single("image") ,imageController.uploadImg.bind(imageController))
router.post("/delete/img" , authMiddleware , roleBasedMiddleware("user") , imageController.deleteImg.bind(imageController))



module.exports = router