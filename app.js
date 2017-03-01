var http   = require("http");
var url    = require("url");
var routes = require("routes")();
var view   = require("swig");

routes.addRoute('/', function(req, res){
  var html = view.compileFile('template/index.html')({
    title : "Home"
  });
  res.writeHead(200,{"Content-Type" : "text/html"});
  res.end(html);
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
    res.writeHead(404,{"Content-Type" : "text/plain"});
    res.end("Error 404");
  }
}).listen(80);
