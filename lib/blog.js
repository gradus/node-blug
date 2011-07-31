var express = require('express')
var jade = require('jade');
var app = module.exports = express.createServer();
var posts = ['POST1', 'POST2', 'POST3', 'POST4'];

app.register('.jade', jade);
app.set('view engine', 'jade');
app.get('/', function(req, resp) {

  resp.render('index', {
    posts: posts
  });
});

app.configure(function(){
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'haloomph' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.listen(Number(process.env.PORT || process.env.VMC_APP_PORT) || 3000, function() {
  return console.log('Listening...');
});


