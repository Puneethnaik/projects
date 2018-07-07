var express = require('express');
var rethink = require('rethinkdb');
var bodyParser = require('body-parser');
var schema = require('../../backend/schema');

var router = express.Router();


router.post('/', function(req, res){
    var recievedData = {
        email:req.body.email,
        password:req.body.password
    }
    schema.User.find({email:recievedData.email, password:recievedData.password}, function(err, user){
        if(err){
            console.log("Error");
            res.redirect('/error');
        }
        else{
            console.log("profile");
            res.render('/profile', {userDetails:user});
        }
    });
    console.log("first : it reached here");
});
module.exports = router;