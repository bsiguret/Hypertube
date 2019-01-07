const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userQuery = require('../models/userModel');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    if (req.body.email && req.body.password) {
        userQuery.findOne({email: req.body.email}).then(user => {
            if (!user || !bcrypt.compareSync(req.body.password, user.password))
                res.status(401).json({msg: "E-mail or password incorrect"});
            else if (user && bcrypt.compareSync(req.body.password, user.password)) {
                if (!user.isVerified)
                    res.status(401).json({msg: "Account not verified"});
                else {
                    let data = {id: user.id, username: user.username, email: user.email};
                    const payload = data;
                    const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: 86400});
                    data = Object.assign(data, {lastname: user.lastname, firstname: user.firstname, language: user.language, profile: user.profile});
                    res.json({user: data, token: token});
                }
            }
        })
    }
});

module.exports = router;