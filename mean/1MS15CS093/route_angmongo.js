var express = require('express');  
var bodyParser = require('body-parser'); 
var ejs = require('ejs');
var MongoClient = require('mongodb').MongoClient;
var app = express();  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// Connect to the db

MongoClient.connect("mongodb://127.0.0.1/mydb", function(err, db) {
 if(!err) {
    console.log("We are connected");

app.use(express.static('public')); //making public directory as static directory  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('view engine', 'ejs');



app.get('/index', function (req, res) {
  db.collection('candidatesList').find().toArray(
    function(err , candidate){
       if (err) return console.log(err)
       console.log(candidate);
       //candidate = candidate;
       processFurther(candidate);
       //res.render('vote.ejs',{candidates: candidate})  
    });
    processFurther = function(candidate){
      //console.log("candidate list : " + JSON.stringify(candidate));
      db.collection('candidatesList').find({}, {
        "name": 1, 
        "count" : 1
      }).toArray(function(err, names){
        processFurther1(candidate, names);
      });  
      
    } 
    processFurther1 = function(candidate, names){
      console.log("names" + JSON.stringify(names));
      res.render('dashboard.ejs', {candidates : candidate, names: names});
    }   
})  

app.get('/insert.html', function (req, res) {
    res.sendFile( __dirname + "/" + "insert.html" );
})
/* to access the posted data from client using request body (POST) or request params(GET) */
//-----------------------POST METHOD-------------------------------------------------

app.post('/voteCandidate', function (req, res) { 
  // Submit to the DB
  console.log("voterCandidate recieved" + JSON.stringify(req.body));
    db.collection('candidatesList').update({name:req.body.candidateName}, {$inc:{count:1}});
    
      // console.log("Sent data are (GET): EmpID :"+empid+" and Employee name :"+empname);
      // res.end("Employee Inserted-->"+JSON.stringify(newEmp));
  }) 

//--------------SEARCH------------------------------------------
app.get('/search.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "search.html" );    
})

app.get("/search", function(req, res) {
	//var empidnum=parseInt(req.query.empid)  // if empid is an integer
	var empidnum=req.query.empid;
    db.collection('canidatesList').find({party: partyName}).toArray(function(err, docs) {
    if (err) {
      console.log(err.message+ "Failed to get data.");
    } else {
      res.status(200).json(docs);
    }
  });
  });
  // --------------To find "Single Document"-------------------
	/*var empidnum=parseInt(req.query.empid)
    db.collection('employee').find({'empid':empidnum}).nextObject(function(err, doc) {
    if (err) {
      console.log(err.message+ "Failed to get data");
    } else {
      res.status(200).json(doc);
    }
  })
}); */

//--------------DELETE------------------------------------------
app.get('/delete.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "delete.html" );    
})

app.get("/delete", function(req, res) {
	//var empidnum=parseInt(req.query.empid)  // if empid is an integer
	var empidnum=req.query.empid;
	db.collection('candidatesList', function (err, data) {
        data.remove({"name":name}, function(err, result){
				if (err) {
					console.log("Failed to remove data.");
			} else {
				res.send(result);
				console.log("Employee Deleted")
			}
        });
    });
    
  });
app.get('/vote', function (req, res) { 
//-----DISPLAY IN JSON FORMAT  -------------------------
/*db.collection('employee').find({}).toArray(function(err, docs) {
    if (err) {
      console.log("Failed to get data.");
    } else 
	{
		res.status(200).json(docs);
    }
  });*/
//-------------DISPLAY USING EMBEDDED JS -----------
db.collection('candidatesList').find().toArray(
 		function(err , candidate){
        if (err) return console.log(err)
        console.log(candidate);
        res.render('vote.ejs',{candidates: candidate})  
     })
//---------------------// sort({empid:-1}) for descending order -----------//
}) 

app.get('/about', function (req, res) {  
   console.log("Got a GET request for /about");  
   res.send('MSRIT, Dept. of CSE');  
})  
 
var server = app.listen(5000, function () {  
var host = server.address().address  
  var port = server.address().port  
console.log("Example app listening at http://%s:%s", host, port)  
})  
}
else
{   db.close();  }
  
});
