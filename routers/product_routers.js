const route=require("express").Router()
const Productcontroller=require("../controllers/Product_controllers")






const {verifytoken,verifytokenAndAuthorization,verifytokenAndAdmin}=require("../middlewares/auth")
const upload=require("../middlewares/uploadFile")
route.post('/create',upload.array("photos"),Productcontroller.create)
route.get('/getAll',Productcontroller.getAll)
route.get('/getbyId/:id',Productcontroller.getbyId)
route.get('/getbyname',Productcontroller.getbyName)
route.put('/update/:id',Productcontroller.update)
route.delete('/delete/:id',Productcontroller.delete)
















module.exports=route