var express = require('express');
var router = express.Router();

//mysql code

var mysql  = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'pastebin'
})

connection.connect(function(err){
    if(err){
        console.log("something wrong. Could not connect with database");
    }
    else console.log("mysql successfully connected");
})
//

router.post('/', function(req, res){
    console.log("This is processing the paste");
    console.log("the request body is " + JSON.stringify(req.body));
    var timestamp = new Date();
    timestamp = timestamp.getTime();
    console.log("the timestamp now is " + timestamp);
    var paste = {
        email : req.session.user,
        timestamp : timestamp,
        expiryDuration : req.body.pasteExpiration,
        title : req.body.pasteTitle,
        body : req.body.pasteBody,
        exposure : req.body.pasteExposure 
    }
    connection.query("INSERT INTO Paste SET ?", paste, function (error, results, fields) {
        if (error) {
          console.log("error ocurred",error);
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }else{
          console.log('The solution is: ', results);
          res.redirect('/profile');
        }
    });
})
module.exports = router;