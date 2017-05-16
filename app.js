var express = require('express')
var app = express()

var choice = [rock, paper, scissors],
    serverPick;

function serverPlay() {
    serverPick = choice[Math.round(Math.random()*3)];
}

function confrontation(server, player) {
    switch (server) {
        case "rock":
            switch (player) {
                case "rock":
                return "Same, try again";
                break;
                case "paper":
                return "Server wins";
                break;
                case "scissors":  
                return "Player wins";
                break;
            }
            break;
    }
}

app.get('/', function (req, res) {
  res.send('Hello You!')
})

app.get('/rock', function (req, res) {
  res.send('confrontation(serverplay(), "rock"');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})