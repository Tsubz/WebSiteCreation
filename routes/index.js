var express = require('express');
var assert = require('assert');
var async = require("async");
var db = require('../helpers/db');
var router = express.Router();

/* Home Page / retrieving project names */
router.get('/', function(req, res) {
  var pjcts = [];
  var pj_cursor = db.get().collection('ade_project').find();

  async.parallel(
    [
      function(cb) {
        pj_cursor.forEach(function(doc, err) {
          assert.equal(null, err);
          pjcts.push(doc);
        }, cb);
      }
    ],
    function(err, results) {
      res.render('index', {
        pagetitle: 'Adeline Betton',
        pjdata: pjcts,
      });
    }
  );
});

module.exports = router;
