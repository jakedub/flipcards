const express = require('express');
const router = express.Router();
const models = require("./models");





router.get('/api/hello',
    passport.authenticate('basic', {session: false}),
    function (req, res) {
        res.json({"hello": req.user})
    }
);

router.use('/api', router);

module.exports = router;
