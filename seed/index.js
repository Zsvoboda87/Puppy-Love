const seedPets = require('./petTest.js');
const sequelize = require('../config/connection.js');

const seedAll = async() => {
    await sequelize.sync({
        force: true
    });
    await seedPets();
    process.exit(0);
}

seedAll();