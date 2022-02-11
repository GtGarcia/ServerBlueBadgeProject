const router = require('express').Router();
const { CarModel } = require('../model');
let validateJWT = require("../middleware/validate-jwt")

router.post('/create', validateJWT, async (req,res) => {
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
        owner_id: req.user.id
    }
    try {
        const newCar = await CarModel.create(carCreate);
        console.log(carCreate)
        res.status(200).json({
            message: "Car listing Created!",
            car: newCar
        });
    } catch (err) {
        res.status(500).json({ error: err});
    } 
    
})


router.get('/:id', validateJWT, async (req, res) => {

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


router.get ('/', validateJWT, async (req, res) => {
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

//UPDATE: 
router.put("/:id", validateJWT, async (req, res) => {
    let { price, condition, transmissionType, color, type, numberOfDoors, miles, vehicleLocation } = req.body.car;
    // const id = req.user;
    const carId = req.params.id;
    const ownerid = req.user.id;
    
    const query = {
        where: {
            id: carId,
            owner_id: ownerid
        },
    };

    let newCar = {
        price,
        condition,
        transmissionType,
        color,
        type,
        numberOfDoors,
        miles,
        vehicleLocation,
    }
    try {
        const updatedCar = await CarModel.update(newCar, query);
        res.status(200).json({updatedCar, message: "Listing has been updated" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }
});

router.delete("/:id", validateJWT,  async (req, res) => {
    const carId = req.params.id;
    const ownerid = req.user.id;

    try {
        const query = {
            where: {
                id: carId,
                owner_id: ownerid,
            },
        };
        await CarModel.destroy(query);
        res.status(201).json({ message: "Item has been deleted" });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

module.exports = router;