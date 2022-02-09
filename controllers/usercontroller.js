const router = require('express').Router();
const { UserModel } = require('../model');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req,res) =>{
    try{
        let { firstName, lastName, middleName, userName, email,password } = req.body.user;

        let User = await UserModel.create ({
            firstName,
            lastName,
            middleName,
            userName,
            email,
            password, //TODO - bcrypt this password!

        });

//TODO - ADD JWT TOKEN CODE HERE 

        res.status(201).json({
            message: "User Registered!",
            user: User,
            //TODO - add session token here!
        });
    }catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email or Username already in use!",
            });
        } else {
            res.status(500).json({
                message: 'Failed to register user.'
            })
        }
    }
})

module.exports = router;