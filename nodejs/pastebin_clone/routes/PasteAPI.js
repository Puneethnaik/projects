//mysql 
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

var getPrivatePastes = function(userID){
    //return private pastes belonging to the user
    connection.query("select title, body from Paste where email = '" + userID + "' and exposure = 'private';", function(err, results, fields){
        if(err){
            console.log("Some error occured");
        }
        else {
            return results;
        }
    })
}

module.exports = {
    getPrivatePastes : getPrivatePastes,
    getPublicPastes : getPublicPastes
}