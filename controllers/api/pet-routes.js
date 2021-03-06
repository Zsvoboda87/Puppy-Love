
const router = require('express').Router();
const { Pet, Owner } = require('../../models');
const res = require('express/lib/response');

//get all pets
router.get("/", (req, res) => {
  console.log("=================");
  Pet.findAll({
    attributes: [
      "image",
      "id",
      "owner_id",
      "petName",
      "petGender",
      "petBirthday",
      'petLikesSwimming',
      'petLikesWalks',
      'petLikesBones',
      'petLikesLicking',
      'petLikesBarking',
      'petLikesRunning',
      'petLikesJumping',
      'petLikesTreats',
      "petAboutMe",
    ],
    include:[ {
      model: Owner,
      attributes: ["username", "email"],
    }],
  })
    .then((puppy_love_db) => res.json(puppy_love_db))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get specific pet by id
router.get("/:id", (req, res) => {
  Pet.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "image",
      "id",
      "owner_id",
      "petName",
      "petGender",
      "petBirthday",
      'petLikesSwimming',
      'petLikesWalks',
      'petLikesBones',
      'petLikesLicking',
      'petLikesBarking',
      'petLikesRunning',
      'petLikesJumping',
      'petLikesTreats',
      "petAboutMe",
    ],
  })
    .then((puppy_love_db) => {
      if (!puppy_love_db) {
        res.status(404).json({ message: "No pet found with this id" });
        return;
      }
      res.json(puppy_love_db);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create new pet
router.post("/", (req, res) => {
  Pet.create({
    image: req.body.image,
    id: req.session.id,
    owner_id: req.body.owner_id,
    petName: req.body.petName,
    petGender: req.body.petGender,
    petBirthday: req.body.petBirthday,
    petLikes: req.body.petLikes,
    petAboutMe: req.body.petAboutMe,
  })
    .then((puppy_love_db) => res.json(puppy_love_db))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update specific pet's image
router.put("/:id", (req, res) => {
  Pet.update(
    {
      image: req.body.image,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((puppy_love_db) => {
      if (!puppy_love_db) {
        res.status(404).json({ message: "No pet found with this id" });
        return;
      }
      res.json(puppy_love_db);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update specific pet's aboutme
router.put("/:id", (req, res) => {
    Pet.update(
      {
        petAboutMe: req.body.petAboutMe,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((puppy_love_db) => {
        if (!puppy_love_db) {
          res.status(404).json({ message: "No pet found with this id" });
          return;
        }
        res.json(puppy_love_db);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//update specific pet's likes
router.put("/:id", (req, res) => {
  Pet.update(
    {
      petLikes: req.body.petLikes,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((puppy_love_db) => {
      if (!puppy_love_db) {
        res.status(404).json({ message: "No pet found with this id" });
        return;
      }
      res.json(puppy_love_db);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete a specific pet from the owner
router.delete("/:id", (req, res) => {
  console.log("id", req.params.id);
  Pet.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((puppy_love_db) => {
      if (!puppy_love_db) {
        res.status(404).json({ message: "No pet found with this id" });
        return;
      }
      res.json(puppy_love_db);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
