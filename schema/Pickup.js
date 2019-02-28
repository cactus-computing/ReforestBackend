const mongoose = require('mongoose');

var Pickup = mongoose.Schema({
    // User credited for this pickup
    user: {
        id: String,
    },
    // Information of the collector
    collector: {
        id: String,
        location: {
            type: {
                type: String, // Don't do `{ location: { type: String } }`
                enum: ['Point'], // 'location.type' must be 'Point'
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },
    },
    material: String,
    weight: Number,
    // When this was executed
    time: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Pickup', Pickup);