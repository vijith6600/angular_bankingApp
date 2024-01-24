//Server Databae Integration


//import mongoose
const mongoose=require("mongoose")


//Connect server with mongo via mongoose
mongoose.connect('mongodb://localhost:27017/bank',{
    useNewUrlParser:true
})




//Create a model For database
const User = mongoose.model('User',{
    acno: Number, 
    userName: String,
    password: String,
    balance: Number,
    transaction: []
})

module.exports={
    User
}