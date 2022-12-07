const jwt = require("jsonwebtoken")

const JWT_SECRET=process.env.JWT_SECRET



const verifytoken = function(req,res,next){

    // f l header bich njibou l token b l key mta7a
const authHeader=req.headers.authorization
// ken fama token
if(authHeader){

    const token=authHeader

    jwt.verify(token,"JWT_SECRET",function(err,user){
        if(err){
            return res.status(403).json({message:"token is not valide"})
        }else{
            req.user=user
            next()
        }

    })

}else{
    // m b3athtlich token bich nraja3lik

    res.status(401).json({message:"you are not authenticated"})
}

}



const verifytokenAndAuthorization = (req,res,next)=>{

    verifytoken(req,res ,()=>{

        if( req.user.id === req.params.id || req.user.isAdmin)
        {
            next()
        }
        else{
            return res.status(403).json("you are not allowed to do that")
        }
    })

}


const verifytokenAndAdmin=(req,res,next)=>{

    verifytoken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }
        else{
            return res.status(403).json("you are not allowed to do that")
        }
    })
}




module.exports={verifytoken,verifytokenAndAuthorization,verifytokenAndAdmin}