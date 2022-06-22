/* 
I try to follow the Page Object Model : 
    1 page of the website = 1 file, used as a library/dependency
    pages: organized as something that mimics the srtucture of website (sitemap)
*/
const { By } = require("selenium-webdriver");
const { expect } = require("chai");

exports.goToPage = async function (driver) {
  driver.get(__dirname + "/../../../../../misc/somepage.html");
  /*
  This use of __dirname is dirty.
  Better option: declare a __basedir variable in some local dependency,
  and import it in every script that needs it.
  If the file structure changes, some IDE can automatically udpate the import.
  IDE can't automatically update '_dirname + "../../somedir/somefile.html"'
  */
};

exports.checkValueOfFoo = async function (driver, value = "a heading") {
  const text = await driver.findElement(By.id("foo")).getText();
  expect(
    text,
    "checking the text value of the dom element with the id 'foo'"
  ).to.equal(value);
};
