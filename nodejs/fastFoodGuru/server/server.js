var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var port = 3000;
var url = "mongodb://127.0.0.1/fast_food_guru";
var database_object;//We will establish a single connection object to the mongodb database.

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function(err){
    if(err){
        throw err;
    }
    //Establishing Mongo Connection
    MongoClient.connect(url, function(err, db){
        if(err){
            throw err;
        }
        else {
            database_object = db;
            console.log("We are connected successfully to the mongodb database.");
        }
    })
    console.log("Server established and running on port " + port);
});