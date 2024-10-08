const {Builder, By, Browser, until} = require('selenium-webdriver');

const driver = new Builder().forBrowser(Browser.CHROME).build();
example();


async function example() {
    await driver.get('https://www.linkedin.com/login');
    await driver.manage().setTimeouts({implicit: 2000});
    let usernameBox = await driver.findElement(By.id('username'));
    let passwordBox = await driver.findElement(By.id('password'));
    let submitButton = await driver.findElement(By.className('btn__primary--large from__button--floating'));

    await usernameBox.sendKeys(process.env.USERNAME);
    await passwordBox.sendKeys(process.env.PASSWORD);
    await submitButton.click();
    await driver.get('https://www.linkedin.com/in/hossamhani/');
    const nameElement = await driver.findElement(By.className('text-heading-xlarge inline t-24 v-align-middle break-words'));
    const name = await nameElement.getText();
    const companyElement = await driver.findElement(By.className(`qSAVLaeVkrsiZRQrRWbNOkVqlQJZsrJWGM
        inline-show-more-text--is-collapsed
        inline-show-more-text--is-collapsed-with-line-clamp
        
        
        `));
    const company = await companyElement.getText();
    console.log(name);
    console.log(company);

}
