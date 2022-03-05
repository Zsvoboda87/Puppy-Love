const router = require('express').Router();
const sequelize = require('../config/connection');
const { Owner, Pet} = require('../models');

const path = require('path')
const multer = require('multer');
const { response } = require('express');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

router.post('/upload', upload.single('petImage'), (req, res) => { 
    Pet.create({
              image: req.file.filename,
              owner_id: req.session.owner_id,
              petName: req.body.petName,
              petGender: req.body.petGender ,
              petBirthday: req.body.petBirthday,
              petLikes: req.body.petLikes,
              petAboutMe: req.body.petAboutMe
            })
            res.render('petGallery')
});


router.get('/', (req, res) => {
    res.render('petuploader')
});


router.get('/upload', (req, res) => {
    res.render('petGallery')
});

module.exports = router;