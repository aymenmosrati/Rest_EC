const CategoryModel = require('../models/Category_MODEL');
module.exports = {
	createCategory: function(req, res) {
        //f l modele 3ana attribut image hne bich nda5lou faha image  

        req.body["image"]=req.file.filename

		//req. body eda5el f donnée l da5el, nda5el 7ajet f woset e requet(requet neb3eth 7aja )
		const category = new CategoryModel(req.body);
		category.save(req.body, function(err, item) {
			if (err) {
				res.status(404).json({
					success: false,
					message: 'created category failed'+err,
					data: null
				});
			} else {
				res.status(201).json({
					Success: true,
					message: 'category created successfly',
					data: item
				});
			}
		});
	},
	getAllcategory: function(req, res) {
		//find lawajli ma3naha
		CategoryModel.find(function(err, items) {
			if (err) {
				res.status(406).json({ Success:false, message: "can got all categories",data:null });
			}
            else{
                res.status(201).json({Success:true,message:"list of categories",data:items})
            }
		});
	},
    getbyId:function(req,res){
        CategoryModel.findById(req.params.id,function(err,items)
            {if (err) {
                res.status(406),json({Success:false,message:"failed to got category bu Id",data:null})
                
            } else {
                res.status(201).json({Success:true,message:"category founded",data:items})
                
            }

            })

    },
    getbyName:function(req,res){
        //req.query: object kima   ?q:
        CategoryModel.find({name:req.query.name},function(err,items)
        {
            if (err) {
                res.status(406).json({Success:false,messge:"can not got categories by this name",data:null})
                
            } else {
                res.status(201).json({Success:true,message:"can got categories by this name",data:items})
                
            }
        })
    }, 
    updatecategory:function(req,res){
        //req.params bich njib akil 7aja bil id
        //req.body bich nbadel f akil 7aja w na3mlilha enregistre
        CategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true},function(err,item){
            if (err) 
            {res.status(406).json({success:false,message:"failed to update categort",data:null})
                
            } else {
            res.status(201).json({success:true,message:"category updated successful",data:item})
            }
        })
    },
        DeleteCategory:function(req,res)
        {
            CategoryModel.findByIdAndDelete(req.params.id,function(err,item)
            {
                if (err) {
                    res.status(406).json({success:false,message:"Failed to delet category ",data:null})
                    console.log(err)
                    
                } else {
                    res.status(201).json({success:true,message:"delete category successful",data:item})

                    
                }
            })

        }

};


