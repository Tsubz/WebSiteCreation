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

  // ADMIN PAGE
  router.get('/', function(req, res) {
    var img_data = [];
    var pjcts = [];
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected to DB");

      var img_cursor = db.collection('imgs').find();
      var pj_cursor = db.collection('project').find();

      img_cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        img_data.push(doc);
      }, function() { //Callback function
        pj_cursor.forEach(function(doc, err) {
          assert.equal(null, err);
          pjcts.push(doc);
        }, function() { //Second Callback

        db.close();
        console.log("DB Closed");

        res.render('admin', {
          title1: 'admin Page',
          imgdata: img_data,
          pjdata: pjcts,
        });
    });
      });
  });
});

/* Upload Image */
router.post('/upload_img', upload.single('exInputFile'), function(req, res) {

  console.log(req.file);

  var file = '/img/'+req.file.originalname;

  // Inserting into database 'try' collection
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected to add element");

    var addImg = db.collection("imgs");

    addImg.insert({
      'filename': file,
    }, function(err, doc) {
      if (err) res.send('Problem occured when inserting in try collection');
      else {
        console.log("Inserted");
        res.location('admin');
        res.redirect('/admin');
      }
    });
    // End of MongoDb Connection
    db.close();
  });
});

/* Create Project */
router.post('/addproject', function(req, res) {

  // Get POST values
  var projectname = req.body.projectname;
  var projectdesc = req.body.projectdesc;

 console.log('POST VALUES: ' + projectname + ' ' + projectdesc);

  // Inserting into database 'try' collection
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected to add element");

    var addProject = db.collection("project");

    addProject.insert({
      'projectname': projectname,
      'projectdesc': projectdesc,
    }, function(err, doc) {
      if (err) res.send('Problem occured when inserting in try collection');
      else {
        console.log("Inserted");
        res.location('admin');
        res.redirect('/admin');
      }
    });
    // End of MongoDb Connection
    db.close();
  });
});


module.exports = router;
