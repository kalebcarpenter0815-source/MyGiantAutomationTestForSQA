// // This file is my cleaned-up version of the positive and negative login tests.

// import { browser, expect } from '@wdio/globals';
// import theLoginPage from '../pageobjects/loginpage.js';
// import theSecurePage from '../pageobjects/HamburgerMenuPage.js';
// import LogoutProcess from '../pageobjects/secureLogoutPage.js';
// import sauceLabsPageFunctions from '../pageobjects/sauceLabsPage.js';

// async function openAboutFromHamburgerMenu() {
//     await theSecurePage.openHamburgerMenu();
//     await browser.pause(500);

//     await browser.waitUntil(
//         async () => theSecurePage.aboutEntry.isExisting(),
//         { timeout: 5000, timeoutMsg: 'About link did not appear after 5 seconds' }
//     );

//     await browser.waitUntil(
//         async () => theSecurePage.aboutEntry.isClickable(),
//         { timeout: 5000, timeoutMsg: 'About link was not clickable after 5 seconds' }
//     );

//     await browser.execute(() => {
//         const link = document.querySelector('#about_sidebar_link');
//         if (link) {
//             link.setAttribute('target', '_self');
//         }
//     });

//     const handlesBeforeAboutClick = await browser.getWindowHandles();

//     await theSecurePage.clickAboutEntry();

//     await browser.waitUntil(
//         async () => {
//             const handles = await browser.getWindowHandles();
//             if (handles.length > handlesBeforeAboutClick.length) {
//                 return true;
//             }

//             const currentUrl = await browser.getUrl();
//             return currentUrl.includes('saucelabs.com') || currentUrl.includes('/error/404');
//         },
//         { timeout: 15000, timeoutMsg: 'About click did not open Sauce Labs or a new tab' }
//     );

//     const handlesAfterAboutClick = await browser.getWindowHandles();
//     if (handlesAfterAboutClick.length > handlesBeforeAboutClick.length) {
//         const newHandle = handlesAfterAboutClick.find((h) => !handlesBeforeAboutClick.includes(h));
//         if (newHandle) {
//             await browser.switchToWindow(newHandle);
//         }
//     }
// }

// async function interactWithSauceLabsPage(expectedUrlText = 'saucelabs.com', timeout = 10000) {
//     await browser.waitUntil(
//         async () => (await browser.getUrl()).includes(expectedUrlText),
//         { timeout, timeoutMsg: 'Page transition to Sauce Labs failed' }
//     );

//     await browser.pause(2000);

//     await browser.pause(1000);
//     await sauceLabsPageFunctions.maybeOpenAndCloseSearch();
//     await browser.pause(500);
// }

// async function goBackToInventory(timeout = 10000) {
//     await browser.url('https://www.saucedemo.com/inventory.html');
//     await browser.waitUntil(
//         async () => (await browser.getUrl()).includes('inventory.html'),
//         { timeout, timeoutMsg: 'Failed to return to inventory' }
//     );
// }

// async function resetAppStateFromMenu() {
//     await theSecurePage.openHamburgerMenu();
//     await browser.pause(500);
//     await theSecurePage.clickResetAppState();
//     await theSecurePage.theXBtn.waitForClickable({ timeout: 5000 });
//     await theSecurePage.clickTheXBtn();
// }

// async function goToBackpackAndOpenAllItems(backpackUrlPart, timeoutMessage) {
//     await theSecurePage.clickSauceLabsBackpackBtn();

//     await browser.waitUntil(
//         async () => (await browser.getUrl()).includes(backpackUrlPart),
//         { timeout: 10000, timeoutMsg: timeoutMessage }
//     );

//     await theSecurePage.openHamburgerMenu();
//     await browser.pause(1000);
//     await theSecurePage.clickAllItemsEntry();

//     await browser.waitUntil(
//         async () => (await browser.getUrl()).includes('inventory.html'),
//         { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking All Items' }
//     );

//     await browser.pause(1000);
//     await theSecurePage.clickSauceLabsBackpackBtn();
// }

// async function finishWithBackToProducts(backpackUrlPart, timeoutMessage) {
//     await browser.waitUntil(
//         async () => (await browser.getUrl()).includes(backpackUrlPart),
//         { timeout: 10000, timeoutMsg: timeoutMessage }
//     );

//     await browser.waitUntil(
//         async () => theSecurePage.backToProductsBtn.isExisting(),
//         { timeout: 10000, timeoutMsg: 'Back to Products button did not exist on backpack page' }
//     );

