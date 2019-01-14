const express = require('express');
const router = express.Router();
const userQuery = require('../models/userModel');

router.get('/:id', (req, res) => {
    userQuery.findOne({id: req.params.id}).then(user => {
        if (!user) {
            res.json({msg: "No user"});
        } else {
            let data = {
                id: user.id,
                username: user.username,
                lastname: user.lastname,
                firstname: user.firstname,
                language: user.language,
                profile: user.profile
            }
            res.json({user: data});
        }
    });
});

module.exports = router;