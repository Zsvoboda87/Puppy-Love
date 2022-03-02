const Owner = require("./Owner");
const Pet = require('./Pet');

Owner.hasMany(Pet, {
    foreignKey: 'user_id'
});

Pet.belongsTo(Owner, {
    foreignKey: 'user_id',
});

Owner.belongsToMany(Pet, {
    foreignKey: 'user_id'
});

module.exports = { Owner, Pet };
