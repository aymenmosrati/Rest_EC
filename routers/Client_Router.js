const route=require("express").Router()
const clientController=require("../controllers/Client_Controller")


const {verifytoken,verifytokenAndAuthorization}=require("../middlewares/auth")




const upload=require("../middlewares/uploadFile")
route.post("/Register",upload.single("photo"),clientController.register)
route.get("/getAllregisters",clientController.getAll)
route.get("/getRegisterById/:id",clientController.getbyId)
route.get("/getRegisterByName",clientController.getbyName)
route.put("/update/:id",verifytokenAndAuthorization,clientController.updateregister)
route.delete("/deleteRegister/:id",clientController.DeleteRegister)








module.exports=route