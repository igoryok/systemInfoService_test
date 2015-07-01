var express = require('express');
var router = express.Router();
var os = require('os');
var SystemInfo = require('../models/SystemInfo');
var cpu = require('windows-cpu');
var orm = require('orm');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/systemInfo', function(req, res) {
    orm.SystemInfo.find(function (err,data) {
        res.json(data);
    });
});

router.get('/cpuLoad', function(req, res) {
    cpu.totalLoad(function (err,result) {
        res.json(result);

    })

});

router.get('/summary', function(req, res) {
    orm.getAggregatedInfo(function(err, rows){
        res.json(rows);
    })

});

module.exports = router;
