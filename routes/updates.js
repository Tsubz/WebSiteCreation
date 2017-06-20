var express = require('express');
var assert = require('assert');
var router = express.Router();
var async = require("async");
var db = require('../helpers/db');

// ADMIN Update page - Update & delete
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
      res.render('updates', {
        pagetitle: 'Updates Page',
        imgdata: img_data,
        pjdata: pjcts,
      });
    }
  );
});

/* Remove project */
router.post('/removeProject', function(req, res) {
  // Get POST value
  var projectname = req.body.selected;

    // Inserting into database 'img_pj' collection

    db.get().collection("ade_project").remove({'projectname': projectname}, function(err, doc) {
    if (err) throw err;
        console.log("Deleted");
        res.location('updates');
        res.redirect('/updates');
    });
});
/* Unbind Images from project */
router.post('/unbindImages', function(req, res) {
  // Get POST value
  var projectname = req.body.selected;

  // Inserting into database 'img_pj' collection

  db.get().collection("ade_img_pj").remove({
    'projectname': projectname
  }, function(err, doc) {
    if (err) throw err;
    console.log("Deleted");
    res.location('updates');
    res.redirect('/updates');
  });
});

/* Associate images with project */
router.post('/deleteImages', function(req, res) {

  var checkimg = req.body.checkimg;

  console.log('POST VALUES: ' + checkimg);

if (checkimg.constructor !== Array) {
  db.get().collection("ade_imgs").remove({
    'filename': checkimg
  }, function(err, doc) {
    if (err) throw err;
    console.log("Deleted");
    res.location('updates');
    res.redirect('/updates');
  });
}
else {
  async.parallel(
    [
      function(cb) {
        for (var i = 0; i < checkimg.length; i++) {
          console.log(checkimg[i]);

          db.get().collection("ade_imgs").remove({
            'filename': checkimg[i]
          });
          console.log("Deleted");
        }
        cb();
      }
    ],
    function(err, results) {
      res.location('updates');
      res.redirect('/updates');
    }
  );
}
});

module.exports = router;
