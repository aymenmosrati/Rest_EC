const userModel=require("./users_Model")

const mongoose=require("mongoose")
const ProviderSchema=new mongoose.Schema({
    company:{
        type:String,
        require:true,
        trim:true,
    }
})
const Providers=userModel.discriminator("providers",ProviderSchema)
module.exports=mongoose.model("providers")