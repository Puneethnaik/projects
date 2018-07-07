var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var models = require('../../backend/schema');


var router = express.Router();

router.post('/', function(req, res){
    var userData = {
        email:req.body.email,
        password:req.body.password,
        userName:req.body.userName
    }
    if(req.body.password == req.body.confPassword){
        res.redirect('/error');
    }
    else{
        models.User.create(userData, function(err,user){
            if(err){
                return next(err);
            }
            else{
                res.redirect('/');
            }
        });
    }
});

module.exports = router;