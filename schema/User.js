var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var User = mongoose.Schema({
    // User name
    name: {
      first: {
        type: String,
        required: true
      },
      last: {
        type: String,
        required: true
      }
    },
    // Email
    email: {
      type: String,
      index: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    // Home Information
    home: {
        address: String,
        location: {
            type: {
              type: String, // Don't do `{ location: { type: String } }`
              enum: ['Point'], // 'location.type' must be 'Point'
              required: true
            },
            coordinates: {
              type: [Number],
              required: true
            },
            required: false
        }
    }
})

User.methods.validPassword = function(password) {
  bcrypt.compare(password, this.password, (err, match) => {
    if (err) {
      console.log(err);
      return false;
    }
    return match;
  })
}

//User.index({ "home.location": "2dsphere" });

module.exports = mongoose.model('User', User);