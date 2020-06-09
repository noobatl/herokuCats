var express = require("express");

var PORT = process.env.PORT || 8080;

var app = express();

const connection = require("./config/connection.js");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
// var routes = require("./controllers/catsController.js");

// app.use(routes);

app.get("/", function(req, res) {
  connection.query("SELECT * FROM cats", function(err, data) {
    if (err) {
      return res.status(500)("An error occurred");
    }
    res.render("index", { cats: data});
  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
