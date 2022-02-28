const {Pet} = require('../models');
const PetData = [
    {
        image: 'IMAGE',
        petOwner: 'Diana',
        petName: 'Kiwi',
        petGender: true,
        petBirthday: 2003-02-05,
        petLikes: 'walks and squeakies'
    },
    {
        image: 'IMAGE',
        petOwner: 'Diana',
        petName: 'Freya',
        petGender: true,
        petBirthday: 2005-03-04,
        petLikes: 'running and howling'
    }
]

const seedPets = () => Pet.bulkCreate(PetData);

module.exports = seedPets;

//bulkCreate cannot read properties of undefined (reading 'bulkCreate')