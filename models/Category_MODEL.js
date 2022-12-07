const mongoose=require("mongoose")


const CategorySchema=new mongoose.Schema({
    name:{
        type:String,
        //oblige eda5alha
        required:true,
        //ina7i l espace
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
        type:String,
        required:true,
        trim:true,

    },
    subcategories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subcategories"
    }]

//bich t7otli e time =>timestampes
},{timestamps:true})
//reference de schema: Categories, name: CategoryScheam
module.exports=mongoose.model("Categories",CategorySchema)