var express = require('express');
var multer = require('multer');
var assert = require('assert');
var router = express.Router();
var async = require("async");
var db = require('../helpers/db');

// Multer Storage Info //
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'files/img');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({
  storage: storage
});

//var MongoClient = require('mongodb').MongoClient;

// ADMIN PAGE
router.get('/', function(req, res) {
  var img_data = [];
  var pjcts = [];

  var img_cursor = db.get().collection('imgs').find();
  var pj_cursor = db.get().collection('project').find();

  async.parallel(
    [
      function(cb) {
        img_cursor.forEach(function(doc, err) {
          assert.equal(null, err);
          img_data.push(doc);
        }, cb);
      },
      function(cb) {
        pj_cursor.forEach(function(doc, err) {
          assert.equal(null, err);
          pjcts.push(doc);
        }, cb);
      }
    ],
    function(err, results) {
      res.render('admin', {
        pagetitle: 'admin Page',
        imgdata: img_data,
        pjdata: pjcts,
      });
    }
  );
});

/* Upload Image -- single('exInputFile')*/
router.post('/upload_img', upload.any(), function(req, res) {

  // Inserting into database 'Imgs' collection

  var addImg = db.get().collection("imgs");

  var file;
  for (var i = 0; i < req.files.length; i++) {
    console.log(req.files[i].originalname);
    file = '/img/' + req.files[i].originalname;

    addImg.insert({
      'filename': file,
    });
  }
  res.location('admin');
  res.redirect('/admin');
});

/* Create Project */
router.post('/addproject', function(req, res) {

  // Get POST values
  var projectname = req.body.projectname;
  var projectdesc = req.body.projectdesc;

  console.log('POST VALUES: ' + projectname + ' ' + projectdesc);

  // Inserting into database 'Project' collection
  var addProject = db.get().collection("project");

  addProject.insert({
    'projectname': projectname,
    'projectdesc': projectdesc,
  }, function(err, doc) {
    if (err) res.send('Problem occured when inserting in project collection');
    else {
      console.log("Inserted");
      res.location('admin');
      res.redirect('/admin');
    }
  });
});


/* Create Project */
router.post('/checkboxes', function(req, res) {

  // Get POST values
  var checkimg = req.body.checkimg;
  var projectname = req.body.selected;

  console.log('POST VALUES: ' + checkimg);

  // Inserting into database 'img_pj' collection
  var img_pj = db.get().collection("img_pj");

  img_pj.insert({
    'projectname': projectname,
    'projectimgs': checkimg,
  }, function(err, doc) {
    if (err) res.send('Problem occured when inserting in img_pj collection');
    else {
      console.log("Inserted");
      res.location('admin');
      res.redirect('/admin');
    }
  });
});

module.exports = router;
