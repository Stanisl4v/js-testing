'use strict';

const webdriver = require('selenium-webdriver');
const {Builder, By, until, Key} = require('selenium-webdriver');

const chai = require('chai');
const expect = chai.expect;

describe('DemoQA test', function() {
    let driver;

    before(async function() {
        driver = await new webdriver.Builder().forBrowser('chrome').build();
    });

    after(function() {
        return driver.quit();
    });

    it("Opens DemoQA homepage", async function () {
        await driver.get('https://demoqa.com/');


        expect(await driver.getCurrentUrl()).to.eq('https://demoqa.com/');
    });

    it('Open elements page', async function() {

        const elementPage = await driver.findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div/div[1]'));
        await elementPage.click();

        expect(await driver.getCurrentUrl()).to.eq('https://demoqa.com/elements');
        expect(await driver.findElement(By.className('main-header')).getText()).to.eq('Elements');
    });

    it('Opens Text Box page, fills the form, and submit', async function() {
        const textBox = await driver.findElement(By.id('item-0'));
        await textBox.click();

        expect(await driver.findElement(By.className('main-header')).getText()).to.eq("Text Box");

       const fullUserName = 'Slavko';
       const fullEmail = 'slavic@gmail.com';
       const fullCurentAddres = 'Marsala tita 252';
       const fullPermanentAdress = 'Marsala tita 252';

       const fillFullName = await driver.findElement(By.id('userName'));
       fillFullName.sendKeys(fullUserName);

       const fillFullEmail = await driver.findElement(By.id('userEmail'));
       fillFullEmail.sendKeys(fullEmail);

       const fillCurrentAdress = await driver.findElement(By.id('currentAddress'));
       fillCurrentAdress.sendKeys(fullCurentAddres);

       const fillPermanentAdress = await driver.findElement(By.id('permanentAddress'));
       fillPermanentAdress.sendKeys(fullPermanentAdress);

       const buttonClick = await driver.findElement(By.className('btn btn-primary'));
       buttonClick.click();

       const output = await driver.findElement(By.id('output'));
       expect(await output.isDisplayed()).to.eq(true);

       const outUserName = await output.findElement(By.id('name'));
       const outUserEmali = await output.findElement(By.id('email'));
       const outCurrentAddress = await output.findElement(By.id('currentAddress'));
       const permanentAddress = await output.findElement(By.id('permanentAddress'));

       expect(await outUserName.getText()).to.contain(fullUserName);
       expect(await outUserEmali.getText()).to.contain(fullEmail);
       expect(await outCurrentAddress.getText()).to.contain(fullCurentAddres);
       expect(await permanentAddress.getText()).to.contain(fullPermanentAdress);
    })

    it('Opens radio Button page, and choose', async function() {
        const radioButton = await driver.findElement(By.id('item-2'));
        await radioButton.click();

        expect(await driver.getCurrentUrl()).to.eq('https://demoqa.com/radio-button');
        
        const selectYes = await driver.findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[2]/label'));
        await selectYes.click();

        let message = await driver.findElement(By.className('mt-3'));
        expect(await message.getText()).to.contain('Yes');

        const selectImpressive = await driver.findElement(By.xpath('//*[@id="app"]/div/div/div[2]/div[2]/div[2]/div[3]/label'));
        await selectImpressive.click();

        message = await driver.findElement(By.className('text-success'));
        expect(await message.getText()).to.contain('Impressive');
    })

    it('Test dynamic properties', async function() {
        const dynamicProperties = await driver.findElement(By.id('item-8'));
        await dynamicProperties.click().Builder

        expect(await driver.findElement(By.className('main-header')).getText()).to.eq('Dynamic Properties');

        const buttonEnableAfter = await driver.findElement(By.id('enableAfter'));
        await driver.wait(until.elementIsEnabled(buttonEnableAfter));

        expect(await buttonEnableAfter.isEnabled()).to.be.true;

        const buttonVisibleAfter = await driver.findElement(By.id('visibleAfter'));
        await driver.wait(until.elementIsVisible(buttonVisibleAfter));

        expect(await buttonVisibleAfter.isDisplayed()).to.be.true;
    })

    it('tests web tables', async function() {
        const webTables = await driver.findElement(By.id('item-3'));
        await webTables.click();

        expect(await driver.getCurrentUrl()).to.eq('https://demoqa.com/webtables');

        const edit = await driver.findElement(By.id('edit-record-2'));
        await edit.click();

        const registrationForm = await driver.findElement(By.id('registration-form-modal'));
        await driver.wait(until.elementIsVisible(registrationForm));

        expect(await registrationForm.isDisplayed()).to.be.true;

        const emailElement = await driver.findElement(By.id('firstName'));
        const email = await emailElement.getAttribute('value');

        const salary = await driver.findElement(By.id('salary'));
        const oldSalary = await salary.getAttribute('value');
        const newSalary = Number(oldSalary) + 1000;

        await salary.sendKeys(
            Key.chord(Key.CONTROL, 'a'),
            Key.DELETE,
            newSalary
        );

        const submit = await driver.findElement(By.id('submit'));
        await submit.click();

        const element = `//div[@role="row" and contains(., "${email}")]`;

        const cell = await driver.findElement(By.xpath(`${element}//div[@role="gridcell"][5]`));

        expect(await cell.getText()).to.eq(newSalary.toString());

    })

    it('test alerts', async function() {
        await driver.get('https://demoqa.com/alerts');
        expect(await driver.getCurrentUrl()).to.eq('https://demoqa.com/alerts');

        let alertButton = await driver.findElement(By.id('alertButton'));
        await alertButton.click();
        await driver.wait(until.alertIsPresent());

        let alert = await driver.switchTo().alert();
        expect(await alert.getText()).to.contain('You clicked');
        await alert.accept();

        let timerAlertButton = await driver.findElement(By.id('timerAlertButton'));
        await timerAlertButton.click();
        await driver.wait(until.alertIsPresent());

        alert = await driver.switchTo().alert();
        expect(await alert.getText()).to.contain('5 seconds');
        await alert.accept();

        let confirmButton = await driver.findElement(By.id('confirmButton'));
        await confirmButton.click();
        await driver.wait(until.alertIsPresent());

        alert = await driver.switchTo().alert();
        await alert.accept();
        let confirmResult = await driver.findElement(By.id('confirmResult'));
        expect(await confirmResult.getText()).to.contain('Ok');

        confirmButton = await driver.findElement(By.id('confirmButton'));
        await confirmButton.click();
        await driver.wait(until.alertIsPresent());

        alert = await driver.switchTo().alert();
        await alert.dismiss();
        confirmResult = await driver.findElement(By.id('confirmResult'));
        expect(await confirmResult.getText()).to.contain('Cancel');
    })

});