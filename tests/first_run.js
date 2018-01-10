
module.exports = {
	'@tags' : [ 'example'],
	'@disabled' : false,

	'Intialize' : function(browser) {
		browser.launch();
		
	},
	
	'Open Menu' : ''+function(browser) {

	},

		
	'Close browser' : function(browser) {
		browser
		//.pause(10000)
		.end();

	}
};