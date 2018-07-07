var express = require('express')
var bodyParser = require('body-parser')
var path = require('path');
var app = express();

//Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.use('/apis/login', require('./routes/apis/loginModule'));
app.use('/apis/register', require('./routes/apis/registerModule'));


app.get('/login', function(req, res){
    res.render('loginPage', {title : 'Login Page'}); 
});
app.get('/', function(req, res){
    res.render('index', {title : 'Recommender Systems demo'});
});

app.post('/register', function(req, res){
    res.render('registerPage', {title:'Register Page'});
});



app.listen(3000, function(err){
    if(err){
        throw err;
    }
    console.log("Server listening on port number 3000");
})