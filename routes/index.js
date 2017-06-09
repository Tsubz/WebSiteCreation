var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('home', {title1:'Home Now'});
});

module.exports = router;