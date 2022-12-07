const mongoose = require ("mongoose")


const SubcategorySchema = new mongoose.Schema({

    name:{
        type: String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        rerquired: true,
        trim:true
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products"
    }],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categories"
    }
},{timestamps:true})

module.exports = mongoose.model("Subcategories", SubcategorySchema )