var express = require('express');
var multer = require('multer');
var assert = require('assert');
var router = express.Router();

// Multer Storage Info //
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'files/img');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({storage: storage});

// Connection URL
var url = 'mongodb://localhost:27017/adeline';
var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

  // TEST PAGE
  router.get('/user', function(req, res) {
    res.render('user', {
      title1: 'User Page'
    });
  });

/* INSERT user */
router.post('/upload_img', upload.single('exInputFile'), function(req, res) {

  console.log(req.file);

  var file = req.file.originalname;

  // Inserting into database 'try' collection
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected to add element");

    var tryCo = db.collection("try");

    tryCo.insert({
      'filename': file,
    }, function(err, doc) {
      if (err) res.send('Problem occured when inserting in try collection');
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

router.get('/get-data', function(req, res, next) {
  var img_data = [];

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected to DB");

    var cursor = db.collection('try').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      img_data.push(doc);
    }, function() {
      db.close();
      console.log("DB Closed");
      res.render('user', {
        userName: "Marc-Antoine",
        imgdata: img_data,
      });
    });
  });
});


module.exports = router;
