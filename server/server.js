let express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser");

app.use(bodyParser.urlencoded({extended: true})) ;
app.set("view engine", "ejs");

require('./middleware/session')(app);
// require('./middleware/authentication')(app, passport);
// require('./libs/mongo/index')();
require('./routes/index')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, process.env.IP, function() {
    console.log("Server started");
});