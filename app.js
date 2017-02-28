var http   = require("http");
var url    = require("url");
var routes = require("routes")();

routes.addRoute('/', function(req, res){
  res.writeHead(200,{"Content-Type" : "text/plain"});
  res.end("This is index page");
});

routes.addRoute('/profile/:nama?', function(req, res){
  res.writeHead(200,{"Content-Type" : "text/plain"});
  if (this.params.nama != "undefined") {

  res.end("Profile Pagenya: "+this.params.nama);
  }
});

http.createServer(function(req, res){
  var path = url.parse(req.url).pathname;
  var match = routes.match(path);
  if (match) {
    match.fn(req, res);
  }
  else{
    res.writeHead(200,{"Content-Type" : "text/plain"});
    res.end("Error 404");
  }
}).listen(8080);
