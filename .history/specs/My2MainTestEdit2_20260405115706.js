// import { browser, expect } from '@wdio/globals';
// import theLoginPage from '../pageobjects/loginpage.js';
// import theSecurePage from '../pageobjects/HamburgerMenuPage.js';
// import sauceLabsPageFunctions from '../pageobjects/sauceLabsPage.js';
// import addToCartMultipleofButtons from '../pageobjects/addToCartMultipleofButtons.js';

// async function goToSauceLabsFromMenu () {
//     await theSecurePage.openHamburgerMenu();
//     await browser.pause(500);

//     await browser.execute(() => {
//         const link = document.querySelector('#about_sidebar_link');
//         if (link) {
//             link.setAttribute('target', '_self');
//         }
//     });

//     await theSecurePage.clickAboutEntry();
//     await sauceLabsPageFunctions.waitForSauceLabsPageToLoad();
// }

// async function useSauceLabsSearch () {
//     await browser.pause(1500);
//     await sauceLabsPageFunctions.maybeOpenAndCloseSearch();
// }

// async function goBackToInventoryPage () {
//     await browser.url('https://www.saucedemo.com/inventory.html');
//     await browser.waitUntil(
//         async () => (await browser.getUrl()).includes('inventory.html'),
//         { timeout: 20000, timeoutMsg: 'Inventory page did not load' }
//     );
// }

// async function doSimpleCartTest () {
//     await theSecurePage.clickAddFirstItemToCartBtn();
//     await addToCartMultipleofButtons.clickSauceLabsBikeLightAddToCartBtn();
//     await addToCartMultipleofButtons.clickSauceLabsShoppingCartBtn();

//     await browser.waitUntil(
//         async () => (await browser.getUrl()).includes('cart.html'),
//         { timeout: 10000, timeoutMsg: 'Cart page did not load' }
//     );

//     await theSecurePage.clickRemoveItemFromCartBtn();
//     await addToCartMultipleofButtons.clickSauceLabsContinueShoppingBtn();

//     await browser.waitUntil(
//         async () => (await browser.getUrl()).includes('inventory.html'),
//         { timeout: 10000, timeoutMsg: 'Inventory page did not load again' }
//     );
// }

// async function logoutFromApp () {
//     await theSecurePage.openHamburgerMenu();
//     await browser.pause(500);
//     await theSecurePage.clickLogoutEntry();
// }

// describe('My Login application', () => {
//     const positiveUsers = [
//         'standard_user',
//         'problem_user',
//         'performance_glitch_user',
//         'error_user',
//         'visual_user'
//     ];

//     for (const username of positiveUsers) {
//         it(`should login with valid credentials using ${username} and visit Sauce Labs`, async function () {
//             this.timeout(420000);

//             await browser.reloadSession();
//             await theLoginPage.open();
//             await theLoginPage.login(username, 'secret_sauce');
//             await expect(theSecurePage.landingPage).toBeExisting();

//             await goToSauceLabsFromMenu();
//             await useSauceLabsSearch();
//             await goBackToInventoryPage();

//             if (username === 'performance_glitch_user' || username === 'error_user') {
//                 await logoutFromApp();
//                 return;
//             }

//             if (username === 'visual_user') {
//                 await theSecurePage.sauceLabsBackpack.waitForExist({ timeout: 10000 });
//                 await logoutFromApp();
//                 return;
//             }

//             await doSimpleCartTest();
//             await logoutFromApp();
//         });
//     }
// });

// describe('Negative Login Tests', () => {
//     const negativeTests = [
//         {
//             username: 'standard_user',
//             password: '',
//             errorElement: () => theSecurePage.needsPassword,
//             description: 'empty password'
//         },
//         {
//             username: '',
//             password: 'secret_sauce',
//             errorElement: () => theSecurePage.needsUsername,
//             description: 'empty username'
//         },
//         {
//             username: '',
//             password: '',
//             errorElement: () => theSecurePage.needsUsername,
//             description: 'both fields empty'
//         }
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
