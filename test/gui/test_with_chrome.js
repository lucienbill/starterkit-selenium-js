// Dependencies
const { describe, it } = require("mocha");
const { By, Key, /*Builder,*/ until } = require("selenium-webdriver");
const addContext = require("mochawesome/addContext");
const common = require("./lib/common");
const { expect } = require("chai");
const path = require("path");

// Local Dependencies
const somepage = require("./lib/pages/localpage/somepage");

/* 
    This makes sure my code code know where to find the chromedriver
    Which version? See package.json
    Probably works with other browsers
*/
require("chromedriver");

let driver;
// This is the first thing my script does
before("Open a browser", async function () {
  driver = await common.startBrowser();
});

// This is the last thing my script does
after("Fermer le navigateur", async function () {
  await common.closeBrowser(driver);
});

afterEach("take a screenshot when a test fails", async function () {
  if (driver && this.currentTest?.state == "failed") {
    await common.takeScreenshot(this, driver);
  }
});

describe("Mocha has some interresting capabilities", () => {
  // NOTE: this block: no seleniumm, no anything: just mocha + mochawesome
  describe("Tests must be organized in 'describe' and 'it'", () => {
    /* tip: use as many describe and it as you can! Make things readable.
    We something fails, mocha tells you what. We nothing fails, it's up to
    you to document what is tested (with describes and its)
    */
    describe("This is written before the 'it' blocks, but shown after in the report", () => {
      it(
        "When a test has 'it' and 'describe' elements at the same level, \
      they won't necesseraly be executed from top to bottom."
      );
    });
    it("The code you want to test must be in a 'it' block");
    it("'describe' can be nested, 'it' cannot");
  });
  describe("some interesting things about mocha and mochawesome", () => {
    it("does nothing (an empty function is called)", () => {
      /* 
      This code does nothing, but there is a function: it is executed.
      Since it is executed without any error, it's status is "passed" (success)
      */
    });

    it("has no instruction, so it is 'skipped' (not executed)");
    it("things can be added to a 'it' in this test report with 'addContext': click here to see it", function () {
      addContext(
        this,
        "this sentence will appear in the test report, but not in the console"
      );
      console.log(
        "this sentence will appear in the console, but not in the test report"
      );
    });
    it("objects can be added to the report too", function () {
      addContext(this, "a simple string added to the report");
      addContext(this, {
        title: "an object added to the report",
        value: {
          key: "value",
          foo: "bar",
          what: "any JSON object",
        },
      });
    });
    it("'addContext' needs to access 'this', which isn't available within arrow functions", () => {
      addContext(
        this,
        "this sentence won't appear in the test report (because this + arrow function)"
      );
    });
    it("about .mocharc.js", async function () {
      addContext(this, ".mocharc.js is a way to define some settings");
    });
  });
});

describe("How about we do some things with a web browser?", async function () {
  describe("Run some tests on a local HTML page", async function () {
    it("opens the local HTML page with the browser", async function () {
      await somepage.goToPage(driver);
    });
    it("checks that the page is loaded", async function () {
      await somepage.checkValueOfFoo(driver);
      /*
      We have async and await everywhere. It's ugly, but it works.
      Async seem to be necessary with selenium ;
      I just find 'await' easier to read than promises
      */
    });
    it("does the same thing, but with a promise", async function () {
      somepage.goToPage(driver).then(await somepage.checkValueOfFoo(driver));
    });
    it("promise + failed test: silent if no await", async function () {
      somepage
        .goToPage(driver)
        .then(somepage.checkValueOfFoo(driver, "this will make the test fail"));
    });
    it("fails on purpose -> click to see a screenshot", async function () {
      expect(false, "this test is coded to fail").to.be.true;
    });
  });
  describe("Upload something to a form", async function () {
    it.skip("has some quirks (see source code)", async function () {
      /*
      To upload a file to a form, we need to send the canonical path
      (absolute path without any '../')
      This is an example.
      */

      const relativPathToSomeFileIWantToUpload = "../somedir/somefile.png";
      const canonicalPath = path.resolve(
        __dirname,
        relativPathToSomeFileIWantToUpload
      );

      driver.findElement(By.id("myUploadField")).sendKeys(canonicalPath);
    });
  });
});

describe("What if I want to test an API?", async function () {
  it("just use axios, or anything than can call an API: it just works.");
});
