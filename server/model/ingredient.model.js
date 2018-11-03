let mongo = require('mongoose'),
    timestamp = require('mongoose-timestamp'),
    model = 'Ingredient';

let schema = new mongo.Schema({
    name: String,
});

schema.plugin(timestamp);

module.exports = mongo.model(model, schema);
