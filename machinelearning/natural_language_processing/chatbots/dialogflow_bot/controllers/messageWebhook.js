var processMessage = require('../helpers/processMessage');
module.exports = (req, res) => {
    console.log('request body' + JSON.stringify(req.body));
    if(req.body.object === 'page'){
        req.body.entry.forEach(entry => {
            entry.messaging.forEach(event =>{
                if(event.message && event.message.text){
                    processMessage(event);
                    console.log(JSON.stringify(event));
                }
            })
        });
        res.status(200).end();
    }
};