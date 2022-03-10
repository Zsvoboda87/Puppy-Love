
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Owner, Pet} = require('../models');
const withAuth = require('../utils/auth');
// const Formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();


const path = require('path')
const multer = require('multer');
// const { response } = require('express');


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: "243483875326316",
  api_secret: "RTHxHT-qGNwZ5nm18nfFBSW5_nI",
  
})


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/Images");
//   },

//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Image',
  },
});

const upload = multer({ storage: storage });

router.post("/upload", withAuth, upload.single("petImage"), (req, res) => {
  Pet.create({
    image: req.file.path,
    owner_id: req.session.owner_id,
    petName: req.body.petName,
    petGender: req.body.petGender,
    petBirthday: req.body.petBirthday,
    petLikesSwimming: req.body.petLikesSwimming,
    petLikesWalks: req.body.petLikesWalks,
    petLikesBones: req.body.petLikesBones,
    petLikesLicking: req.body.petLikesLicking,
    petLikesBarking: req.body.petLikesBarking,
    petLikesRunning: req.body.petLikesRunning,
    petLikesJumping: req.body.petLikesJumping,
    petLikesTreats: req.body.petLikesTreats,
    petAboutMe: req.body.petAboutMe,
  });
  res.redirect("/homepage").catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get("/", withAuth, (req, res) => {
  res.render("petuploader", { loggedIn: req.session.loggedIn });
});

module.exports = router;
