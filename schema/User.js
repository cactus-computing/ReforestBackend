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
              required: false
            },
            coordinates: {
              type: [Number],
              required: false
            },
        }
    }
})

User.methods.validPassword = async function(other) {
  return await bcrypt.compare(other, this.password);
}

module.exports = mongoose.model('User', User);