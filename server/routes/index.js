const listAPI = [
    "user",
];
const loadAllRoutes = (app) => {

    // HomePage
    app.get("/", function(req, res) {
        res.render('../views/index');
    });


    // Load all APIs Routes
    listAPI.forEach((api) => {
        let router = require("./" + api);
        app.use("/api/" + api, router);
    })
};

module.exports = (app) => {
    loadAllRoutes(app)
};