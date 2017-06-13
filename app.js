/* Initialization */
var express = require('express');
var exphbs  = require('express-handlebars');

var app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('files'));



app.get('/', function (req, res) {
    res.render('home',{userName:"Marc-Antoine"});
});

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

/* Listen port */
app.listen(1234, function () {
  console.log('Our app listening on port 1234!')
})