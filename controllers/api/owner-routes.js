const res = require('express/lib/response');
const { Owner } = require('../../models');

const router = require('express').Router();

// Log in route and create a session
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

// log out route and 
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }

});

// find Owner by username
router.get('/:username', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      username: req.params.username
    },
    include: {
      model: Owner,
      attributes: ['id', 'username', 'email']
    }
  }).then (puppy_love_db => {
    if (!puppy_love_db) {
      res.status(404).json({ message: 'No Owner found with this username' });
      return;
    }
    res.json(puppy_love_db);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// delete Owner (deletes account?)

//update Owner's email
router.put('/:id', (req, res) => {
  Owner.update(
      {
          email: req.body.email
      },
      {
          where: {
              id: req.params.id
          }
      }
  )
  .then(puppy_love_db => {
      if (!puppy_love_db) {
          res.status(404).json({ message: 'No Owner found with this id' });
          return;
      }
      res.json(puppy_love_db);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

  module.exports = router;