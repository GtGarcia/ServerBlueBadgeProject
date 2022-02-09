const router = require('express').Router();
const { CarModel } = require('../model');
const { UCE } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');


router.post('/create', async (req,res) => {
    let { price, condition, transmissionType, color, type, numberOfDoors, miles, vehicleLocation } = req.body.car;

    let carCreate = {
        price,
        condition,
        transmissionType,
        color,
        type,
        numberOfDoors,
        miles,
        vehicleLocation,
        // TODO - This code needs to be used when JWT is added?
        //?          owner_id: req.user.id,
    }
    try {
        const newCar = await CarModel.create(carCreate);
        res.status(200).json({
            message: "Car listing Created!",
            car: newCar
        });
    } catch (err) {
        res.status(500).json({ error: err});
    } 
    
})


router.get('/:id', async (req, res) => {

    const carID = req.params.id

    try{
        const userCar = await CarModel.findAll({
            where: {
                id: carID
            }
        })
        res.status(200).json(userCar)
    } catch(err) {
        res.status(500).json({ error: err });
    }
})


router.get ('/', async (req, res) => {
    try{
        const listing = await CarModel.findAll();
        res.status(200).json({
            message: 'Here you go!',
            listing
        })
    } catch(err) {
        res.status(500).json({ error: err});
    }
})

module.exports = router;