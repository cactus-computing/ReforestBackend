var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var User = require('../schema/User');

var SALT_ROUNDS = 12;
var JWT_SECRET = 'dirtysocks';

/* POST user register credentials. */
router.post('/register', (req, res) => {
  /*
    {
      email,
      password,
      name: {
        first,
        last
      }
    }
  */
  let {email, password, name} = req.body;

  User.findOne({email}).then(user => {
    if (user) {
      res.status(400).json({message: "Email already in use"});
      return;
    }
  });

  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    new User({
      email,
      password: hash,
      name
    }).save()
      .then(() => {
        res.redirect('/login');
      });
  });
});

/* POST user login credentials. */
router.post('/login', (req, res) => {
  /*
    {
      email,
      password
    }
  */
  let {email, password} = req.body;

  User.findOne({email}).then(user => {
    if (!user || !user.validPassword(password)) {
      res.status(400).json({message: "Invalid email or password"});
      return;
    }

    jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: 60 * 15}, (err, token) => {
      if (err) {
        console.log(err);
        return;
      }
      res.cookie('jwt', token, {httpOnly: true}).redirect('/');
    });
  });
});


var passport = require('passport');

/* GET user pickup events. */
router.get('/pickups', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log(req.user);
});

module.exports = router;
