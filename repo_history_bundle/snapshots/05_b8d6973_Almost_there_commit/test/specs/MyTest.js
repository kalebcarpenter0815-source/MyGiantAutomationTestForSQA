import { browser, driver, expect } from '@wdio/globals'
import theLoginPage from '../pageobjects/loginpage.js'
import theSecurePage from '../pageobjects/HamburgerMenuPage.js'
import LogoutProcess from '../pageobjects/secureLogoutPage.js'
import sauceLabsPageFunctions from '../pageobjects/sauceLabsPage.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
    await theLoginPage.open();
    await theLoginPage.login('standard_user', 'secret_sauce');
    await expect(theSecurePage.landingPage()).toBeExisting();
    await browser.waitUntil(async () => (theSecurePage.burgerBtn()).isClickable(), {
        timeout: 5000,
        timeoutMsg: 'Burger menu button was not clickable after 5 seconds'
    });
    await theSecurePage.openHamburgerMenu(); 
    await browser.waitUntil(async () => (theSecurePage.aboutLink()).isClickable(), {
        timeout: 5000,
        timeoutMsg: 'About link was not clickable after 5 seconds'
    });
     await browser.execute(() => {        
        document.querySelector('#about_sidebar_link').setAttribute('target', '_self');
    });
    await theSecurePage.clickAboutLink();
    // // Wait first for the URL to change
    // await browser.waitUntil(async () => (await browser.getUrl()).includes('saucelabs.com'), {
    // timeout: 5000,
    // timeoutMsg: 'URL did not include saucelabs.com after 5 seconds'
    // });
    // Then verify/assert it's there
    // Insert this code is await browser.waitUntil that line of code fails. // await expect(browser).toHaveUrlContaining('saucelabs.com');
    await sauceLabsPageFunctions.sauceLabsHomePageforContinuousQualityAIPoweredInstights().waitForExist();
    await expect(sauceLabsPageFunctions.sauceLabsHomePageforContinuousQualityAIPoweredInstights()).toBeExisting();
    await browser.waitUntil(async () => (sauceLabsPageFunctions.sauceLabsSearchBtn()).isClickable(), {
        timeout: 5000,
        timeoutMsg: 'Sauce Labs Search button was not clickable after 5 seconds'
    });
    await sauceLabsPageFunctions.clicksauceLabsSearchBtn();
     
    // Return from Sauce Labs to inventory after About click
   await browser.url('https://www.saucedemo.com/inventory.html');
   await theSecurePage.landingPage().waitForExist({ timeout: 5000 });
   await expect(theSecurePage.landingPage()).toBeExisting();
    // await browser.waitUntil(async () => (await browser.getUrl()).includes('/inventory.html'), {
    //     timeout: 7000,
    //     timeoutMsg: 'Failed to return to inventory page after Sauce Labs visit'
    // });
    // await theSecurePage.landingPage().waitForExist();
    // await expect(theSecurePage.landingPage()).toBeExisting();
    await theSecurePage.burgerBtn().waitForClickable({ timeout: 3000 });
     await theSecurePage.openHamburgerMenu();
    await theSecurePage.clickAllItemsLink();
    await theSecurePage.theXBtn().waitForClickable({ timeout: 3000 });
     await theSecurePage.clickTheXBtn();
     await theSecurePage.addFirstItemToCartBtn().waitForExist();
    await theSecurePage.addFirstItemToCartBtn().waitForClickable();
    await theSecurePage.clickAddFirstItemToCartBtn();
    await theSecurePage.burgerBtn().waitForClickable({ timeout: 3000 });
     await theSecurePage.openHamburgerMenu();
    await theSecurePage.clickResetAppState();
    await theSecurePage.theXBtn().waitForClickable({ timeout: 3000 });
     await theSecurePage.clickTheXBtn();
     await browser.refresh();
    await theSecurePage.addFirstItemToCartBtn().waitForClickable();
    await theSecurePage.clickAddFirstItemToCartBtn();
     await browser.waitUntil(async () => (theSecurePage.removeItemFromCartBtn()).isClickable(), {
        timeout: 5000,
        timeoutMsg: 'Remove from cart button was not clickable after 5 seconds'
        });
    await theSecurePage.clickRemoveItemFromCartBtn();
    await theSecurePage.openHamburgerMenu(); 
    await LogoutProcess.logout();
    });
    // BREAK RIGHT HERE FOR THE NEXT POSITIVE TESTS, THEN CONTINUE WITH THE NEGATIVE TESTS BELOW.
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
