const mongoose=require('mongoose')
const mongoURI='mongodb://localhost:27017/eshoppingapp'

const connectToMongo=async()=>{
    mongoose.connect(await mongoURI,()=>{
        console.log('Connected To Mongo Successfully')
    })
}

module.exports=connectToMongo;
