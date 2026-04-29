const express = require("express")
const app = express()
const studentRoutes = require("../../backend/src/interfaces/routes/student/studentRoutes")
const adminRoutes = require("../../backend/src/interfaces/routes/admin/adminRouter")

app.use(express.json())
app.use('/',studentRoutes)
app.use("/admin", adminRoutes)

module.exports = app