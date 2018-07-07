var express = require('express');
var bodyParser = require('body-parser');
var verification = require('./controllers/verification');
var messageWebhookController = require('./controllers/messageWebhook');

var app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get('/', (req, res) =>{
    console.log("hello world");
    res.status(200).send('hello world');
});
app.post('/', (req, res) => {
    console.log("request body is " + JSON.stringify(req.body));
    return res.json({
        speech: 'hello hi how',
        displayText: 'hello hi how',
        source: 'team info'
    });
});


 app.listen(3000, (err) => {
    if(!err){
        console.log("web hook server connected successfully!!!");
    }
}); 
