const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req && req.cookies && req.cookies.token)  {
        res.json({msg: "User log"});
    } else {
        res.json({msg: "User not log"});
    }
});

module.exports = router;