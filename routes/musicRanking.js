var express = require('express');
var router = express.Router();
//配置模块
var settings = require('../settings');
//
var mysql = require('mysql');


/* GET home page. */
router.get('/', function(req, res, next) {

  //
  var connection = mysql.createConnection(settings.db);
  connection.connect();

  //查询
  var selectSQL = 'select * from `music_info`';

  var arr = [];
  connection.query(selectSQL, function (err, rows) {
    if (err) throw err;
    for (var i = 0; i < 100; i++) {
      if(rows[i].Name_music==null || rows[i].Name_music=='' || rows[i].Image_music =='undefined')
        continue;
      arr.push({name: rows[i].Name_music, url: rows[i].Url_music, img: rows[i].Image_music});
      if(arr.length>12)
        break;
    }
    res.render('musicRanking', { title: '音乐排行榜',datas: arr});
  });
  //关闭连接
  connection.end();
});
module.exports = router;