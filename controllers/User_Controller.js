const userModel = require('../models/users_Model');


//bcrybt ta3mlina l hachage w l comparaison m ben l passeword elli 3ana w e sauvgarde
const bycrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const JWT_SECRET=process.env.JWT_SECRET
const R_JWT_SECRET=process.env.R_JWT_SECRET
//let 7aja msakra m iraha 7ad 
let refreshtoknes=[]


// generate accessToken: bich nasna3 token 
const generateAccessToken= function(user){
	return jwt.sign({id:user._id, isAdmin:user.isAdmin},"JWT_SECRET",{expiresIn:"30m"})
}



//generate refreshToken
const genraterRefreshtoken=function(user){
	return jwt.sign({id:user._id,isAdmin:user.isAdmin},"R_JWT_SECRET",{expiresIn:"30m"})
}

module.exports = {
	login: function(req, res) {
		userModel.findOne({ email: req.body.email }, function(err, user) {
			if (err) {
				res.status(406).json({ success: false, message: 'err login', data: null });
			} else {
				if (user != null) {
					// fama item ma3naha fama email s7i7  bich nthabtou m3a l password

					if (bycrypt.compareSync(req.body.password, user.password)) {

						const AccessToken = generateAccessToken(user)
						const RefreshAccessToken = genraterRefreshtoken(user)
						//refreshtoken 7othouli f tableau refreshtokens
						refreshtoknes.push(RefreshAccessToken)




                     // accesToken ma3naha bich iraja3li m3a kol login token
						res.status(201).json({ success: true, message: 'hello dear',data:user,AccessToken,RefreshAccessToken });
					} else {
						res.status(406).json({ success: true, message: 'incorrect password', data: null });
					}
					// l email w password mich m tab9in 
				} else {
					res.status(406).json({ success: false, message: 'incorrect email', data: null });
				}
			}
		});
	},

	refreshtoken:function(req,res,next){
		//take the refreshToken from user, bich nab3edh l server refreshtoken bich itestaha

		const refreshToken = req.body.token
		// send error if there are not token or its invalide : ken m 7atetech token ab3athli erreur 
		 if(!refreshToken){
			 return res.status(401).json("you are not authenticated")
		 }
		 //ken e tableau refreshtokens m fichi refreshtoken 
		 
		 if(!refreshtoknes.includes(refreshToken)){
			 return res.status(403).json("refresh token is not valid")
		 }
		 // hne k youfa wa9et token et refreshtoken w l user i5ali l pc ma7loul  w iji 7ad bich ifok l token refresh token i9olou 
		 // le 5ater houwa fasa5 haka m tableau w bich i3awed yab3athlik token et refresh token a5er k t3awed ta3mil crud o5ra 
		 jwt.verify(refreshToken,"R_JWT_SECRET",function(err,user){
			 // ken fama error atba7ali tala7ali chniya

			err && console.log(err)

			//fasa5hali l refreshtoken m tableau
			// token => token hedhi kima l compteur bich i3adili e tableau lkol  
			refreshtoknes = refreshtoknes.filter((token)=>token !==refreshToken)
			// bich i3awed ya3tini token et refresh token jdod

			const newAccessToken = generateAccessToken(user)
			const newRefreshAccessToken = genraterRefreshtoken(user)
			// bich i7othom f tableau 

			refreshtoknes.push(newRefreshAccessToken)
			// l accestoken l jdida ta5ou l 9dima w nafes pour refreshtoken


			res.status(200).json({AccessToken:newAccessToken,refreshToken:newRefreshAccessToken})


		

		 })


	

	},
	logout:function(req,res){
		// fasa5li e refreshtoke m tableau
		const refreshToken = req.body.token
		refreshtoknes = refreshtoknes.filter((token)=>token !==refreshToken)
		res.status(200).json("you logged out successufly")
		
	}
}
