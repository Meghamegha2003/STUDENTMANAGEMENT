const express = require("express")
const app = express()
const studentRoutes = require("../../backend/src/interfaces/routes/student/studentRoutes")

app.use(express.json())
app.use('/',studentRoutes)

module.exports = app