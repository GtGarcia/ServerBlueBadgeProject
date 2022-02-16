const { DataTypes } = require('sequelize');
const db = require('../db');

const User = db.define("user",{
    firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
    lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
    middleName: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
    },
    userName: {
        type:DataTypes.STRING(100),
        allowNull: false,
        unique:true,
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false
    },
    pfpURL: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    phoneNumber: {
        type: DataTypes.STRING(10),
        allowNull: true,
        unique: false
    },

})

module.exports = User;