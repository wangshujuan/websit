var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('booklist', {name1:'value1', name2:'value2'});
});

module.exports = router;

    Comment = require('../read.js'),
    TITLE_REG = '排行榜';

router.get('/', function(req, res) {
    var  comment = new Comment();
    comment.readComment(function(err,result){
        if(err) {
            res.status(404).end(err);
        }else{
            res.render('booklist', {ID:'results.ID_music',Name:'  results.Name_music',Url:' results.Url_music',Image:'results.Image_music'});
        }
    });
});