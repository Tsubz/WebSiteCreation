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

/* Listen port */
app.listen(1234, function () {
  console.log('Our app listening on port 1234!')
})