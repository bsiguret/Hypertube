const express = require('express');
const router = express.Router();
const passport = require('../tools/passport');
const jwt = require('jsonwebtoken');

// Router pour passport 42
router.get('/42', passport.authenticate('42'));
router.get('/42/callback',
    passport.authenticate('42', {
        failureRedirect: 'http://localhost:3001'
    }),
    function(req, res) {
        const user = req.session.passport.user;
        if (user.err) {
            res.redirect('http://localhost:3001');
        }
        else {
            const payload = {id: user.id, username: user.username, email: user.email};
            const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: 86400});
            res.cookie('token', token, { maxAge: 86400, httpOnly: true });
            res.redirect('http://localhost:3001/home');
        }
    }
);

// Router pour passport facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: 'http://localhost:3001'
    }),
    function(req, res) {
        const user = req.session.passport.user;
        if (user.err) {
            res.redirect('http://localhost:3001');
        }
        else {
            const payload = {id: user.id, username: user.username, email: user.email};
            const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: 86400});
            res.cookie('token', token, { maxAge: 86400, httpOnly: true });
            res.redirect('http://localhost:3001/home');
        }
    }
);

// Router pour passport google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:3001'
    }),
    function(req, res) {
        const user = req.session.passport.user;
        if (user.err) {
            res.redirect('http://localhost:3001');
        }
        else {
            const payload = {id: user.id, username: user.username, email: user.email};
            const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: 86400});
            res.cookie('token', token, { maxAge: 86400, httpOnly: true });
            res.redirect('http://localhost:3001/home');
        }
    }
);

module.exports = router;