/**
 * Created by Shujuan Wang on 2016/6/26.
 */
var mysql = require('mysql');
var TEST_DATABASE = 'info';
var TEST_TABLE = 'music_info';

//创建连接
var client = mysql.createConnection({
    host: '220.165.246.91',
    user: 'stutest',
    password: '1q2w3eStuTest',
    database:'info',
    port: 3301
});


function  Comment() {};
module.exports= Comment;



client.connect();
client.query("USE " + TEST_DATABASE);


client.query(
    'SELECT * FROM '+ TEST_TABLE,
    function Comment(err, results,fild) {
        if (err) {
            throw err;
        }

        if(results)
        {
            for(var i = 0; i < results.length; i++)
            {
                console.log("%d\t%s\t%s\t%s", results[i].ID_music, results[i].Name_music, results[i].Url_music, results[i].Image_music);
               // console.log("invoked[TEST_TABLE]");
            }
        }
        client.end();
    }

);



