const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  is_admin:{
    type:Number,
    required:true
  },
  is_verified:{
    type:Number,
    default:1 //Default as email verified
  }
});

module.exports=mongoose.model('User',userSchema);