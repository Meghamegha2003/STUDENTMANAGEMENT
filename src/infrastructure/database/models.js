const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name:{
        type : String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:Number || String,
        require:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    profileImg:String
})

module.exports = mongoose.model("student",schema)