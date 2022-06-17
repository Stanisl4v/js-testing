'use strict';

const webdriver = require('selenium-webdriver');
const {By, Key, until} = require('selenium-webdriver');

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

describe('swag labs test', function() {
    let driver;

    before(function() {
        driver = new webdriver.Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('verify home page is open', async function() {
        await driver.get('https://www.saucedemo.com/')


        const divElement = await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]'));
        expect(await divElement.isDisplayed()).to.be.true;
    });

    it('login form', async function() {
        const inputUser = await driver.findElement(By.name('user-name'));
        inputUser.sendKeys('standard_user');

        const inputPass = await driver.findElement(By.name('password'));
        inputPass.sendKeys('secret_sauce');

        const buttonRegistracija = await driver.findElement(By.name('login-button'));
        await buttonRegistracija.click();

        expect(await driver.findElement(By.className('title')).getText()).to.contain('PRODUCTS');
    });

    it('adds items to cart - Starter, 2 items', async function() {
        const itemOne = await driver.findElement(By.name('add-to-cart-sauce-labs-backpack'));
        itemOne.click();

        const itemTwo = await driver.findElement(By.name('add-to-cart-sauce-labs-bike-light'));
        itemTwo.click();

        const shoopingCart = await driver.findElement(By.className('shopping_cart_link'));
        await shoopingCart.click();

        const url = await driver.getCurrentUrl();
        expect(url).to.contain('https://www.saucedemo.com/cart.html');
        
    });

    it('checkout ordrer', async function() {
        const checkoutButton = await driver.findElement(By.name('checkout'));
        await checkoutButton.click();

        const secondUrl = await driver.getCurrentUrl();
        expect(secondUrl).to.contain('https://www.saucedemo.com/checkout-step-one.html');
        
    });

    it('finish order', async function() { 
        const firstName = await driver.findElement(By.xpath('//*[@id="first-name"]'));
        firstName.sendKeys('Slavko');

        const lastName = await driver.findElement(By.name('lastName'));
        lastName.sendKeys('Slavic');

        const zipCode = await driver.findElement(By.name('postalCode'));
        zipCode.sendKeys('25230');

        const continueButton = await driver.findElement(By.name('continue'));
        await continueButton.click();

        const finishButton = await driver.findElement(By.name('finish'));
        await finishButton.click();

        const Thirdurl = await driver.getCurrentUrl();
        expect(Thirdurl).to.contain('https://www.saucedemo.com/checkout-complete.html');
    });
});