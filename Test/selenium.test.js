const webdriver = require('selenium-webdriver');
const {By, Key, until} = require('selenium-webdriver');

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

describe('Selenium tests', function(){
    let driver;

    before(function() {
        driver = new webdriver.Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('Open qa.rs website', async function() {
        await driver.get('https://qa.rs');

        const pageTitle = await driver.getTitle();

        expect(pageTitle).to.contain('QA.rs');
        assert.equal(pageTitle, 'Edukacija za QA testere - QA.rs');
    });

    it('Open google.com', async function() {
        await driver.get('https://google.com');

        const pageTitle = await driver.getTitle();
        expect(pageTitle).to.contain('Google');
    });

    it('Perform a search on Google', async function() {
        await driver.get('https://google.com');
        expect(await driver.getTitle()).to.contain('Google');

        const searchInput = await driver.findElement(By.name('q'));
        searchInput.click();
        searchInput.sendKeys('qa.rs', Key.ENTER);

        await driver.wait(until.elementLocated(By.id('search')));
        expect(await driver.getTitle()).to.contain('qa.rs');

        const navigator = await driver.findElement(By.xpath('(//div[@role="navigation"])[2]'));
        const nextPage = navigator.findElement(By.css('a'));
        nextPage.click();
        await driver.wait(until.elementLocated(By.id('search')));
    });
    
});