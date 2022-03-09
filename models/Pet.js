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
          // MM/DD/YYYY (Defaults YYYY MM DD)
          // NEEDS MORE RESEARCH: select convert(varchar,datecolumname,101) as datecolumname from tablename
          allowNull: false,
      },
      petLikes: {
          // what does the pet like? predetermined options
          type: DataTypes.STRING,
          allowNull: true,
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