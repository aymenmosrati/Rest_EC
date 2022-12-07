const mongoose=require("mongoose")


const galerySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    }
})


const ProductSchema=new mongoose.Schema({
    refproduct:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:String,
        required:true,
        trim:true,
    },
    qte:{
        type:String,
        required:true,
        trim:true,
    },
    Galleries:[galerySchema],
    //rana bich njibou e subcategory mta3na bil id mta7a
    Subcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subcategories"
    },
    //[] 5ater e liaison plusieurs
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"orders"
    }]


},{timestamps:true})
module.exports=mongoose.model("Products",ProductSchema)