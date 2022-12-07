const mongoose=require("mongoose")
//bich nchoufou mithel anahou elli 5tarou b dhabet coulerou w quantite w houma nafes e som
//na3mlou schema o5ra l partie hedhi l client elli izidha mich l admine
const itemorderproductSchema=new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products"
    },
    qte:{
        type:Number,
        required:true,
    },
    color:{
        type:String,
        required:true
    }

}) 
const orderSchema=new mongoose.Schema({
    ref:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    prixTotal:{
        type:Number,
        required:true,
        trim:true},
    date:{
        type:Date,
        required:true
    },
        


qteTotal:{
    type:Number,
    required:true
},
products:[itemorderproductSchema]   
},{timestamps:true})









module.exports=mongoose.model("orders",orderSchema)