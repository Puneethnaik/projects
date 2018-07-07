var API_AI_TOKEN = '980ed837a698470ebd7dc1c31f830cdb';
var apiAiClient = require('apiai')(API_AI_TOKEN);
var FACEBOOK_ACCESS_TOKEN = 'EAADpUkBFvZAoBACgFosogfJlkuL060t70bIPsERs3NcriJhpLl0kSnWhxNCMGLXddOvMXZC6BiB8Y0UBjPm58sg3zTCY4qteTSpuwX8a9F5hzZBhS9Chrruu5aO3QvQ848kcQCTnZCWBVHoPYYI3vkFoqeTNCTiUDZAYRV62NZCgi2xckW87k7';
var request = require('request');
var sendTextMessage = (senderId, text) => {
 request({
 url: 'https://graph.facebook.com/v2.6/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: 'POST',
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};
module.exports = (event) => {
 const senderId = event.sender.id;  
 const message = event.message.text;
const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};