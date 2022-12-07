
const Productmodel = require('../models/product_model');
const Subcategory_Model=require("../models/SubCategory_MODEL")
module.exports = {
	create: (req, res) => {
		// e req elli bich tod5ol de type file
		//length<0? el images akther mil 1 mapili
		req.body['Galleries'] =
			req.files.length <= 0
				? []
				: req.files.map(function(file) {
						return { name: file.filename, description: 'add photo' };
					});
		const product = new Productmodel(req.body);
		product.save(req.body, (err, item) => {
			if (err) {
				
				res.status(406).json({ success: false, message: 'failed to create product'+err, data: null });
			} else {
				//Subcategry_Model : a7na f product bich n affiche l ordre w subcategory 5tarna subcategory_model 
				//5ater a7na f produit w bich nzedou produit l subcategory  
				Subcategory_Model.findByIdAndUpdate(
					req.body.Subcategory,
					{$push:{products:product}},function(){
						//hedhi bich yafichi 7aja barka => product.populate([{path:"orders",select:"ref"},{path:"Subcategory",select:"name"}])
                        product.populate(["orders","Subcategory"],function(){
							//bich tnadhmena l postman
							const data={
								_id:item._id,
								refproduct:item.refproduct,
								price:item.price,
								Subcategory:item.Subcategory,
								qte:item.qte,
							}
                

                    // bich enadhim fi3odh data:iem n7otou data:data
					res.status(201).json({ success: true, message: 'crate successful', data: data })
                })}
                );
			}
        		});
	},
	getAll: function(req, res) {
		Productmodel.find(function(err, item) {
			if (err) {
				res.status(406).json({ success: false, message: 'failed to got all product', data: null });
			} else {
				res.status(201).json({ success: true, message: 'got all successful', data: item });
			}
			// populate bich tjiblik ay 7aja min collection a5ra 
		}).populate("Galleries")
	},
	getbyId: (req, res) => {
		Productmodel.findById(req.params.id, function(err, item) {
			if (err) {
				res.status(406).json({ Success: false, message: 'failed', data: null });
			} else {
				res.status(201).json({ Success: true, message: 'succes', data: item });
			}
			//bich ena7i l __v m l base ay 7aja n7ebou ena7iwehe na3mlou .select(-(tire 6) w akil 7aja )
		}).select("-__v")
	},
	getbyName: (req, res) => {
		Productmodel.find({ refproduct: req.query.refproduct }, function(err, item) {
			if (err) {
				res.status(406).json({ Success: false, message: 'failed', data: null });
			} else {
				res.status(201).json({ Success: true, message: 'succes', data: item });
			}
		});
	},
	update: (req, res) => {
		Productmodel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, item) => {
			if (err) {
				res.status(406).json({ Success: false, message: 'failed', data: null });
			} else {
				res.status(200).json({ Success: true, message: 'successful', data: item });
			}
		});
	},
	delete: (req, res) => {
		Productmodel.findByIdAndDelete(req.params.id, function(err, item) {
			if (err) {
				res.status(406).json({ Success: false, message: 'failed', data: null });
			} else {
				res.status(200).json({ Success: true, message: 'successful', data: item });
			}
		});
	}
};
