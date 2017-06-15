/* Initialization */
var express = require('express');
var exphbs = require('express-handlebars');
var multer = require('multer');
var assert = require('assert');
var app = express();

var router = express.Router();
app.use(router);

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('files'));

//MongoDB
var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/adeline';

//Including Routes
var routes = require('./routes/index');
var user = require('./routes/user');

app.use('/', routes);
app.use('/user', user);

  // TEST PAGE
  router.get('/user', function(req, res) {
    res.render('user', {
      title1: 'User Page'
    });
  });

/* Listen port */
app.listen(1234, function() {
  console.log('Our app listening on port 1234');
});
