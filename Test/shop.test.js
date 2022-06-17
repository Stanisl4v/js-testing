'use strict'
const webdriver = require('selenium-webdriver');
const {By, Key, until} = require('selenium-webdriver');

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

describe('shop.qa.rs tests', function() {
    let driver;

    before(function() {
        driver = new webdriver.Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it("Verify homepage is open", async function() {
        await driver.get("http://shop.qa.rs");

        const titleElement = await driver.findElement(By.css('h1'));
        const titelContent = await titleElement.getText();
        expect(titelContent).to.contain('(QA) Shop');


        const divElement = await driver.findElement(By.xpath('//*[@class="row" and contains(., "ORDER YOUR BUGS")]'));

        expect(await divElement.isDisplayed()).to.be.true;
    })

    it("Gose to the registration page", async function() {
        const register = await driver.findElement(By.linkText('Register'));
        await register.click();

        expect(await driver.findElement(By.name('register')).getAttribute('value')).to.contain('Register');
    });

    it("Successfully performs registration", async function() {
        const inputIme = await driver.findElement(By.name('ime'));
        inputIme.sendKeys('Slavko');

        const inputPrezime = await driver.findElement(By.name('prezime'));
        inputPrezime.sendKeys('slavic');

        const inputMejl = await driver.findElement(By.name('email'));
        inputMejl.sendKeys('powermail@test.com')

        const inputKorisnicko = await driver.findElement(By.name('korisnicko'));
        inputKorisnicko.sendKeys('slavkobutton');

        const inputLozinka = await driver.findElement(By.name('lozinka'));
        inputLozinka.sendKeys('nekaLozinka123');

        const inputLozinkaOpet = await driver.findElement(By.name('lozinkaOpet'));
        inputLozinkaOpet.sendKeys('nekaLozinka123');

        const buttonRegistracija = await driver.findElement(By.name('register'));
        await buttonRegistracija.click();

        expect(await driver.findElement(By.className('alert alert-success')).getText()).to.contain('Uspeh!');
    });

    it("Goes to login page", async function() {
        const login = await driver.findElement(By.linkText('Login'));
        await login.click();

        expect(await driver.findElement(By.css('h2')).getText()).to.contain('Prijava');
    });

    it('Successfully performs login', async function() {
        const loginIme = await driver.findElement(By.name('username'));
        loginIme.sendKeys('aaa');
        const passInput = await driver.findElement(By.name('password'));
        passInput.sendKeys('aaa');
        const buttonLogin = await driver.findElement(By.name('login'));
        await buttonLogin.click();

        expect(await driver.findElement(By.css('h2')).getText()).to.contain('Welcome back')
    })

    it('adds items to cart - Starter, 2 items', async function() {
        const xpathPackage = '/html/body/div[2]/div[4]/div[2]';
        const packageName = await driver.findElement(By.xpath(xpathPackage));
        const quantity = await packageName.findElement(By.name('quantity'));
        const options = await quantity.findElement(By.css('option'));

        await Promise.all(options.map(async function(option) {
            const text = await option.getText();
            if (text === '2') {
                await option.click();

                const selectedValue = await quantity.getAttribute('value');
                expect(selectedValue).to.contain('2');

                const orderButton = await packageName.findElement(By.className('btn btn-primary'));
                await orderButton.click();

                const url = await driver.getCurrentUrl();
                expect(url).to.contain('http://shop.qa.rs/order');
            }
        }));
    });
});