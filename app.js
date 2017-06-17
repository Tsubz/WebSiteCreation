/* Initialization */
var express = require('express');
var exphbs  = require('express-handlebars');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var multer = require('multer');
var assert = require('assert');
var path = require('path');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'files')));

// Body Parser form static forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    res.render('home',{userName:"Marc-Antoine"});
});

//Including Routes
var routes = require('./routes/index');
var admin = require('./routes/admin');

app.use('/', routes);
app.use('/admin', admin);

/* Listen port */
app.listen(1234, function () {
  console.log('Our app listening on port 1234!');
});
