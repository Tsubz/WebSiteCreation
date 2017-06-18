/* Initialization */
var express = require('express');
var exphbs  = require('express-handlebars');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var multer = require('multer');
var assert = require('assert');
var path = require('path');
var db = require('./helpers/db');
// Connection URL
var url = 'mongodb://localhost:27017/adeline';

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'files')));

// Body Parser form static forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Including Routes
var routes = require('./routes/index');
var admin = require('./routes/admin');
var project = require('./routes/project');

app.use('/', routes);
app.use('/admin', admin);
app.use('/project', project);

// Connect to Mongo on start
db.connect(url, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
    app.listen(1234, function () {
      console.log('Our app listening on port 1234!');
    });
  }
});
