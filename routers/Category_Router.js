// jebna l express w 5dhena menou extence route 
const route=require("express").Router()
const CategoryController=require("../controllers/Category_Controlller")
//post:create, http ta3tina l post f l postman
const upload=require("../middlewares/uploadFile")
route.post("/create",upload.single("photo"),CategoryController.createCategory)
route.get("/getall",CategoryController.getAllcategory)
//  /:id dima lazme
route.get("/getOne/:id",CategoryController.getbyId)
route.get("/getOnebyname",CategoryController.getbyName)
route.put("/update/:id",CategoryController.updatecategory)

route.delete("/delete/:id",CategoryController.DeleteCategory)

module.exports=route

