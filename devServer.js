var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var webpack = require("webpack");
var config = require("./webpack.config.dev");

var app = express();
var compiler = webpack(config);

app.use(bodyParser.json());

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.post("/login", (req, res, next) => {
    if (req.body.username === "foo" && req.body.password === "bar") {
        return res.json({
            status: "success",
            user: {
                auth_token: "SUPERSECRETAUTHTOKENPROPAPLYJWT",
                username: req.body.username
            }
        })
    }

    return res.json({
        "status": "failed",
        "message": "YOU SHALL NOT PASS!"
    });
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, "localhost", function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Listening at http://localhost:3000");
});
