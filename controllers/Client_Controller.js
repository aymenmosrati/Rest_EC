const ClientModel=require("../models/Client_Model")
const nodemailer=require("nodemailer")
const bcrypt=require("bcrypt")

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b65db805fb542c",
    pass: "cad714d42e9270"
  }
});



module.exports={
  register:function(req,res){
    req.body.image=req.file.filename
      const client=new ClientModel(req.body)
      client.save(req.body,function(err,item){
          if (err) {
            res.status(406).json({success:false,message:"failed to register client"+err,data:null})
          } else {
            transport.sendMail({
              from: "myapp@gmail.com",
              to: item.email,
              cc: 'nouhalataoui777@gmail.com',
              bcc: "chirazakkari10@gmail.com",
              subject: "Welcome " + item.firstName,
              text: "bonjour mr ",
              html: `<!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <meta http-equiv="x-ua-compatible" content="ie=edge">
                <title>Welcome Email</title>
              </head>
              <body>
                <h2>Hello ${item.firstName +" "+ item.lastName}! </h2>
                <p>We're glad to have you on board at ${item.email}. </p>
                <p>We're glad to have you on board at it gate</p>
                 /// msg enajim nbadlou ken n7eb nekteb 7aja
              </body>
              </html>`,
          }, function(err, info) {
              if (err) {
                  console.log("error:", err)
              } else {
                  console.log("Email Send successufly:", info + reponse)
              }
          })










            res.status(201).json({success:true,message:"client registered successful",data:item})
          }
      })
  },
  getAll:function(req,res){
    ClientModel.find(function(err, items) {
			if (err) {
				res.status(406).json({ Success:false, message: "can got all registers",data:null });
			}
            else{
                res.status(201).json({Success:true,message:"list of registeres",data:items})
            }
		});
	},
  getbyId:function(req,res){
    ClientModel.findById(req.params.id,function(err,items)
        {if (err) {
            res.status(406),json({Success:false,message:"failed to got register by Id",data:null})
            
        } else {
            res.status(201).json({Success:true,message:"register founded",data:items})
            
        }

        })
      },
      getbyName:function(req,res){
        //req.query: object kima   ?q:
        ClientModel.find({name:req.query.name},function(err,items)
        {
            if (err) {
                res.status(406).json({Success:false,messge:"can not got register by this name",data:null})
                
            } else {
                res.status(201).json({Success:true,message:"can got register by this name",data:items})
                
            }
        })
    }, 
    updateregister:function(req,res){

      if (req.body.password) {
        req.body.password = bcrypt.hashSync(
          req.body.password,10
        ).toString();
      }
      //req.params bich njib akil 7aja bil id
      //req.body bich nbadel f akil 7aja w na3mlilha enregistre
      ClientModel.findByIdAndUpdate(req.params.id,req.body,{new:true},function(err,item){
          if (err) 
          {res.status(406).json({success:false,message:"failed to update register",data:null})
              
          } else {
          res.status(201).json({success:true,message:"category updated register",data:item})
          }
      })
  },
  DeleteRegister:function(req,res)
  {
    ClientModel.findByIdAndDelete(req.params.id,function(err,item)
      {
          if (err) {
              res.status(406).json({success:false,message:"Failed to delet register ",data:null})
              console.log(err)
              
          } else {
              res.status(201).json({success:true,message:"delete register successful",data:item})

              
          }
      })

  }
    }

  
  
