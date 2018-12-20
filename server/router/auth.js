var db = require('../db/db');
var sql = require('../db/requetes');
const express = require('express');
const router = express.Router();
const passport = require('../tools/passport');

// Router pour passport 42
router.get('/42', passport.authenticate('42'));
router.get('/42/callback',
    passport.authenticate('42', {
        failureRedirect: '/api/auth/42/success',
        successRedirect: '/api/auth/42/fail'
    })
);
router.get('/42/success', (req, res) => {
    console.log(req);
    res.json({msg: "Connection OK!"});
});
router.get('/42/fail', (req, res) => {
    console.log(req);
    res.status(403).json({msg: "Connection fail!"});
});


module.exports = router;