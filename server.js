const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const morgan=require("morgan")
// bich torbot l front w l back
const cors=require("cors")
const Database = require('./config/database');
const PORT = process.env.PORT;

var corsOptions={
origin:"http://localhost:3000",
optionsSuccessStatus:200 

}
app.use(cors("corsOptions"))

app.use(express.json());
//bich tatb3ena elli isir 3al postmen f terminale
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }));  //l bodyparser houwa f woset l express

//importation routers
const categories = require('./routers/Category_Router');
const subcategories=require("./routers/SubCategory_Router")
const products=require("./routers/product_routers")
const orders=require("./routers/order_Router")
const clients=require("./routers/Client_Router")
const user=require("./routers/user_Router")

//middlewares: creation de parents Url
app.use('/category', categories);
app.use('/subcategory',subcategories)
app.use('/product',products)
app.use('/order',orders)
app.use('/users',clients)
app.use('/user',user)
app.use("/refreshtoken",user)
app.use("/loogout",user)

app.get('/getImage/:img',function(req,res){
	res.sendFile(__dirname + "/storages/"+ req.params.img)
})

app.listen(PORT, function() {
	console.log(`server running on http://localhost:${PORT}`);
});
