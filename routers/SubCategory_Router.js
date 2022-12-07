//na3mlou e routage b l express
const route = require("express").Router()


const Subcategory_Controller=require("../controllers/SubCategory_Controller")


route.post('/create', Subcategory_Controller.create)
route.get('/getAll',Subcategory_Controller.getAll)
route.get('/getbyId/:id',Subcategory_Controller.getbyId)
route.get('/getbyName',Subcategory_Controller.getbyName)
route.put('/update/:id',Subcategory_Controller.update)
route.delete('/delete/:id',Subcategory_Controller.delete)









module.exports=route