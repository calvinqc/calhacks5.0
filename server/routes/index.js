const loadAllRoutes = (app) => {

    // HomePage
    app.get("/", function(req, res) {
        res.render('index');
    });

    app.get("/resetpassword", (req, res) => {
        res.render('resetpassword');
    });
};

module.exports = (app) => {
    loadAllRoutes(app)
};