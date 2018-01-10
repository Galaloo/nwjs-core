module.exports = function(browser) {
	this.landing = function() {
		var home = browser.page.home();
		 
		browser
		.url(browser.launch_url)
		.waitForDocumentLoaded(60000, "Site loaded")
		.pause(1000);
	    
		return browser;
	};
	
	
};

