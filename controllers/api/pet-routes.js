const router = require('express').Router();
const sequelize = require('../..config/connection');
const { Pet, Owner } = require('../../models');
const res = require('express/lib/response');

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

//get specific pet by id
router.get('/:id', (req, res) => {
    Pet.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'image',
            'id',
            'petOwner',
            'petName',
            'petGender',
            'petBirthday',
            'petLikes'
        ]
    }).then(puppy_love_db => {
        if (!puppy_love_db) {
            res.status(404).json({ message: 'No pet found with this id' });
            return;
        }
        res.json(puppy_love_db);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//create new pet
router.post('/', (req, res) => {
    Pet.create({
        image: req.body.image,
        id: req.session.id,
        petOwner: req.body.petOwner,
        petName: req.body.petName,
        petGender: req.body.petGender,
        petBirthday: req.body.petBirthday,
        petLikes: req.body.petLikes
    }).then(puppy_love_db => res.json(puppy_love_db))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;