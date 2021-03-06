const router = require("express").Router();
const { Owner, Pet } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  Owner.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.owner_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Log in route and create a session
router.post("/login", (req, res) => {
  Owner.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user with that email address!" });
        return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: "Incorrect password!" });
        return;
      }

      req.session.save(() => {
        // declare session variables
        req.session.owner_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: "You are now logged in!" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// log out route and
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// find Owner by id
router.get("/:id", (req, res) => {
  Owner.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
  })
    .then((puppy_love_db) => {
      if (!puppy_love_db) {
        res.status(404).json({ message: "No Owner found with this username" });
        return;
      }
      res.json(puppy_love_db);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// owner find all
router.get("/", (req, res) => {
  Owner.findAll({
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Pet,
      },
    ],
  })
    .then((puppy_love_db) => {
      if (!puppy_love_db) {
        res.status(404).json({ message: "No Owner found with this username" });
        return;
      }
      res.json(puppy_love_db);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// owner find all
router.get("/:id", (req, res) => {
  Owner.findOne({
    attributes: { exclude: ["password"] },

    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Pet,
      },
    ],
  })
    .then((puppy_love_db) => {
      if (!puppy_love_db) {
        res.status(404).json({ message: "No Owner found with this username" });
        return;
      }
      res.json(puppy_love_db);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update Owner's email
router.put("/:id", withAuth, (req, res) => {
  Owner.update(
    {
      email: req.body.email,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((puppy_love_db) => {
      if (!puppy_love_db) {
        res.status(404).json({ message: "No Owner found with this id" });
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
