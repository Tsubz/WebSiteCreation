var express = require('express');
var multer = require('multer');
var assert = require('assert');
var router = express.Router();
var async = require("async");
var db = require('../helpers/db');
var path = require('path');

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
  storage: storage,
  fileFilter: function (req, file, cb) {

  var filetypes = /jpeg|jpg|png/;
  var mimetype = filetypes.test(file.mimetype);
  var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("Error: File upload only supports the following filetypes - " + filetypes);
}
});

//var MongoClient = require('mongodb').MongoClient;

// ADMIN PAGE
router.get('/', function(req, res) {
  var img_data = [];
  var pjcts = [];

  var img_cursor = db.get().collection('ade_imgs').find();
  var pj_cursor = db.get().collection('ade_project').find();

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

/* Upload Images */
router.post('/upload_img', upload.any(), function(req, res) {

  // Inserting into database 'Imgs' collection

  var addImg = db.get().collection("ade_imgs");

  var file;
  for (var i = 0; i < req.files.length; i++) {
    console.log(req.files[i].originalname);
    file = '/img/' + req.files[i].originalname;

    addImg.update({
      'filename': file,
    }, {
      'filename': file,
    }, {upsert : true});
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
  var addProject = db.get().collection("ade_project");

  addProject.update({'projectname': projectname}, {
    'projectname': projectname,
    'projectdesc': projectdesc,
  }, {upsert : true}, function(err, doc) {
    if (err) res.send('Problem occured when inserting in project collection');
    else {
      console.log("Inserted");
      res.location('admin');
      res.redirect('/admin');
    }
  });
});


/* Associate images with project */
router.post('/checkboxes', function(req, res) {
  // Get POST values
  var projectname = req.body.selected;
  var checkimg = req.body.checkimg;
  var featuredimg = req.body.featuredimg;

  if (checkimg.constructor !== Array) {
    checkimg = [checkimg];
  }

  console.log('POST VALUES: ' + checkimg);
  console.log('FEATURED: ' + featuredimg);

  // Inserting into database 'img_pj' collection
  var img_pj = db.get().collection("ade_img_pj");

  if (typeof featuredimg === 'undefined') {
    img_pj.update({'projectname': projectname},{
      'projectname': projectname,
      'projectimgs': checkimg,
      'featuredimg': featuredimg,
    }, {upsert : true}, function(err, doc) {
      if (err) res.send('Problem occured when inserting in img_pj collection');
      else {
        console.log("Inserted");
        res.location('admin');
        res.redirect('/admin');
      }
    });
  }
  //Calling "if" to check if featuredimg is string or Array (incorrect)
  else if (featuredimg.constructor === Array) {
    console.log("Two featured checkboxes were selected, nothing happened");
    res.location('admin');
    res.redirect('/admin');
  }
  else {
    // Removing the featured element from list of images
    var i = checkimg.indexOf(featuredimg);
    console.log(i);
    if(i != -1) {
    	checkimg.splice(i, 1);
    }

    // Inserting into database 'img_pj' collection
    img_pj.update({'projectname': projectname},{
      'projectname': projectname,
      'projectimgs': checkimg,
      'featuredimg': featuredimg,
    }, {upsert : true}, function(err, doc) {
      if (err) res.send('Problem occured when inserting in img_pj collection');
      else {
        console.log("Inserted");
        res.location('admin');
        res.redirect('/admin');
      }
    });
  }
});

module.exports = router;
