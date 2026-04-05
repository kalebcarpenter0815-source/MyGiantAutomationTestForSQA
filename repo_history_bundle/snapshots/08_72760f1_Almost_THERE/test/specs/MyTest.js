import { browser, expect } from '@wdio/globals'
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
    // await sauceLabsPageFunctions.sauceLabsSearchBtn.waitForDisplayed();
    // await sauceLabsPageFunctions.sauceLabsSearchBtn.waitForExist();
    // await this.sauceLabsSearchBtn.scrollIntoView();
    // await expect(sauceLabsPageFunctions.sauceLabsSearchBtn).toBeExisting();
    // await browser.waitUntil(async () => (sauceLabsPageFunctions.sauceLabsSearchBtn).isClickable(), {
    //     timeout: 10000,
    //     timeoutMsg: 'Sauce Labs Search button was not clickable after 10 seconds'
    // });
    // await sauceLabsPageFunctions.clickSauceLabsSearchBtn();
    // 1. Wait for the URL transition to finish first (Crucial for Sauce Labs)
    // 1. Ensure the page is actually Sauce Labs
    await browser.waitUntil(async () => (await browser.getUrl()).includes('saucelabs.com'), {
    timeout: 10000,
    timeoutMsg: 'Page transition to Sauce Labs failed'
    });

    // 2. Give the Material UI animations 2 seconds to stop moving/fading
    await browser.pause(10000);

    // 3. Scroll to the button so it's not hidden under a header
    await sauceLabsPageFunctions.sauceLabsSearchBtn.scrollIntoView();

    // 4. Final Clickable Check (No parentheses on the getter!)
    await sauceLabsPageFunctions.sauceLabsSearchBtn.waitForClickable({ 
    timeout: 10000,
    timeoutMsg: 'Button is still blocked by another element' 
    });

    // 5. Execute the click
    await sauceLabsPageFunctions.clickSauceLabsSearchBtn();
     // Now to press the search X button to go to the main page, and then go to the Swag Labs home page.
    //  await sauceLabsPageFunctions.sauceLabsSearchXBtn.waitForExist();
    // await expect(sauceLabsPageFunctions.sauceLabsSearchXBtn).toBeExisting();
    // await browser.waitUntil(async () => (sauceLabsPageFunctions.sauceLabsSearchXBtn).isClickable(), {
    //     timeout: 10000,
    //     timeoutMsg: 'Sauce Labs Search button was not clickable after 10 seconds'
    // });
    // await sauceLabsPageFunctions.clickSauceLabsSearchXBtn();
    // 1. Verify it exists (No parentheses!)
    await sauceLabsPageFunctions.sauceLabsSearchXBtn.waitForExist({ timeout: 10000 });
    await expect(sauceLabsPageFunctions.sauceLabsSearchXBtn).toBeExisting();

    // 2. Give the UI a half-second to settle
    await browser.pause(500);

    // 3. Call the Force-Click method we just updated
    await sauceLabsPageFunctions.clickSauceLabsSearchXBtn();
    // Return from Sauce Labs to inventory after About click
    await browser.url('https://www.saucedemo.com/inventory.html');
    await browser.waitUntil(async () => 
    (await browser.getUrl()).includes('inventory.html'), 
    { timeout: 5000, timeoutMsg: 'Failed to return to inventory' }
    );
    // The next lines of code below this sentence are here in case the above code fails, which it shouldn't, but if it does, this will be a backup plan to return to the inventory page. If the above code works, then this code will be ignored and not executed.
    //    await browser.url('https://www.saucedemo.com/inventory.html');
    //    await theSecurePage.landingPage().waitForExist({ timeout: 5000 });
    //    await expect(theSecurePage.landingPage()).toBeExisting();
    // await browser.waitUntil(async () => (await browser.getUrl()).includes('/inventory.html'), {
    //     timeout: 7000,
    //     timeoutMsg: 'Failed to return to inventory page after Sauce Labs visit'
    // });
    // await theSecurePage.landingPage().waitForExist();
    // await expect(theSecurePage.landingPage()).toBeExisting();
    // await theSecurePage.burgerBtn().waitForClickable({ timeout: 10000 });
    //  await theSecurePage.openHamburgerMenu();
    // await theSecurePage.clickAllItemsLink();
    await this.openHamburgerMenu();
    await this.clickAllItemsLink();
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
