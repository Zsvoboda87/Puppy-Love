const router = require('express').Router();
const sequelize = require('../config/connection');
const { Owner, Pet} = require('../models');
const withAuth = require('../utils/auth');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();


const path = require('path')
const multer = require('multer');


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  
})


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Image',
  },
});

const upload = multer({ storage: storage });

router.post("/upload", withAuth, upload.single("petImage"), (req, res) => {
  res.redirect("/petGallery");
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
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get("/upload", withAuth, (req, res) => {
  res.render("petGallery", { loggedIn: req.session.loggedIn });
});

router.get("/", withAuth, (req, res) => {
  res.render("petuploader", { loggedIn: req.session.loggedIn });
});


module.exports = router;
