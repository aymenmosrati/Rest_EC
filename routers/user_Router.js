const route=require("express").Router()
const userController=require("../controllers/User_Controller")






route.post("/login",userController.login)
route.post("/refreshtoken",userController.refreshtoken)
route.post("/logout",userController.logout)




module.exports=route;