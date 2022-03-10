const router = require("express").Router();
const sequelize = require("../config/connection");
const { Owner, Pet } = require("../models");
const withAuth = require("../utils/auth");

const path = require("path");
const multer = require("multer");
const { response } = require("express");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// update pet image and about me
router.put("/update/:id", withAuth, upload.single("petImage"), (req, res) => {
  Pet.update(
    {
      image: req.file.filename,
      petAboutMe: req.body.petAboutMe,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((puppy_love_db) => {
    if (!puppy_love_db) {
      res.status(404).json({ message: "No pet found with this id" });
      return;
    }
    res.json(puppy_love_db);
  });
  res.redirect("/petGallery").catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get("/:id", withAuth, (req, res) => {
  res.render("petUpdate", { loggedIn: req.session.loggedIn });
});

module.exports = router;
