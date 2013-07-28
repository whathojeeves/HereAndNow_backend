 var express = require('express');
 var app = express();

 var mysql = require('mysql');
 var connection = mysql.createConnection({
 	 host: 'localhost',
 	 user: 'root',
 	 password: 'nodeapp'
 });
 
 var result = new Array();
 
 connection.connect();
 connection.query('use nodeapp',function(err,rows,fields){
 	if(err)
 	{
 		console.log(err);
 	}
 });
 connection.query('SELECT * FROM test_table', function(err,rows,fields){
 	if(err)
 	{
 		console.log(err);
 	}
 	else
 	{
      for(var i=0; i<rows.length; i++)
      {
         result[rows[i].location_id] = {'id' : rows[i].id, 'playlist' : rows[i].name};
 		   console.log(rows[i].id+" "+rows[i].name);
      }
 	}
 });

 connection.end();

 app.get('/', function(req,res){

    res.type('text/plain');
    res.send('You are home. Your playlist information: '+result);
    });

 app.get('/location/:id', function(req,res){

    res.type('text/plain');
    res.send('Location and Playlist: '+result[req.params.id].id+' '+result[req.params.id].playlist);
    });

 app.listen(8000);
