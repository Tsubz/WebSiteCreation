var express = require('express');
var assert = require('assert');
var async = require("async");
var db = require('../helpers/db');
var router = express.Router();

/* Project Page / retrieving project names */
router.get('/:projectname/', function(req, res) {
  var pjcts = [];
  var pjcts_img = [];
  var pjct_current = [];
  var pjct_desc = '';
  var projectname = req.params.projectname;

  var pj_cursor = db.get().collection('project').find();
  var pj_desc_cursor = db.get().collection('project').find({
    'projectname': projectname
  });
  var pj_img_cursor = db.get().collection('img_pj').find({
    'projectname': projectname
  });

  async.parallel(
    [
      function(cb) {
        pj_cursor.forEach(function(doc, err) {
          assert.equal(null, err);
          pjcts.push(doc);
        }, cb);
      },
      function(cb) {
        pj_img_cursor.forEach(function(doc, err) {
          assert.equal(null, err);
          pjcts_img.push(doc);
        }, cb);
      },
      function(cb) {
        pj_desc_cursor.forEach(function(doc, err) {
          assert.equal(null, err);
          pjct_current.push(doc);
        }, cb);
      }
    ],
    function(err, results) {
      async.parallel(
        [
          function(cb) {
            var i = pjcts_img.indexOf([]);
            if (i != -1) {
              pjcts_img.splice(i, 1);
            }
            cb();
          },
          function(cb) {
            pjct_desc = pjct_current[0].projectdesc;
            console.log(pjct_desc);
            cb();
          }
        ],
        function(err, results) {
          res.render('project', {
            pagetitle: 'Projects',
            projectname: projectname,
            pjdata: pjcts,
            images: pjcts_img,
            pjct_desc: pjct_desc,
          });
        }
      );
    }
  );
});

module.exports = router;
