const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our User model
class Likes extends Model {

  }

  // define table columns and configuration
Likes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      likes: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'pet',
          key: 'id'
        }
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "likes",
    }
  );
  
  module.exports = Likes;