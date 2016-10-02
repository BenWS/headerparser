var express = require("express");
var http = require("http");
var url = require('url');
var app = express();

//set view directory
app.set("views", "./views");
app.set("view engine", "pug");

app.get("/index", function(req,res) {
    res.render("index");
});


app.get("/whoami", (req, res) => {

    var myURL = url.parse(req.url, true);
    var myPath = myURL.pathname;
    
    var results = req.headers;
    
    var opSystem = results['user-agent'].slice(results['user-agent'].indexOf("(") + 1, results['user-agent'].indexOf(")"));
    var language = results['accept-language'].split(",")[0];
    var ipAddress = results['x-forwarded-for'];
    
    res.json({"ipaddress":ipAddress,"language":language, "software":opSystem});
    res.end();
})

app.get("/*", function(req,res) {
  res.redirect("/index");
});

app.listen(process.env.PORT);