import { browser, expect } from '@wdio/globals';
import theLoginPage from '../pageobjects/loginpage.js';
import theSecurePage from '../pageobjects/HamburgerMenuPage.js';
import LogoutProcess from '../pageobjects/secureLogoutPage.js';
import sauceLabsPageFunctions from '../pageobjects/sauceLabsPage.js';

describe('My Login application', () => {

    it('should login with valid credentials and visit Sauce Labs', async () => {
        // Login
        await theLoginPage.open();
        await theLoginPage.login('standard_user', 'secret_sauce');
        await expect(theSecurePage.landingPage).toBeExisting();

        // Open Hamburger Menu
        await theSecurePage.openHamburgerMenu();
        await browser.pause(500); // wait for menu animation

        // Wait for About link to exist and be clickable
        await browser.waitUntil(
            async () => theSecurePage.aboutEntry.isExisting(),
            { timeout: 5000, timeoutMsg: 'About link did not appear after 5 seconds' }
        );
        await browser.waitUntil(
            async () => theSecurePage.aboutEntry.isClickable(),
            { timeout: 5000, timeoutMsg: 'About link was not clickable after 5 seconds' }
        );

        // Force About link to open in same tab
        await browser.execute(() => {
            const link = document.querySelector('#about_sidebar_link');
            if (link) link.setAttribute('target', '_self');
        });

        // Click About
        await theSecurePage.clickAboutEntry();

        // Wait for Sauce Labs page
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('saucelabs.com'),
            { timeout: 10000, timeoutMsg: 'Page transition to Sauce Labs failed' }
        );

        await browser.pause(2000); // wait for animations

        // Interact with Sauce Labs button
        await sauceLabsPageFunctions.sauceLabsSearchBtn.scrollIntoView();
        await sauceLabsPageFunctions.sauceLabsSearchBtn.waitForClickable({ timeout: 10000 });
        await sauceLabsPageFunctions.clickSauceLabsSearchBtn();

        // Close overlay
        await sauceLabsPageFunctions.sauceLabsSearchXBtn.waitForExist({ timeout: 10000 });
        await sauceLabsPageFunctions.clickSauceLabsSearchXBtn();

        // Return to Swag Labs inventory
        await browser.url('https://www.saucedemo.com/inventory.html');
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory.html'),
            { timeout: 5000, timeoutMsg: 'Failed to return to inventory' }
        );

        // Cart operations
        await theSecurePage.addFirstItemToCartBtn.waitForClickable();
        await theSecurePage.clickAddFirstItemToCartBtn();

        await theSecurePage.openHamburgerMenu();
        await browser.pause(500); // wait for menu animation
        await theSecurePage.clickResetAppState();
        await theSecurePage.theXBtn.waitForClickable({ timeout: 5000 });
        await theSecurePage.clickTheXBtn();

        await browser.refresh();
        await theSecurePage.addFirstItemToCartBtn.waitForClickable();
        await theSecurePage.clickAddFirstItemToCartBtn();

        await browser.waitUntil(
            async () => theSecurePage.removeItemFromCartBtn.isClickable(),
            { timeout: 5000, timeoutMsg: 'Remove from cart button was not clickable after 5 seconds' }
        );
        await theSecurePage.clickRemoveItemFromCartBtn();

        // Hamburger menu operations - Backpack -> All Items
        await theSecurePage.clickSauceLabsBackpackBtn();

        // Wait until backpack page is fully loaded
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory-item.html?id=4'),
            { timeout: 10000, timeoutMsg: 'Backpack page did not load' }
        );

        // Open Hamburger menu on backpack page
        await theSecurePage.openHamburgerMenu();
        await browser.pause(1000); // wait for menu animation
        await theSecurePage.clickAllItemsEntry(); // waits 10s internally
        await theSecurePage.clickTheXBtn({ timeout: 5000 });

        // Open Hamburger menu again on main page
        // Wait until the burger button exists
        await theSecurePage.burgerBtn.waitForExist({ timeout: 10000 });

        // Optional: scroll into view if necessary
        await theSecurePage.burgerBtn.scrollIntoView();

        // Wait until the button is clickable
        await theSecurePage.burgerBtn.waitForClickable({ timeout: 10000 });

        // Small pause for any menu animation
        await browser.pause(500);

        // Click the burger button
        await theSecurePage.burgerBtn.click();

        // Logout
        await LogoutProcess.logout();
    });

    // Positive login test for locked_out_user
    it('should show error for locked_out_user', async () => {
        await theLoginPage.open();
        await theLoginPage.login('locked_out_user', 'secret_sauce');
        await expect(theSecurePage.LockedOutUser).toBeExisting();
    });

    // Other positive user tests
    const positiveUsers = ['problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];
    for (let username of positiveUsers) {
        it(`should login with ${username}`, async () => {
            await theLoginPage.open();
            await theLoginPage.login(username, 'secret_sauce');
            await expect(theSecurePage.landingPage).toBeExisting();
            await LogoutProcess.logout();
        });
    }

    // Negative tests
    const negativeTests = [
        { username: 'standard_user', password: '', errorElement: () => theSecurePage.needsPassword, description: 'empty password' },
        { username: '', password: 'secret_sauce', errorElement: () => theSecurePage.needsUsername, description: 'empty username' },
        { username: '', password: '', errorElement: () => theSecurePage.needsUsername, description: 'both fields empty' }
    ];

    for (let test of negativeTests) {
        it(`should fail login with ${test.description}`, async () => {
            await theLoginPage.open();
            await theLoginPage.login(test.username, test.password);
            await expect(test.errorElement()).toBeExisting();
        });
    }

});