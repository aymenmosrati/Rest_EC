const orderModel=require("../models/order_model")






module.exports={

create:function(req,res,){

    const order = new orderModel(req.body)

    order.save(req.body,function(err,item){
        if (err) {
            res.status(406).json({success:false,message:"failed",data:null})
        } else {
            res.status(201).json({success:true,message:"created",data:item})   
        }
    })
},
getAll:(req,res)=>{
    orderModel.find({},(err,items)=>{
        if (err) {
            res.status(406).json({success:false,message:"failed",data:null})
        } else {
            res.status(201).json({success:true,message:"created",data:items}) 
        }
    })
},
getbyId:(req,res)=>{

    orderModel.findById(req.params.id,function(err,item)
    {
        if (err) {
            res.status(406).json({Success:false,message:"failed",data:null})
            
        } else {
            res.status(201).json({Success:true,message:"succes",data:item})
            
        }
    })
},   
getbyName:(req,res)=>{
    orderModel.find({ref:req.query.ref},(err,item)=>{
        if (err) {
            res.status(406).json({Success:false,message:"failed",data:null})
         
        } else {
            res.status(201).json({Success:true,message:"succes",data:item})
        }



    })



},
update:(req,res)=>{
    orderModel.findByIdAndUpdate(req.params.id,req.body,function(err,item)
    {
        if (err) {
            res.status(406).json({Success:false,message:"failed",data:null})
            
        } else {
            res.status(201).json({Success:true,message:"succes",data:item})
        }
    })  
},
delete:(req,res)=>{
    orderModel.findByIdAndDelete(req.params.id,function(err,item){
        if (err) {
            res.status(406).json({Success:false,message:"failed",data:null})
            
        } else {
            res.status(201).json({Success:true,message:"succes",data:item})
        }

    })


}



}