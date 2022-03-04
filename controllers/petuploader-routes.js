const router = require('express').Router();
const sequelize = require('../config/connection');
const { Owner, Pet} = require('../models');

const path = require('path')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },

    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

router.post('/upload', upload.single('petImage'), (req, res) => { 
    console.log(req.file.path);
    res.send("image Uploaded")
    Pet.create({
              image: req.file.path,
              petOwner: req.session.owner_id,
              petName: req.body.petName,
              petGender: req.body.petGender ,
              petBirthday: req.body.petBirthday,
              petLikes: req.body.petLikes
            })
});


router.get('/', (req, res) => {
  res.render('petuploader')  
});

module.exports = router;