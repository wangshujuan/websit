var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var fs = require('fs');//
//配置模块
var settings = require('./settings');
//连接数据库

var app = express();
//var http = require("http");
// view engine setup
app.set('port',3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//
app.engine('.html', require('ejs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//
var routes = require('./routes/music');
//var users = require('./routes/users');

app.use('/', routes);
//
var files = fs.readdirSync('./routes');     //Sync
for(var i in files)
{
  var name = files[i].replace('.js','');
  //
  if(name!='index')
    app.use('/'+name,require('./routes/'+name));

}

//app.use('/help',  require('./routes/help'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/*
 http.get("http://code.visualstudio.com", function(res) {
 res.render('index', {msg : res.statusCode});
 console.log("HTTP Response! : " + res.statusCode);
 })
 .on('error', function(e) {
 console.log("Error' : " + e.message);
 });
 */

module.exports = app;





var connection = mysql.createConnection(settings.db);
connection.connect();

//查询
var selectSQL = 'select * from `music_info`';

var arr = [];
connection.query(selectSQL, function(err, rows) {
  if (err) throw err;

  for (var i = 0; i < rows.length; i++) {
    arr[i] = rows[i].name;
  }

  //把搜索值输出
  app.get('/', function(req, res) {
    res.send(arr);
  });


});
//关闭连接
connection.end();
//app.listen(3000);