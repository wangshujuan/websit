var mysql = require('MySQL');
var pool = mysql.createPool({
    host: '220.165.246.91',
    user: 'stutest',
    password: '1q2w3eStuTest',
    database:'info',
    port: 3301
});
var  info;


var Crawler = require("Crawler");
var url = require('url');

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        var datas=[];
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        $('a').each(function(index, a) {
            var imgSrc;
            var jA=$(a);
            var aName = jA.text();                        //对item的aName定义
            var toQueueUrl = jA.attr('href');             //对item的Url定义
            var imgs = jA.find('img');
            imgs.each(function(j, img) {
                imgSrc = $(img).attr('src');
            });
            var item={Name:aName,Url:toQueueUrl,Image:imgSrc};          //sql表中应包含的属性
            datas.push(item);
            c.queue(toQueueUrl);
        });
        writeDatas(datas);                                //将队列中的数据写入数据库
    }
});
c.queue('http://www.kugou.com/');             //根据需求选择所爬取的网址

function writeDatas(items) {                           //写入数据的循环语句
    pool.query('USE '+ info);
    for (var i = 0; i < items.length; i++) {
        var item = items[i];

        console.log( "Name:" + item.Name, ", Url:" + item.Url, ", Image:" + item.Image);    //直接显示在屏幕
        var cmd='INSERT INTO music_info (Name_music, Url_music, Image_music) '
            + 'values( "'+item.Name+'\","'+item.Url+'\" ,"'+item.Image+'\" )';

       pool.query(cmd,function(err, rows, fields) {
            if (err) throw err;
         //
        });
    }


    pool.getConnection(function(err, connection) {
    });

    }
