const { Model, DataTypes } = require("sequelize");
const { DataTypes } = require("sequelize/types");
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
      petOwner: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      petName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      petGender: {
          type: DataTypes.BOOLEAN,
          // in the frontend code have it set: if TRUE; make pet FEMALE, if FALSE; make pet MALE
          allowNull: false,
      },
      petBirthday: {
          type: DataTypes.DATE,
          // MM/DD/YYYY (Defaults YYYY MM DD)
          // NEEDS MORE RESEARCH: select convert(varchar,datecolumname,101) as datecolumname from tablename
          allowNull: false,
      },
      petLikes: {
          // what does the pet like? walks, balls, tug o' war, etc
          type: DataTypes.STRING,
          allowNull: false,
      },
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