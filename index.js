const {Builder, By, Browser, until} = require('selenium-webdriver');

const driver = new Builder().forBrowser(Browser.CHROME).build();
example();

async function example() {
    await driver.get('https://www.linkedin.com/login');
    await driver.manage().setTimeouts({implicit: 2000});

    let usernameBox = await driver.findElement(By.id('username'));
    let passwordBox = await driver.findElement(By.id('password'));
    let submitButton = await driver.findElement(By.className('btn__primary--large from__button--floating'));

    await usernameBox.sendKeys(process.env.EMAIL);
    await passwordBox.sendKeys(process.env.PASSWORD);
    await submitButton.click();

    const profileUrls = process.env.PROFILE_URLS.split(',');

    for (const url of profileUrls) {
        await getProfile(url);
    }

    await driver.quit();
}

async function getProfile(url) {
    await driver.get(url);

    await driver.wait(until.titleContains('LinkedIn'), 10000);

    const nameElement = await driver.findElement(By.css('h1.text-heading-xlarge.inline.t-24.v-align-middle.break-words'));
    const companyElement = await driver.findElement(By.css('div.inline-show-more-text--is-collapsed'));

    const name = await nameElement.getText();
    const company = await companyElement.getText();
    
    console.log('Name:', name);
    console.log('Company:', company);
}
