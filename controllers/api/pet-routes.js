const router = require('express').Router();
const sequelize = require('../..config/connection');
const { Pet, Owner } = require('../../models');

//get all pets
router.get('/', (req, res) => {
    console.log('=================');
    Pet.findAll({
        attributes: [
            'image',
            'id',
            'petOwner',
            'petName',
            'petGender',
            'petBirthday',
            'petLikes'
        ]
    }).then(puppy_love_db => res.json(puppy_love_db))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;