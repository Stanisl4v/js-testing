const webdriver = require('selenium-webdriver');
const {By, Key, until} = require('selenium-webdriver');

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

describe('Selenium test 2', function() {
    let driver;

    before(function() {
        driver = new webdriver.Builder().forBrowser('chrome').build();
    });

    after(async function(){
        await driver.quit();
    });

    it('Open etnolux', async function() {
        await driver.get('https://etnolux.rs');

        const pageTitle = await driver.getTitle();
        expect(pageTitle).to.contain('ETNO LUX Kula');
        assert.equal(pageTitle, 'ETNO LUX Kula – Komplex etno apartmana sa bazenom, djakuzijem i saunom');
    })
})