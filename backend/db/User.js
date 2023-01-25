const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

module.exports=mongoose.model("User",userSchema)

//line 8 users is our collection/table name of db ecommerce which  
//we had created using mongodb compass