/*
 * 
 var takeScreenshot = require('../../../pages/takeScreenshot.js');

		takeScreenshot(browser, function(result){
			browser
			.verify.visible('div#ml-mm-glass.ml-mm-glass')
		});


 */


const request = require('request');
module.exports = function takeSnapshot(browser, callback) {
  var result = { error: false, message: null }  
  if (browser.sessionId){
    request.post(
      'https://crossbrowsertesting.com/api/v3/selenium/' + browser.sessionId + '/snapshots', 
      function(error, response, body) {
        if (error) {
          result.error = true;
          result.message = error;
        } else if (response.statusCode !== 200){
          result.error = true;
          result.message = body;
        } else {
          result.error = false;
          result.message = 'success';
        }
     }
    ).auth(browser.options.username, browser.options.accessKey);   
 } else {
   result.error = true;
   result.message = 'Session Id was not defined';
   console.log('Session Id was not defined');
 }
// return result;
  callback(result);
}
