/* Initialization */
var express = require('express');
var exphbs = require('express-handlebars');
var multer = require('multer');
var assert = require('assert');
//var upload = multer({ dest: 'files/img' });

var app = express();

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

/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));*/

app.use('/', routes);
app.use('/user', user);


// ADD TEST PAGE
app.get('/user', function(req, res) {
        res.render('user', {
          userName: "Marc-Antoine"
        });
});


/* Listen port */
app.listen(1234, function() {
  console.log('Our app listening on port 1234');
});



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
