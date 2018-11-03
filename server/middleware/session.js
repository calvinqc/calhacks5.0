const session = require('express-session');

module.exports = (app) => {
    app.use(session({
        secret: 'vinacann',
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 24 * 3600 * 1000},
    }));
};