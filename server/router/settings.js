'use strict'

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userQuery = require('../models/userModel');
const passport = require('../tools/passport');
// const settingsFilter = require('../middlewares/settingsFilter');

router.get('/settings', passport.authenticate('jwt', {session: false}), (req, res) => {
    let id = jwt.decode(req.cookies.token).id;

    userQuery.findOne({id: id}).then(user => {
        if (!user) {
            res.status(403).json({msg: "No user"});
        } else {
            let data = {
                id: user.id,
                username: user.username,
                email: user.email,
                lastname: user.lastname,
                firstname: user.firstname,
                language: user.language,
                profile: user.profile,
                isVerified: user.isVerified
            }
            console.log(data);
            res.json({user: data});
        }
    });
});

router.post('/settings', passport.authenticate('jwt', {session: false}), /*settingsFilter,*/ (req, res) => {
    let id = jwt.decode(req.cookies.token).id;

    console.log(req.body)
    console.log(req.body.error)
    res.json({msg: req.body, error: req.body.error})
});

module.exports = router;