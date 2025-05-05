import multer from "multer"

const storage= multer.diskStorage({
    
    destination:function(req,file,cb){
        cb(null, "./public/images")   
    }, 
    filename:function (req,file,cb){
        cb(null, file.originalname)
    }
}
)

const multerUploader = multer({
    storage
})

export default multerUploader