/* Initialization */
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('files'));

//Including stuff
var routes = require('./routes/index');
var users = require('./routes/users');

app.use('/', routes);
app.use('/users', users);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//jquery
/*var jquery = require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 *
    var $ = require("jquery");
/*});*

var jsdom = require('jsdom').jsdom;
 var document = jsdom('<html></html>', {});
 var window = document.defaultView;
 var $ = require('jquery')(window); */

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/adeline';

/* //Mongo db accessible
app.use(function(req,res,next){
    req.db = db;
    next();
}); 
*/

/* Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to DB");
  // End of MongoDb Connection
 //db.close();
});*/

/*
// ADD TEST PAGE
app.get('/add', function (req, res) {
    res.render('add',{userName:"Marc-Antoine"});
});
*/

/* Listen port */
app.listen(3000, function () {
  console.log('Our app listening on port 3000!')
})






/**** Example for later ********/
/*
app.get('/game', function (req, res) {
    res.render('game',{userName:"Marc-Antoine", gameHistory:hist});
});

app.get('/game/:playerchoice/', function (req, res) {
    var serverPick = randomPick(),
        playerPick = req.params.playerchoice;

    res.render("game",{
        serverChoice: serverPick,
        playerChoice : playerPick,
        gameResult:confrontation(serverPick,playerPick),
        gameHistory:recordHist(serverPick,playerPick),
    });
    
})
*/