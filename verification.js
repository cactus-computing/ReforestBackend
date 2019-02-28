var express = require('express');
var router = express.Router();

var User = require('./schema/User');

/* GET with user email token. */
router.get('/verify/:token', (req, res) => {
    let token = req.params.token;

    User.findOne({token}).then(user => {
        if (!user) {
            res.status(400).json({message: "Invalid email token"});
            return;
        }

        user.token = undefined;
        user.save();
        res.redirect('/login');
    });
});

module.exports = router;
