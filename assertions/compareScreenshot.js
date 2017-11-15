// location: ./assertions/compareScreenshot.js
var resemblejs = require('node-resemble-js'),
    fs = require('fs');

exports.assertion = function(filename, expected) {
    var screenshotPath = 'tests/screenshots/',
        baselinePath = screenshotPath + 'baseline/' + filename,
        resultPath = screenshotPath + 'results/' + filename,
        diffPath = screenshotPath + 'diffs/' + filename;

    this.message = 'Unexpected compareScreenshot error.';
    this.expected = expected || 0;   // misMatchPercentage tolerance default 0%

    this.command = function(callback) {
        // create new baseline photo if none exists
        if (!fs.existsSync(baselinePath)) {
            console.log('WARNING: Baseline Photo does NOT exist.');
            console.log('Creating Baseline Photo from Result: ' + baselinePath);
            fs.writeFileSync(baselinePath, fs.readFileSync(resultPath));
        }

        resemblejs
            .outputSettings({
                errorColor: {
                  red: 225,
                  green: 0,
                  blue: 255
                },
                errorType: 'movement',
                transparency: 0.1,
                largeImageThreshold: 1200
              });

        resemblejs(baselinePath).compareTo(resultPath)
            //.ignoreAntialiasing()
            //.ignoreColors()
            .onComplete(callback);

        return this;
    };

    this.value = function(result) {
        result.getDiffImage().pack().pipe(fs.createWriteStream(diffPath));
        return parseFloat(result.misMatchPercentage, 10);  // value this.pass is called with
    };

    this.pass = function(value) {
        var pass = value <= this.expected;
        if (pass) {
            this.message = 'Screenshots Matched for ' + filename +
                ' with a tolerance of ' + this.expected + '%.';
        } else {
            this.message = 'Screenshots Match Failed for ' + filename +
                ' with a tolerance of ' + this.expected + '%.\n' +
                '   Screenshots at:\n' +
                '    Baseline: ' + baselinePath + '\n' +
                '    Result: ' + resultPath + '\n' +
                '    Diff: ' + diffPath + '\n' +
                '   Open ' + diffPath + ' to see how the screenshot has changed.\n' +
                '   If the Result Screenshot is correct you can use it to update the Baseline Screenshot and re-run your test:\n' +
                '    cp ' + resultPath + ' ' + baselinePath;
        }
        return pass;
    };
};
