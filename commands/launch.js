module.exports = {
		  command: function() {
		    var self = this;

		    self
			.url(self.launch_url)
			.waitForDocumentLoaded(60000, "Site loaded");
		    
			return this;
		  },
		};