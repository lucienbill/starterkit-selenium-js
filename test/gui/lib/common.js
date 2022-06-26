const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const addContext = require("mochawesome/addContext");
const fs = require("fs");

/* 
    This makes sure my code code know where to find the chromedriver
    Which version? See package.json
    Probably works with other browsers
*/
require("chromedriver");

const increment = (function (n) {
  return function () {
    n += 1;
    return n;
  };
})(-1);

exports.startBrowser = async function ({
  // parameters with default values
  headless = true,
  setCustomWindowSize = true,
  windowWidth = 1920,
  windowsHeight = 1080,
} = {}) {
  const opts = new chrome.Options();
  // opts.setAcceptInsecureCerts(true);
  if (headless) {
    opts.addArguments("headless");
  }
  const driver = await new Builder()
    .forBrowser("chrome")
    .withCapabilities(opts)
    .build();
  // For any action: timeout = 5 seconds
  await driver.manage().setTimeouts({ implicit: 5000 });

  if (setCustomWindowSize) {
    driver
      .manage()
      .window()
      .setRect({ width: windowWidth, height: windowsHeight });
  }
  return driver;
};

exports.closeBrowser = async function (driver) {
  try {
    await driver.quit();
  } catch (error) {
    //noop
  }
};

exports.takeScreenshot = async function (testContext, driver) {
  const testScreenshotName = increment() + ".png";
  /* 
  NOTE: mochawesome does not empty its assets when generating a new report.
  When I run my tests locally, I don't want to manually purge old screenshots,
  so I cheated: the first screenshot of a script is "0.png", then "1.png",
  "2.png" etc. When a new script is run, the old screenshots are replaced
  by new ones on the filesystem.
  */
  await driver.takeScreenshot().then(function (image) {
    const dir =
      // eslint-disable-next-line no-undef
      __dirname + // this is where this script is on the filesystem
      "/../../../mochawesome-report/assets/";

    // create the directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // save the screenshot on the filesystem
    fs.writeFileSync(dir + testScreenshotName, image, "base64");

    // include the screenshot on the mochawesome report
    addContext(testContext, "./assets/" + testScreenshotName);
  });
};
