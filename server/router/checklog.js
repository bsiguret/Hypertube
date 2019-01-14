const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userQuery = require('../models/userModel');

router.get('/', (req, res) => {
    if (req && req.cookies && req.cookies.token) {
        try {
            let token = jwt.decode(req.cookies.token);
            let id = token.id;
            userQuery.findOne({id: id}).then(user => {
                let data = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    lastname: user.lastname,
                    firstname: user.firstname,
                    language: user.language,
                    profile: user.profile
                }
                res.json({user: data});
            });
        } catch (e) {
            res.status(403).json({msg: "Token invalid"});
        }
    } else {
        res.status(403).json({msg: "User not log"});
    }
});

module.exports = router;