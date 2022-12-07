const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcrypt")


const baseOptions = {
    discriminatorKey: 'itemtype',
    collection: 'users'
}
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        //bich ivalidi l e mail
        validate:[validator.isEmail,"please enter a valid email"]
    },
    password:{
        type:String,
        required:true,
        trim:true,
        maxlength:[12,"password should be at least 8 characters"],
        minlength:[6,"password should be more than 6 characters"]

    },
    tel:{
        type:Number,
        required:true,
        trim:true
    },
    image:{
        type:String,
        trim:true
    },
    adresse:{
        type:String,
        required:true,
        trim:true,

    },
    
    isAdmin:{
        type:Boolean,
        default:false
    },
    

},baseOptions,{timestamps:true})
userSchema.pre("save",function(next){
    //hashSync bich ihachi l mot passe b 9ouwet 10 l 10 degre de hashage
    this.password=bcrypt.hashSync(this.password,10)
    next()
})


module.exports=mongoose.model("Users",userSchema,)