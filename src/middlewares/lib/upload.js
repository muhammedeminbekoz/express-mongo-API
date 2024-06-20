const multer = require('multer')
const path = require('path')
const fs = require('fs')


const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
    console.log("dosya: ", file)
    if (!allowedMimeTypes.includes(file.mimetype)) {
        cb(new Error('Bu dosya türü desteklenmemektedir.'), false)
    }
    cb(null, true)

}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const rootDir = path.resolve(__dirname).split('middlewares')[0]
        console.log("salam: ", rootDir)
        console.log("sosis: ", path.join(rootDir, 'public/uploads'))
        // fs.mkdirSync(path.join(rootDir, '/public/uploads'), { recursive: true })
        cb(null, path.join(rootDir, 'public/uploads'))
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split('/')[1]

        //    if (!req.savedImages) req.sevaedImages = []

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        let url = `image_${file.fieldname}_${uniqueSuffix}.${extension}`;

        // req.savedImages = [...req.savedImages, path.join(url)]

        cb(null, url)

    }

})


const upload = multer({ storage, fileFilter }).fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'gavatar', maxCount: 1 }
])

module.exports = upload