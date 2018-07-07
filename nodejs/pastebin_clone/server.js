var express = require('express');
var bodyParser = require('body-parser');
var login = require('./routes/loginRoutes');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var router = express.Router();
router.get('/', function(req, res){
    res.json("Welcome to this pastebin clone.");
    console.log("hello");
});

router.post('/register', login.register);
router.post('/login', login.login);

app.use('/api', router);

app.listen(3000, function(req, res){
    console.log("We are connected");
});


