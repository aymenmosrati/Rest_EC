const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const db=process.env.DB_URL
mongoose.Promise=global.Promise;
const Database=mongoose.connect(db,
 {useNewUrlParser:true},
 (err)=>{
     if(!err)
     {
         console.log("mongodb connected successufly")
     }else{
         console.log("failed to connected with mongodb"+err)
     }
 }
 )
 module.exports=Database
   
