var util = require('util');
var events = require('events');

function InfiniteScrollToBottom() {
  events.EventEmitter.call(this);
}

util.inherits(InfiniteScrollToBottom, events.EventEmitter);

InfiniteScrollToBottom.prototype.command = function(callback) {
	
	var self = this, 
	testList = [], 
	x=1
	articleSelector = "w-100 w-50-m w-25-l pa2 pa3-ns",
	loadingIndicator = "//*[@id='layout']/div[2]/div/div/div[2]";
	
		
	self.api
	.useXpath();
	
	//iOS needs a "touch" event before Selenium can scroll down
	self.api
	.pause(1000)
	.elements('css selector', articleSelector, function(result){
		result.value.forEach(function(element){ //get all of the articles
			self.api.elementIdAttribute(element.ELEMENT, 'href', function(result) {
	            console.log("this was the result" +result.value);
	            testList.push(result.value);
	        });
		});
	});

	testList.pop;
	self.api.elementIdClick(testList)

	//Scroll down to get the loading indictor running
	self.api.execute(function () {document.getElementById("Mark").scrollIntoView();}, [], function() {			
		self.api.execute(function() { window.scrollBy(0, -400); }, []);
			  self.api.ifElementVisible(loadingIndicator ,15000,false, function(result){
				  if(result.value){//The indicator is running. Wait for it to stop then exit with "more" condition.
			        	x++
						self.api.waitForElementNotPresent(loadingIndicator, 60000, function() {
								callback.call(self, "more");
								  self.emit('complete');
					  });						  
				    }else{//No indicator. Looks like we are at the bottom.
						callback.call(self, "done", x);
						self.emit('complete');
				  }
			  });
			
			
			
	}); 
	
};

module.exports = InfiniteScrollToBottom;

