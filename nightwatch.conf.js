require('env2')('configure.env'); // optionally store your environment
									// variables in .env
const PKG = require('./package.json'); // so we can get the version of the
										// project
const BINPATH = './bin/'; // change if required.
const SCREENSHOT_PATH = './reports';

const config = { 
  "src_folders": ["./tests"],
  "output_folder" : "./reports", // reports (test outcome) output by Nightwatch
  "custom_commands_path" : "./commands",
  //"custom_assertions_path" : "./assertions",
  "page_objects_path" :[ "./pages"],
  "globals_path" : "./global.js",
  
  "selenium": {
    "start_process": true,
    "server_path": BINPATH + "selenium.jar", // downloaded by selenium-download module (see below)
    "log_path": "",
    "host": "127.0.0.1",
    "port": 4444,
    "cli_args": {
      "webdriver.chrome.driver" : BINPATH + "chromedriver" //downloaded by selenium-download
    }
  },
  "test_workers" : {  // perform tests in parallel where possible
	  "enabled" : false, 
	  "workers" : "auto"
  }, 
 
  "test_settings": {
    "default": {
      "launch_url": "http://staging.mother.ly", 
      "selenium_host": "127.0.0.1",
      "selenium_port": 4444,
      "silent": true,
      "disable_colors": false,
     "screenshots": {
        "enabled": false, // save screenshots to this directory (excluded by .gitignore)
        "path": SCREENSHOT_PATH
      },
      "globals": {
        "waitForConditionTimeout": 10000,    // wait for content on the page before continuing
      	"env" : "desktop"
      },
      "desiredCapabilities" : {
        "browserstack.user": "${BROWSERSTACK_USERNAME}",
        "browserstack.key": "${BROWSERSTACK_KEY}",
        "browserName" : "chrome",
        "javascriptEnabled" : true,
        "acceptSslCerts" : true,  
        "chromeOptions" : {
    		"args" : ["disable-infobars"]
  		}
      }
    },
    "chrome": { // your local Chrome browser (chromedriver)
  	  "launch_url" : "http://staging.mother.ly",
      "selenium_host" : "127.0.0.1",
      "selenium_port" : 4445,
      "silent" : true,
      "disable_colors": false,
      "screenshots" : {
        "enabled" : false,
        "path" : SCREENSHOT_PATH
      },
      "desiredCapabilities" : {
          "_comment" : "safari, chrome, or firefox",
        "browserName" : "chrome",
        "javascriptEnabled" : true,
        "acceptSslCerts" : true,  
        "chromeOptions" : {
    		"args" : ["disable-infobars"]
  		}
	  }
    },
    "bs_win_c" : {  //Browserstack desktop chrome
        "selenium" : {
          "start_process" : false
        },
        "selenium_host" : "hub-cloud.browserstack.com",
        "selenium_port" : 80,
        "desiredCapabilities": {
          "browser": "chrome"
        }
    },
    "bs_iphone_7P" : {  //Browserstack iPhone 7 Plus
      "selenium" : {
        "start_process" : false
      },
      "selenium_host" : "hub-cloud.browserstack.com",
      "selenium_port" : 80,
      "desiredCapabilities": {
        "device" : "iPhone 7 Plus",
        "realMobile" : "true",
        "os_version" : "10.0",
        "browserstack.debug" : "true"
      },
      "globals": {
      	"env" : "mobile"
      	      }
    },
    "bs_iphone_7" : {  //Browserstack iPhone 7
        "selenium" : {
          "start_process" : false
        },
        "selenium_host" : "hub-cloud.browserstack.com",
        "selenium_port" : 80,
        "desiredCapabilities": {
          "device" : "iPhone 7",
          "realMobile" : "true",
          "os_version" : "10.0",
          "browserstack.debug" : "true"
        },
        "globals": {
        	"env" : "mobile"
        	      }
    },
    "bs_galaxy_s8" : {  //Browserstack Samsung Galaxy S8
    	"selenium" : {
		    "start_process" : false
		  },
		  "selenium_host" : "hub-cloud.browserstack.com",
		  "selenium_port" : 80,
		  "desiredCapabilities": {
		    "device" : "Samsung Galaxy S8",
		    "realMobile" : "true",
		    "os_version" : "7.0"
		  },
		  "globals": {
		  	"env" : "mobile"
		  }
    },
    //https://cs.chromium.org/chromium/src/chrome/test/chromedriver/chrome/mobile_device_list.cc
    "local_iphone_6": {  //Local chrome iPhone 6 Plus emulation
	    "desiredCapabilities": {
	      "browserName": "chrome",
	      "javascriptEnabled": true,
	      "acceptSslCerts": true,
	      "chromeOptions": {
	        "mobileEmulation": { "deviceName" : "iPhone 6 Plus"},
	        "args": [
	          "--window-size=414,736", // iphone 6 plus size
	          "disable-web-security",
              "disable-infobars"
	        ]
	 		}
	    }
    },
    "mw_emulator": { //https://cs.chromium.org/chromium/src/chrome/test/chromedriver/chrome/mobile_device_list.cc
 	   "desiredCapabilities": {
 	     "browserName": "chrome",
 	     "javascriptEnabled": true,
 	     "acceptSslCerts": true,
         "chromeOptions": {
            "args": [
              "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",              
              "--window-size=414,736", // iphone 6 plus size
              "disable-infobars"
             ]
           },
 	    }
     },
     "mw_emulator": {
  	   "desiredCapabilities": {
  	     "browserName": "chrome",
  	     "javascriptEnabled": true,
  	     "acceptSslCerts": true,
          "chromeOptions": {
             "args": [
               "--window-size=414,736", // iphone 6 plus size
                "disable-infobars"
              ]
            },
  	    }
      }//local_iphone_6
    
  }
}
module.exports = config;

/**
 * selenium-download does exactly what it's name suggests; downloads (or
 * updates) the version of Selenium (& chromedriver) on your localhost where it
 * will be used by Nightwatch.
 */
require('fs').stat(BINPATH + 'selenium.jar', function (err, stat) { // got it?
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, function(error) {
      if (error) throw new Error(error); // no point continuing so exit!
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});

function padLeft (count) { // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
  return count < 10 ? '0' + count : count.toString();
}

var FILECOUNT = 0; // "global" screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots. While
 * we're at it, we are adding some meta-data to the filename, specifically the
 * Platform/Browser where the test was run and the test (file) name.
 */
function imgpath (browser) {
  var a = browser.options.desiredCapabilities;
  var meta = [a.platform];
  meta.push(a.browserName ? a.browserName : 'any');
  meta.push(a.version ? a.version : 'any');
  meta.push(a.name); // this is the test filename so always exists.
  var metadata = meta.join('~').toLowerCase().replace(/ /g, '');
  return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_';
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;