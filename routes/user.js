var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/adeline';


/* INSERT user */
router.post('/insert_user', function(req, res) {
 
      // Get POST values
      var userName = req.body.name;
      var userSurname = req.body.surname;
      console.log('POST VALUES: ' + userName + ' ' + userSurname);

      // Fetch from 'users' collection
      MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected to add element");

            var tryCo = db.collection("try");

            tryCo.insert({
                  'username' : userName,
                  'usersurname' : userSurname
            }, function(err, doc) {
                  if(err) res.send('Problem occured when inserting in users collection');
                  else {
                        console.log("Inserted");
                        res.location('user');
                        res.redirect('/user');
                  }
            });

            // End of MongoDb Connection
      db.close();
      });      
});


/* NEW user */
router.get('/new', function(req, res) {
      res.render('user-new');
});


module.exports = router;