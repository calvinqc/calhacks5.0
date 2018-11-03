let mongoose    = require('mongoose');
    // config      = require('config').get('mongo');

/**
 * Connect to mongo DB
 */
function connectToMongo() {
    // let mongoConfig = {
    //     url: config.url,
    //     database: config.database,
    //     options: {
    //         user: config.options.user,
    //         pass: config.options.pass,
    //     }
    // };

    // let url = mongoConfig["url"] + '/' + mongoConfig["database"],
    //     options = mongoConfig["options"];

    let url = 'mongodb+srv://admin:admin@cluster0-ab800.gcp.mongodb.net/test?retryWrites=true';
    mongoose.connect(url, { useNewUrlParser: true });
    // mongoose.connect(url, options);
    let db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Mongodb connected!');
    });
}

module.exports = connectToMongo;