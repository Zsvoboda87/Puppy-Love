const router = require('express').Router();
const sequelize = require('../config/connection');
const {Owner, Pet} = require('../models');
const withAuth = require('../utils/auth');

const path = require('path');
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

// update pet image and about me
router.put('/update', withAuth, upload.single('petImage'), (req, res) => {
    Pet.update({
      image: req.file.filename,
      petAboutMe: req.body.petAboutMe
    })
    res.redirect('/petGallery')
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });