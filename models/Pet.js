const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our User model
class Pet extends Model {

  }

  // define table columns and configuration
Pet.init(
    {
      image: {
        type: DataTypes.STRING,
        // STRING = FILE PATH TO IMAGE
        // example: ../assets/images/NAMEOFIMAGE.png
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'owner',
          key: 'id'
        }
      },
      petName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      petGender: {
          type: DataTypes.STRING,
          // in the frontend code have it set: if TRUE; make pet FEMALE, if FALSE; make pet MALE
      },
      petBirthday: {
          type: DataTypes.DATE,
          get: function() {
            const birthDate = new Date(this.getDataValue('petBirthday'));
            const birthdayMath = Math.abs(Date.now() - birthDate);
            const birthdayMath2 = Math.ceil(birthdayMath / (1000 * 60 * 60 * 24));
            const birthdayMath3 = Math.floor(birthdayMath2 / 365);
            if (birthdayMath3 < 1) {
              return "They are too young to date.";
            }
            else if (birthdayMath3 === 1) {
              return birthdayMath3 + " year old";
            }
            else {
              return birthdayMath3 + " years old";
            }
          },
          allowNull: false,
      },
      //petLikes
      petLikesSwimming: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      petLikesWalks: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      petLikesBones: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      petLikesLicking: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      petLikesBarking: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      petLikesRunning: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      petLikesJumping: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      petLikesTreats: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      petAboutMe: {
        // biography paragraphs written by the owner
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "pet",
    }
  );
  
  module.exports = Pet;