const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our User model
class Petlikes extends Model {}

// define table columns and configuration
Petlikes.init(
  {
    pet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "pet",
        key: "id",
      },
    },
    likes_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "likes",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "pet_likes",
  }
);

module.exports = Petlikes;
