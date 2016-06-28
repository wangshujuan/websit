var express = require('express');
var router = express.Router();
//var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('music', { title: 'Express' });
});

/*
fs.readfile('read.js','utf-8',function(err,data){
  if(err){
    console.error(err);
  }
  else{console.log(data);
  }
});
console.log('end.');
*/

module.exports = router;