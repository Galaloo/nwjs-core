/*https://github.com/jls/nightwatch-html-reporter*/

var HtmlReporter = require('nightwatch-html-reporter');
var reporter = new HtmlReporter({
	openBrowser : false,
	reportsDirectory : __dirname + '/reports',
	/*
	 * The theme that will be used to generate the html report. This should
	 * match a directory under the lib/themes directory.
	 */
	themeName : 'cover',

	/* If true then only errors will be shown in the report. */
	hideSuccess : false,

	/* If true we append a timestamp to the end of the generated report filename */
	uniqueFilename : false,

	/*
	 * If true we convert screenshot paths from absolute paths to relative to
	 * output file.
	 */
	relativeScreenshots : false

});

module.exports = {
	reporter : reporter.fn,
	retryAssertionTimeout : 5000,
	abortOnAssertionFailure : true
};
