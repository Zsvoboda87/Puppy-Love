const router = require("express").Router();
const sequelize = require("../config/connection");
const { Owner, Pet } = require("../models");

// render welcome
router.get("/", (req, res) => {
  res.render("welcome", {
    loggedIn: req.session.loggedIn,
  });
});

// render login screen
router.get("/login", (req, res) => {
  // if logged in redirect to homepage
  if (req.session.loggedIn) {
    res.redirect("/homepage");
    return;
  }
  res.render("login");
});

//render signup screen
router.get("/signup", (req, res) => {
  if (req.session.signUp) {
    res.redirect("/signup");
    return;
  }
  res.render("signup");
});

//render homepage
router.get("/homepage", (req, res) => {
  res.render("homepage");
});

//  logout and render welcome
router.get("/logout", (req, res) => {
  res.render("welcome");
});

// render welcome from logging out
router.get("/welcome", (req, res) => {
  res.render("welcome", {
    loggedIn: req.session.loggedIn,
  });
});

//render pet update
router.get("/petUpdate", (req, res) => {
  res.render("petUpdate");
});

// render pet gallery
router.get("/petGallery", (req, res) => {
  console.log("======================");
  Pet.findAll({
    attributes: [
      "id",
      "image",
      "petName",
      "petGender",
      "petBirthday",
      "petLikesSwimming",
      "petLikesWalks",
      "petLikesBones",
      "petLikesLicking",
      "petLikesBarking",
      "petLikesRunning",
      "petLikesJumping",
      "petLikesTreats",
      "petAboutMe",
    ],
    include: [
      {
        model: Owner,
        attributes: ["username", "email"],
      },
    ],
    order: [["id", "DESC"]],
  })
    .then((dbPetData) => {
      const petCards = dbPetData.map((pet) => pet.get({ plain: true }));

      res.render("petGallery", {
        petCards,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// single pet
router.get("/singlepet/:id", (req, res) => {
  console.log("======================");
  Pet.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "image",
      "petName",
      "petGender",
      "petBirthday",
      "petLikesSwimming",
      "petLikesWalks",
      "petLikesBones",
      "petLikesLicking",
      "petLikesBarking",
      "petLikesRunning",
      "petLikesJumping",
      "petLikesTreats",
      "petAboutMe",
    ],
    include: [
      {
        model: Owner,
        attributes: ['username', 'email'],
      },
    ],
  })
    .then((dbPetData) => {
      if (!dbPetData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const petCard = dbPetData.get({ plain: true });

      res.render("singlepet", {
        petCard,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
