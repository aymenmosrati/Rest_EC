const multer=require("multer")



const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //normalement deux point ama 7atena point barka 5ater m yo8zorich lil dossier lo5rin
      cb(null, './storages')
    },
    filename: function (req, file, cb) {
        //file.originalname: samiheli bil esem elli eni habatet bih (badalnaha b 7aja o5ra kanit copier coller)
      const images = Date.now() + '-' + file.originalname
      cb(null, file.fieldname + Date.now() + images)
    }
  })
  // sna3 const storage w 7at faha e FUNCTION Storage
  const upload = multer({ storage: Storage, 
  limits:{fileSize:1024*1024*1024*10},
  Filterfile:function(req, file, cb){
      if (
          //  || ma3naha or
          file.mimetype==="image/png"||
          file.mimetype==="image/jpg"||
          file.mimetype==="image/jpeg"||
          file.mimetype==="video/mp4"||
        
        "application/pdf"


      ) 
      {
          // raja3li null ma3naha m 3andich erreur w true ma3naha mregel 9beli el fichier hadhom
          cb(null,true)
          
      } else {
          cb(new Error("please enter a fit file ",false))
      }
  }
})
module.exports=upload