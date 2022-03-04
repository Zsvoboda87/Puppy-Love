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
// router.get('/', (req, res) => {
//   res.render('homepage');
// });

// // render pet gallery
// router.get('/', (req, res) => {
//   console.log('======================');
//   Pet.findAll({
//     attributes: [
//       'id',
//       'post_url',
//       'title',
//       'created_at',
//     ],
//     include: [
//       {
//         model: Comment,
//         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//         include: {
//           model: User,
//           attributes: ['username']
//         }
//       },
//       {
//         model: User,
//         attributes: ['username']
//       }
//     ]
//   })
//     .then(dbPostData => {
//       const posts = dbPostData.map(post => post.get({ plain: true }));

//       res.render('homepage', {
//         posts,
//         loggedIn: req.session.loggedIn
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
