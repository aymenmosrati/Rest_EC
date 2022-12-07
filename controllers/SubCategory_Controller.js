const Subcategory_Model=require("../models/SubCategory_MODEL")
module.exports={
    create:(req,res)=>{

        const subcategory =new Subcategory_Model(req.body)
        subcategory.save(req.body,(err,item)=>{
            if (err) {
                res.status(406).json({Success:false,message:"failed to create",data:null})
                console.log(err)
            } else {
                res.status(201).json({Success:true,message:"Success to create",data:item})
            }
        })

    },
    getAll:(req,res)=>{
        Subcategory_Model.find({},(err,items)=>
        {
            if (err) {
                res.status(406).json({Success:false,message:"can got list",data:null})
                
            } else {
                res.status(201).json({Success:true,message:"list ",data:items})
                
            }
        })

    },
    getbyId:(req,res)=>{
        Subcategory_Model.findById(req.params.id,function(err,item)
        {
            if (err) {
                res.status(406).json({Success:false,message:"failed",data:null})
                
            } else {
                res.status(201).json({Success:true,message:"succes",data:item})
                
            }
        })
    },
    getbyName:(req,res)=>{
        Subcategory_Model.find({name:req.query.name},function(err,item)
        {
            if (err) {
                res.status(406).json({Success:false,message:"failed",data:null})                
            } else {
                res.status(201).json({Success:true,message:"successful",data:item})
            }
        })

    },
    update:(req,res)=>{
        Subcategory_Model.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,item)=>{
            
            if (err) {
                res.status(406).json({Success:false,message:"failed",data:null})                
            } else {
                res.status(200).json({Success:true,message:"successful",data:item})
            }
        })
    },
    delete:(req,res)=>{
        Subcategory_Model.findByIdAndDelete(req.params.id,function(err,item)
        {
            if (err) {
                res.status(406).json({Success:false,message:"failed",data:null})                
            } else {
                res.status(200).json({Success:true,message:"successful",data:item})
            }
        })
    }

}