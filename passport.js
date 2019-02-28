var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var User = require('./schema/User')

var opts = {}

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};

opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = 'dirtysocks';

passport.use(new JwtStrategy(opts, function(payload, done) {
    User.findById(payload.id, function(err, user) {
        if (err) {
            return done(err, false);
        }
        
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

