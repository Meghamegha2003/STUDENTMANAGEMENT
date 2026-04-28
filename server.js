require('dotenv').config()
const app = require('../backend/src/app')
const PORT = process.env.PORT
const connectDB  = require('../backend/src/infrastructure/database/db')

connectDB()

app.listen(PORT,()=>{
    console.log(`server run on the port : http://localhost:5000 `)
})