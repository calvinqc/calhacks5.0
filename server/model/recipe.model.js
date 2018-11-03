let mongo = require('mongoose'),
    timestamp = require('mongoose-timestamp'),
    model = 'Recipe';

let schema = new mongo.Schema({
    title: String,
    ingredients: {type: mongo.Schema.ObjectId, ref: "Ingredient"},
    instruction: String,
    image: String,
    blockChain: String,         // Everything uses this one to do everything.
});

schema.plugin(timestamp);

module.exports = mongo.model(model, schema);
