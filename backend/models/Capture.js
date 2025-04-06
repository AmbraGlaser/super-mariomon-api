const { all } = require("express/lib/application");
const { type } = require("express/lib/response");

// models/Capture.js
module.exports = (sequelize, DataTypes) => {
  const Capture = sequelize.define("Capture", {
    naam: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dexNumber: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      unique: false,
    },

    type1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ability1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ability2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hiddenability: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    BST: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    HP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Atk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Def: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SpA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SpD: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Spe: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    EvoCondition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Capture;
};