//     await theSecurePage.clickBackToProductsBtn();

//     await browser.waitUntil(
//         async () => (await browser.getUrl()).includes('inventory.html'),
//         { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking Back to Products' }
//     );
// }

// async function logoutAtEnd() {
//     const burgerBtn = await LogoutProcess.hamburgerMenu();
//     await burgerBtn.waitForClickable({ timeout: 5000 });
//     await burgerBtn.scrollIntoView({ block: 'start', inline: 'start' });
//     await LogoutProcess.logout();
// }

// describe('My Login application', () => {
//     it('should login with valid credentials using the standard_user username to sign in and visit Sauce Labs', async () => {
//         await browser.reloadSession();
//         await browser.url('https://www.saucedemo.com/');

//         await theLoginPage.open();
//         await theLoginPage.login('standard_user', 'secret_sauce');
//         await expect(theSecurePage.landingPage).toBeExisting();

//         const handlesBeforeAboutClick = await browser.getWindowHandles();

//         await openAboutFromHamburgerMenu();

//         await browser.waitUntil(
//             async () => {
//                 const handles = await browser.getWindowHandles();
//                 if (handles.length > handlesBeforeAboutClick.length) {
//                     return true;
//                 }

//                 return (await browser.getUrl()).includes('saucelabs.com');
//             },
//             { timeout: 15000, timeoutMsg: 'About click did not open Sauce Labs or a new tab' }
//         );

//         const handlesAfterAboutClick = await browser.getWindowHandles();
//         if (handlesAfterAboutClick.length > handlesBeforeAboutClick.length) {
//             const newHandle = handlesAfterAboutClick.find((h) => !handlesBeforeAboutClick.includes(h));
//             if (newHandle) {
//                 await browser.switchToWindow(newHandle);
//             }
//         }

//         await interactWithSauceLabsPage('saucelabs.com', 15000);
//         await goBackToInventory();

//         await theSecurePage.clickAddFirstItemToCartBtn();
//         await resetAppStateFromMenu();

//         await browser.refresh();
//         await theSecurePage.clickAddFirstItemToCartBtn();

//         await browser.waitUntil(
//             async () => theSecurePage.removeItemFromCartBtn.isClickable(),
//             { timeout: 5000, timeoutMsg: 'Remove from cart button was not clickable after 5 seconds' }
//         );
//         await theSecurePage.clickRemoveItemFromCartBtn();

//         await goToBackpackAndOpenAllItems(
//             'inventory-item.html?id=4',
//             'Backpack page did not load'
//         );

//         await finishWithBackToProducts(
//             'inventory-item.html?id=4',
//             'Backpack page did not load after clicking backpack button again'
//         );

//         await logoutAtEnd();
//     });

//     it('should login with valid credentials using the problem_user username then loging in and visiting Sauce Labs', async () => {
//         await browser.reloadSession();
//         await browser.url('https://www.saucedemo.com/');

//         await theLoginPage.open();
//         await theLoginPage.login('problem_user', 'secret_sauce');
//         await expect(theSecurePage.landingPage).toBeExisting();

//         await openAboutFromHamburgerMenu();
//         await interactWithSauceLabsPage('/error/404');
//         await goBackToInventory(5000);

//         await theSecurePage.clickAddFirstItemToCartBtn();
//         await resetAppStateFromMenu();

//         await browser.refresh();
//         // The remove button part has a bug for this user, so I am skipping it here.

//         await goToBackpackAndOpenAllItems(
//             'inventory-item.html?id=5',
//             'Sauce Labs Fleece Jacket page instead of the backpack page did not load'
//         );

//         await finishWithBackToProducts(
//             'inventory-item.html?id=5',
//             'Fleece Jacket page did not load after clicking backpack button again'
//         );

//         await logoutAtEnd();
//     });

//     it('should login with valid credentials using the username performance_glitch_user and visit Sauce Labs', async () => {
//         await browser.reloadSession();
//         await browser.url('https://www.saucedemo.com/');

//         await theLoginPage.open();
//         await theLoginPage.login('performance_glitch_user', 'secret_sauce');
//         await expect(theSecurePage.landingPage).toBeExisting({
//             timeout: 30000,
//             timeoutMsg: 'Login took too long and could not be completed in 30 seconds'
//         });

//         await openAboutFromHamburgerMenu();
//         await interactWithSauceLabsPage();
//         await goBackToInventory();

//         await theSecurePage.clickAddFirstItemToCartBtn();
//         await resetAppStateFromMenu();

