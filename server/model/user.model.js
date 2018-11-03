let mongo = require('mongoose'),
    timestamp = require('mongoose-timestamp'),
    model = 'User';

let schema = new mongo.Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    facebook: String,
    google: String,

    blockChain: String,         // Everything uses this one to do everything.

    facebookObj: {
        name: String,
        url: String,
        email: {
            type: String,
        },
    },
    googleObj: {
        name: String,
        email: String,
        url: {
            type: String,
        },
    },
    instagram: String,
    instagramObj: {
        name: String,
        url: String,
        email: String,
    },
    avatar: String,
    role: String,
});

schema.plugin(timestamp);
schema.index({username: 1});

module.exports = mongo.model(model, schema);
