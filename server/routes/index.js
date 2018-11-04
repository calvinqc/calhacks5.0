const loadAllRoutes = (app) => {

    // HomePage
    app.get("/", function(req, res) {
        res.render('index');
    });
};

module.exports = (app) => {
    loadAllRoutes(app)
};