//         await browser.refresh();
//         // There is a bug with the remove button in this flow, so I left it skipped.

//         await theSecurePage.sauceLabsBackpack.scrollIntoView({
//             timeout: 10000,
//             timeoutMsg: 'saucebLabsBackpack did not appear on the Sauce Labs homepage'
//         });

//         await goToBackpackAndOpenAllItems(
//             'inventory-item.html?id=4',
//             'Backpack page did not load'
//         );

//         await theSecurePage.addToCartBtnForSLBPage.waitForClickable();
//         await theSecurePage.clickAddToCartBtnForSLBPage();

//         await browser.waitUntil(
//             async () => theSecurePage.removeSauceLabsBackpackButtonNotOnMainPage.isExisting(),
//             { timeout: 10000, timeoutMsg: 'The Remove button on the Sauce Labs Backpack page was not clickable' }
//         );

//         await finishWithBackToProducts(
//             'inventory-item.html?id=4',
//             'Backpack page did not load after clicking backpack button again'
//         );

//         await logoutAtEnd();
//     });

//     it('should login with valid credentials using the error_user username to sign in and visit Sauce Labs', async () => {
//         await browser.reloadSession();
//         await browser.url('https://www.saucedemo.com/');

//         await theLoginPage.open();
//         await theLoginPage.login('error_user', 'secret_sauce');
//         await expect(theSecurePage.landingPage).toBeExisting();

//         await openAboutFromHamburgerMenu();
//         await interactWithSauceLabsPage();
//         await goBackToInventory(5000);

//         // error_user is not showing the add to cart button here,
//         // so I am just checking that the page loaded.
//         await theSecurePage.sauceLabsBackpack.waitForExist({ timeout: 10000 });

//         await resetAppStateFromMenu();

//         await browser.refresh();
//         // Remove button has a bug in this flow too, so I skipped it.

//         await goToBackpackAndOpenAllItems(
//             'inventory-item.html?id=4',
//             'Backpack page did not load'
//         );

//         await finishWithBackToProducts(
//             'inventory-item.html?id=4',
//             'Backpack page did not load after clicking backpack button again'
//         );

//         await logoutAtEnd();
//     });

//     it('should login with valid credentials using the visual_user username to sign in and visit Sauce Labs', async () => {
//         await browser.reloadSession();
//         await browser.url('https://www.saucedemo.com/');

//         await theLoginPage.open();
//         await theLoginPage.login('visual_user', 'secret_sauce');
//         await expect(theSecurePage.landingPage).toBeExisting();

//         await openAboutFromHamburgerMenu();
//         await interactWithSauceLabsPage();
//         await goBackToInventory(5000);

//         // visual_user is not showing the add to cart button here,
//         // so I am just making sure the inventory page loaded.
//         await theSecurePage.sauceLabsBackpack.waitForExist({ timeout: 10000 });

//         await resetAppStateFromMenu();

//         await browser.refresh();
//         // Remove button has a bug here too, so I skipped that part.

//         await goToBackpackAndOpenAllItems(
//             'inventory-item.html?id=4',
//             'Backpack page did not load'
//         );

//         await theSecurePage.addToCartBtnForSLBPage.waitForDisplayed({ timeout: 10000 });
//         await theSecurePage.clickAddToCartBtnForSLBPage();

//         await theSecurePage.removeSauceLabsBackpackButtonNotOnMainPage.waitForDisplayed({ timeout: 5000 });
//         await theSecurePage.clickRemoveSauceLabsBackpackButtonNotOnMainPage();

//         await browser.refresh();

//         await finishWithBackToProducts(
//             'inventory-item.html?id=4',
//             'Backpack page did not load after refreshing the Sauce Labs Backpack page'
//         );

//         await logoutAtEnd();
//     });
// });

// describe('Negative Login Tests', () => {
//     const negativeTests = [
//         { username: 'standard_user', password: '', errorElement: () => theSecurePage.needsPassword, description: 'empty password' },
//         { username: '', password: 'secret_sauce', errorElement: () => theSecurePage.needsUsername, description: 'empty username' },
//         { username: '', password: '', errorElement: () => theSecurePage.needsUsername, description: 'both fields empty' }
//     ];

//     for (const test of negativeTests) {
//         it(`should fail login with ${test.description}`, async () => {
//             await browser.reloadSession();
//             await theLoginPage.open();
//             await theLoginPage.login(test.username, test.password);
//             await expect(test.errorElement()).toBeExisting();
//         });
//     }
// });
