const router = require('express').Router();
const auth = require('./auth.routes');
const upload = require('../middlewares/lib/upload');
const multer = require('multer');
const APIError = require('../utils/errors');


router.use(auth);



router.post('/upload', (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log("hata: ", err)
            throw new APIError("Resim yüklenirken multer kaynaklı bir hata meydana geldi", err)
        }
        else if (err) {
            throw new APIError("Resim yüklenirken bir hata oluştu", err)
        }
        else {
            return res.status(200).json({ message: "başarılı" })
        }
    })

})




module.exports = router;