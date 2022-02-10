const { DataTypes } = require('sequelize');
const db = require('../db');

const Car = db.define('car', {
    price:{
        type: DataTypes.STRING(300),
        allowNull: false,
        unique: false,
    },
    condition: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: false
    },
    transmissionType: {
        type: DataTypes.STRING(300),
        allowNull: false,
        unique: false
    },
    color: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique:false
    },
    type: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: false
    },
    numberOfDoors: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique:false

    },
    miles: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false
    },
    vehicleLocation: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    owner_id: {
        type: DataTypes.STRING
    }
    
});

module.exports = Car;