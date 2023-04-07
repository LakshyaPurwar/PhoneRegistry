const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone_no:{
        type:Number,
        required:true,
        unique:true,
    }
})

module.exports = mongoose.model("User",userSchema);