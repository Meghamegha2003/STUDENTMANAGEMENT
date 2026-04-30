const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

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
        type: String,
        require:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    profileImg:String
})

schema.pre("findOneAndUpdate", async function() {
  const update = this.getUpdate();

  if (update.password) {
    update.password = await bcrypt.hash(update.password, 10);
  }

});

module.exports = mongoose.model("student",schema)