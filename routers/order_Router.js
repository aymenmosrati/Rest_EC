const route=require("express").Router()
const orderController=require("../controllers/order_controller")





route.post("/create",orderController.create)
route.get('/getAll',orderController.getAll)
route.get('/getbyid/:id',orderController.getbyId)
route.get('/getbyName',orderController.getbyName)
route.put('/update/:id',orderController.update)
route.delete('/delete/:id',orderController.delete)




module.exports=route