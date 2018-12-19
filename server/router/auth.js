var db = require('../db/db');
var sql = require('../db/requetes');
const express = require('express');
const router = express.Router();
const passport = require('./passport/passport');

// Router pour passport 42
router.get('/42', passport.authenticate('42'), function(req, res) {
    console.log(res);
});



module.exports = router;