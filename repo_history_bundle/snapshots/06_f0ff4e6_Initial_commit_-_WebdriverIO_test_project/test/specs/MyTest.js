import { browser, expect } from '@wdio/globals' // In order to start my test, I need to have my scope be in the right file, so do MyFirstAutomationTestVSCodeTrial file in order to start my test because doing it with just the downloads automationprojectforsqa is out of scope.
import theLoginPage from '../pageobjects/loginpage.js'
import theSecurePage from '../pageobjects/HamburgerMenuPage.js'
import LogoutProcess from '../pageobjects/secureLogoutPage.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
    await theLoginPage.open();
    await theLoginPage.login('standard_user', 'secret_sauce');
    await expect(theSecurePage.landingPage()).toBeExisting();
    await driver.waitUntil(async () => (theSecurePage.burgerBtn()).isClickable(), {
        timeout: 5000,
        timeoutMsg: 'Burger menu button was not clickable after 5 seconds'
    });
    await theSecurePage.openHamburgerMenu(); //If this doesn't work, try using browser.execute to click the button directly or use the burgerBtn element to click it.
    await driver.waitUntil(async () => (theSecurePage.aboutLink()).isClickable(), {
        timeout: 5000,
        timeoutMsg: 'About link was not clickable after 5 seconds'
    });
    await theSecurePage.aboutLink().waitForClickable();
    await theSecurePage.clickAboutLink();
    await browser.waitUntil(async () => (await browser.getUrl()).includes('saucelabs.com'));
    await browser.url('https://www.saucedemo.com/inventory.html');
    await theSecurePage.landingPage().waitForExist();
    await theSecurePage.clickAllItemsLink();
    await theSecurePage.clickTheXBtn();
    await theSecurePage.addFirstItemToCartBtn().waitForClickable({ timeout: 10000 });
    await theSecurePage.clickAddFirstItemToCartBtn();
    await theSecurePage.openHamburgerMenu(); //If this doesn't work, try using browser.execute to click the button directly or use the burgerBtn element to click it.
    await theSecurePage.clickResetAppState();
    await theSecurePage.clickTheXBtn();
    await theSecurePage.removeItemFromCartBtn().waitForClickable({ timeout: 10000 });
    await theSecurePage.clickRemoveItemFromCartBtn();
    await expect(theSecurePage.addFirstItemToCartBtn()).toBeExisting();
    await theSecurePage.clickAddFirstItemToCartBtn();
    await theSecurePage.removeItemFromCartBtn().waitForClickable({ timeout: 10000 });
    await theSecurePage.clickRemoveItemFromCartBtn();
    await theSecurePage.openHamburgerMenu(); //If this doesn't work, try using browser.execute to click the button directly or use the burgerBtn element to click it.
    await LogoutProcess.logout();
    });

    it('should show error for locked_out_user', async () => {
        await theLoginPage.open();
        await theLoginPage.login('locked_out_user', 'secret_sauce');
        await expect(theSecurePage.LockedOutUser()).toBeExisting();
    });
    
    const positiveUsers = ['problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];
    
    for (let i = 0; i < positiveUsers.length; i++) {
        const username = positiveUsers[i];
        it(`should login with ${username}`, async () => {
            await theLoginPage.open();
            await theLoginPage.login(username, 'secret_sauce');
            await expect(theSecurePage.landingPage()).toBeExisting();
            await LogoutProcess.logout();
        });
    }

        // Negative test for my assignment:
    it('should fail login with wrong password', async () => {
    await theLoginPage.open();
    await theLoginPage.login('standard_user', '');
    await expect(theSecurePage.needsPassword()).toBeExisting();
});

    const NegativeTests = [
    { username: 'standard_user', password: '', errorElement: () => theSecurePage.needsPassword(), description: 'empty password' },
    { username: '', password: 'secret_sauce', errorElement: () => theSecurePage.needsUsername(), description: 'empty username' },
    { username: 'standard_user', password: '', errorElement: () => theSecurePage.needsPassword(), description: 'empty password' },
    { username: '', password: '', errorElement: () => theSecurePage.needsUsername(), description: 'both fields empty' }
];

for (let i= 0; i < NegativeTests.length; i++) {
    const test = NegativeTests[i];
    it(`should fail login with ${test.description}`, async () => {
    await theLoginPage.open();
    await theLoginPage.login(test.username, test.password);
    await expect(test.errorElement()).toBeExisting();
        });
    }
}); 
