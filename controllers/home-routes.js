const router = require("express").Router();
const sequelize = require("../config/connection");
const { Owner, Pet } = require("../models");


// render login screen
router.get("/login", (req, res) => {
  // if logged in redirect to homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//  logout and render login 
router.get("/logout", (req, res) => {
  res.render("login");
});

// render homepage
router.get('/', (req, res) => {
  res.render('homepage');
});

// // render pet gallery
router.get('/petGallery', (req, res) => {
  console.log('======================');
  Pet.findAll({
    attributes: [
      'id',
      'image',
      'petName',
      'petGender',
      'petBirthday',
      'petLikes',
      'petAboutMe'
    ],
    include: [
      {
        model: Owner,
        attributes: ['username', 'email'],
      },
    ]
  })
    .then(dbPetData => {
      const petCards = dbPetData.map(pet => pet.get({ plain: true }));

      console.log(dbPetData)
      res.render('petGallery', {
        petCards,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// single pet
router.get('/singlepet/:id', (req, res) => {
  console.log('======================');
  Pet.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'image',
      'petName',
      'petGender',
      'petBirthday',
      'petLikes',
      'petAboutMe'
    ],
  })
    .then(dbPetData => {
      if (!dbPetData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const petCard = dbPetData.get({ plain: true });

      console.log(dbPetData)
      res.render('singlepet', {
        petCard,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
