const router = require('express').Router();
const { UserModel } = require('../model');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req,res) =>{
    try{
        let { firstName, lastName, /*middleName,*/ userName, email, password, pfpURL } = req.body.user;

        let User = await UserModel.create ({
            firstName,
            lastName,
            // middleName,
            userName,
            email,
            password: bcrypt.hashSync(password, 10),
            pfpURL

        });

        const token = jwt.sign(
            { id: newUser.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 60 * 60 * 24 }
        )

        res.status(201).json({
            message: "User Registered!",
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email or Username already in use!",
            });
        } else {
            res.status(500).json({
                message: `Failed to register user. ${err}`
            })
        }
    }
})

module.exports = router;