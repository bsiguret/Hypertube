var db = require('../db/db');
var sql = require('../db/requetes');
const express = require('express');
const router = express.Router();
const passport = require('../tools/passport');

// Router pour passport 42
router.get('/42', passport.authenticate('42'));
router.get('/42/callback',
    passport.authenticate('42', {
        failureRedirect: 'http://localhost:3001',
        // failureMessage: "Fail",
        // successRedirect: 'http://localhost:3001/home',
        // successFlash: "OK",
    }),
    function(req, res) {
        console.log(req.user);
        res.redirect('http://localhost:3001/home');
    }
);



module.exports = router;