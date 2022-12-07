const userModel=require("./users_Model")




const mongoose=require("mongoose")

const clientSchema = new mongoose.Schema({

    adressL:{
        type:String,
        require:true,
        trim:true,
    }
})
// bich na5ou l usermodel mta3ou w nzed 3lihom mta3 l client
const Clients = userModel.discriminator("Clients",clientSchema)



module.exports=mongoose.model("Clients")