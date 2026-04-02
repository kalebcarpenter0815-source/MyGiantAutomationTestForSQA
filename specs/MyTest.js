// // Work on this test 1 first, so that all of the sauce labs sign in's etc. are working and doing all of the functions they should be doing like describe "My Login application full function code" and then once that is working, have ChatGPT help you refactor it to be more efficient and less redundant by using functions and loops to cut down on the amount of code you have to write and maintain. Then you can do the same for test 2, which is basically just a copy of test 1 but with the functions and loops implemented so that it is much shorter and easier to read and maintain. Basically, in other words, what you did in test one, for all of those to work first in 
// // the first test, then have all of the sign in's work first, then for the second automation test, have ChatGPT re=edit the first test to be more efficient and less redundant by using functions and loops to cut down on the amount of code you have to write and maintain, and then copy that new more efficient code into the second test so that it is also more efficient and less redundant, just like what you originally did with test 1, where you did all that, and made ChatGPT copy that code to make it extra long test, except this one each line of code works for each individual test, but then you can have ChatGPT refactor it to be more efficient and less redundant by using functions and loops to cut down on the amount of code you have to write and maintain, and then copy that new more efficient code into the second test so that it is also more efficient and less redundant, just like what you originally did with test 1, where you did all that, and made ChatGPT copy 
// // that code to make it extra long test, except this one each line of code works for each individual test, but then you can have ChatGPT refactor it to be more efficient and less redundant by using functions and loops to cut down on the amount of code you have to write and maintain, and then copy that new more efficient code into the second test so that it is also more efficient and less redundant, just like what you originally did with test 1, where you did all that, and made ChatGPT copy that code to make it extra long test, except this one each line of code works for each individual test, but then you can have ChatGPT refactor it to be more efficient and less redundant by using functions and loops to cut down on the amount of code you have to write and maintain, and then copy that new more efficient code into the second test so that it is also more efficient and less redundant, just like what you originally did with test 1, where you did all that, and made 
// // ChatGPT copy that code to make it extra long test, except this one each line of code works for each individual test, but then you can have ChatGPT refactor it to be more efficient and less redundant by using functions and loops to cut down on the amount of code you have to write and maintain, and then copy that new more efficient code into the second test so that it is also more efficient and less redundant, just like what you originally did with test 1, where you did all that, and made ChatGPT copy that code to make it extra long test, except this one each line of code works for each individual test, but then you can have ChatGPT refactor it to be more efficient and less redundant by using functions and loops to cut down on the amount of code you have to write and maintain, and then copy that new more efficient code into the second test so that it is also more efficient and less redundant, just like what you originally did with test 1, where you did all that, 
// // and made ChatGPT copy that code to make it extra long test, except this one each line of code works for each individual test, but then you can have ChatGPT refactor it to be more efficient and less redundant by using functions and loops to cut down on the amount of code you have to write and maintain, and then copy that new more efficient code into the second test so that it is also more efficient and less redundant, just like what you originally did with test 1, where you did all that, and made ChatGPT copy that code to make it extra long test, except this one each line of code works for each individual test, but then you can have ChatGPT refactor it to be more efficient and less redundant by using functions and loops to cut down on the amount of code you have to write and maintain, and then copy that new more efficient code into the second test so that it is also more efficient and less redundant, just like what you originally did with test 1, where you did all that, and made ChatGPT copy that code to make it extra long test, except this one each line of code works for each individual test, but then you can have ChatGPT refactor it to be more efficient and less redundant by using functions and loops to cut down on the amount of code you have to write and maintain, and then copy that new more efficient code into the second test so that it is also more efficient and less redundant, just like what you originally did with test 1, where you did all that, and made ChatGPT copy that code to make it extra long test, except this one each line of code works for each individual test, but then you can have ChatGPT refactor it to be more efficient and less redundant by using functions and loops to cut down on the amount of code you have to write and maintain, and then copy that new more efficient code into the second test so that it is also more efficient and less redundant, just like what you

// // _________________FOR TEST 1___________________________

// import { browser, expect } from '@wdio/globals';
// import theLoginPage from '../pageobjects/loginpage.js';
// import theSecurePage from '../pageobjects/HamburgerMenuPage.js';
// import LogoutProcess from '../pageobjects/secureLogoutPage.js';
// import sauceLabsPageFunctions from '../pageobjects/sauceLabsPage.js';

// describe('My Login application', () => {

//     it('should login with valid credentials and visit Sauce Labs', async () => {
//         // Login
//         await theLoginPage.open();
//         await theLoginPage.login('standard_user', 'secret_sauce');
//         await expect(theSecurePage.landingPage).toBeExisting();

//         // Open Hamburger Menu
//         await theSecurePage.openHamburgerMenu();
//         await browser.pause(500); // wait for menu animation

//         // Wait for About link to exist and be clickable
//         await browser.waitUntil(
//             async () => theSecurePage.aboutEntry.isExisting(),
//             { timeout: 5000, timeoutMsg: 'About link did not appear after 5 seconds' }
//         );
//         await browser.waitUntil(
//             async () => theSecurePage.aboutEntry.isClickable(),
//             { timeout: 5000, timeoutMsg: 'About link was not clickable after 5 seconds' }
//         );

//         // Force About link to open in same tab
//         await browser.execute(() => {
//             const link = document.querySelector('#about_sidebar_link');
//             if (link) link.setAttribute('target', '_self');
//         });

//         // Click About
//         await theSecurePage.clickAboutEntry();

//         // Wait for Sauce Labs page
//         await browser.waitUntil(
//             async () => (await browser.getUrl()).includes('saucelabs.com'),
//             { timeout: 10000, timeoutMsg: 'Page transition to Sauce Labs failed' }
//         );

//         await browser.pause(2000); // wait for animations

//         // Interact with Sauce Labs button
//         await sauceLabsPageFunctions.sauceLabsSearchBtn.scrollIntoView();
//         await sauceLabsPageFunctions.sauceLabsSearchBtn.waitForClickable({ timeout: 10000 });
//         await sauceLabsPageFunctions.clickSauceLabsSearchBtn();

//         // Close overlay
//         await sauceLabsPageFunctions.sauceLabsSearchXBtn.waitForExist({ timeout: 10000 });
//         await sauceLabsPageFunctions.clickSauceLabsSearchXBtn();

//         // Return to Swag Labs inventory
//         await browser.url('https://www.saucedemo.com/inventory.html');
//         await browser.waitUntil(
//             async () => (await browser.getUrl()).includes('inventory.html'),
//             { timeout: 5000, timeoutMsg: 'Failed to return to inventory' }
//         );

//         // Cart operations
//         await theSecurePage.addFirstItemToCartBtn.waitForClickable();
//         await theSecurePage.clickAddFirstItemToCartBtn();

//         await theSecurePage.openHamburgerMenu();
//         await browser.pause(500); // wait for menu animation
//         await theSecurePage.clickResetAppState();
//         await theSecurePage.theXBtn.waitForClickable({ timeout: 5000 });
//         await theSecurePage.clickTheXBtn();

//         await browser.refresh();
//         await theSecurePage.addFirstItemToCartBtn.waitForClickable();
//         await theSecurePage.clickAddFirstItemToCartBtn();

//         await browser.waitUntil(
//             async () => theSecurePage.removeItemFromCartBtn.isClickable(),
//             { timeout: 5000, timeoutMsg: 'Remove from cart button was not clickable after 5 seconds' }
//         );
//         await theSecurePage.clickRemoveItemFromCartBtn();

//         // Hamburger menu operations - Backpack -> All Items
//         await theSecurePage.clickSauceLabsBackpackBtn();

//         // Wait until backpack page is fully loaded
//         await browser.waitUntil(
//             async () => (await browser.getUrl()).includes('inventory-item.html?id=4'),
//             { timeout: 10000, timeoutMsg: 'Backpack page did not load' }
//         );

//         // Open Hamburger menu on backpack page
//         await browser.execute(() => {
//             const burgerBtn = document.querySelector('.bm-burger-button');
//             if (burgerBtn) burgerBtn.click();
//         });
    
//         await browser.pause(1000); // wait for menu animation
//         await theSecurePage.clickAllItemsEntry(); // waits 10s internally

//         // Wait until the page is the main inventory page
//         await browser.waitUntil(
//             async () => (await browser.getUrl()).includes('inventory.html'),
//             { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking All Items' }
//         );
//         await browser.pause(1000); // wait for any animations
//         await theSecurePage.clickSauceLabsBackpackBtn();

//         // Wait until backpack page is fully loaded again
//         await browser.waitUntil(
//             async () => (await browser.getUrl()).includes('inventory-item.html?id=4'),
//             { timeout: 10000, timeoutMsg: 'Backpack page did not load after clicking backpack button again' }
//         );
//         await browser.waitUntil(
//             async () => theSecurePage.backToProductsBtn.isExisting(),
//             { timeout: 10000, timeoutMsg: 'Back to Products button did not exist on backpack page' }
//         );
//         await theSecurePage.clickBackToProductsBtn();

//         // Wait until the page is the main inventory page again
//         await browser.waitUntil(
//             async () => (await browser.getUrl()).includes('inventory.html'),
//             { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking Back to Products' }
//         );

//         // Wait until hamburger menu button is interactable again
//         let burgerBtn = await LogoutProcess.hamburgerMenu();
//         await burgerBtn.waitForClickable({ timeout: 5000 });

//         // Scroll it into view just in case 
//         await burgerBtn.scrollIntoView({ block: 'start', inline: 'start' });

//         // Now call your existing logout
//         await LogoutProcess.logout();
//     });
// });

// // My AIHelpTest.js file will be copy and pasted to change the green text below till the test ends!

// // describe('Additional Login Tests', () => {
// //     const positiveUsers = ['problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];
    
// //    for (let username of positiveUsers) {
// //     it(`should run custom flow for ${username}`, async () => {
// //         // --- 1. COMMON LOGIN ---
// //         await theLoginPage.open();
// //         await theLoginPage.login(username, 'secret_sauce');

// //         // Force redirect for the problem_user specifically
// //         if (username === 'problem_user') {
// //             try {
// //                 await browser.waitUntil(async () => (await browser.getUrl()).includes('inventory.html'), { timeout: 5000 });
// //             } catch (e) {
// //                 await browser.url('https://www.saucedemo.com/inventory.html');
// //             }
// //         }

// //         // --- 2. THE "CUSTOM ACTION" HUB ---
        
// //         // SPECIFIC LOGIC FOR PROBLEM USER
// //         if (username === 'problem_user') {
// //             await theSecurePage.openHamburgerMenu();
// //             await theSecurePage.aboutEntry.waitForExist({ timeout: 5000 });
            
// //             // Your specific 'About' -> 'Search' -> 'Back' flow
// //             await theSecurePage.clickAboutEntry();
// //             await sauceLabsPageFunctions.clickSauceLabsSearchBtn(); 
// //             await browser.back(); // Go back to Sauce Demo
// //         }

// //         // SPECIFIC LOGIC FOR ERROR USER
// //         if (username === 'error_user') {
// //             // Maybe for this user you just want to check if the footer exists
// //             await expect(theSecurePage.footer).toBeExisting();
// //         }

// //         // --- 3. BACK TO COMMON ACTIONS (Cart, etc.) ---
// //         // Every user (problem, visual, glitch) will do this part:
// //         await theSecurePage.addFirstItemToCartBtn.waitForExist({ timeout: 10000 });
// //         await theSecurePage.clickAddFirstItemToCartBtn();

// //         // --- 4. LOGOUT ---
// //         await LogoutProcess.logout();
// //         });
// //     }
// // });
//     // The comment looking green letters below are the code to go back to in case this test above does not work, so I have something to resort back to just in case this code above this sentence within this describe block doesn't work.
//     // for (let username of positiveUsers) {
//     //     it(`should login with ${username}`, async () => {
//     //         // --- 1. LOGIN ---
//     //         await theLoginPage.open();
//     //         await theLoginPage.login(username, 'secret_sauce');

//     //         // Handle the potential lag for performance_glitch_user
//     //         // NEW: Confirm we reached the inventory page after login
//     //         await browser.waitUntil(
//     //         async () => (await browser.getUrl()).includes('inventory.html'),
//     //         { timeout: 15000, timeoutMsg: 'Failed to reach inventory page after login' }
//     //         );
//     //         await expect(theSecurePage.landingPage).toBeExisting();
            
//     //         // --- 2. ABOUT PAGE NAVIGATION ---
//     //         await theSecurePage.openHamburgerMenu();
//     //         await browser.pause(1000); 

//     //         await theSecurePage.aboutEntry.waitForExist({ timeout: 7000 });

//     //         await browser.execute(() => {
//     //             const link = document.querySelector('#about_sidebar_link');
//     //             if (link) link.setAttribute('target', '_self');
//     //         });

//     //         await theSecurePage.clickAboutEntry();

//     //         // Wait for Sauce Labs site to load
//     //         await browser.waitUntil(
//     //             async () => (await browser.getUrl()).includes('saucelabs.com'),
//     //             { timeout: 15000 }
//     //         );

//     //         await browser.pause(2000);
//     //         await sauceLabsPageFunctions.sauceLabsSearchBtn.scrollIntoView();
//     //         await sauceLabsPageFunctions.sauceLabsSearchBtn.waitForClickable({ timeout: 10000 });
//     //         await sauceLabsPageFunctions.clickSauceLabsSearchBtn();
            
//     //         await sauceLabsPageFunctions.sauceLabsSearchXBtn.waitForExist({ timeout: 10000 });
//     //         await sauceLabsPageFunctions.clickSauceLabsSearchXBtn();

//     //         // --- 3. CART ACTIONS ---
//     //         await browser.url('https://www.saucedemo.com/inventory.html');
//     //         await browser.waitUntil(
//     //             async () => (await browser.getUrl()).includes('inventory.html'),
//     //             { timeout: 15000, timeoutMsg: 'Failed to navigate back to inventory page after visiting Sauce Labs' }
//     //         );
//     //         const backpackBtn = await $('//button[text()="Add to cart"]');
//     //         await theSecurePage.addFirstItemToCartBtn.waitForExist({ timeout: 10000 });
//     //         await theSecurePage.addFirstItemToCartBtn.scrollIntoView();
//     //         await theSecurePage.addFirstItemToCartBtn.waitForClickable({ timeout: 10000 });
//     //         await theSecurePage.clickAddFirstItemToCartBtn();

//     //         // Reset App State logic
//     //         await theSecurePage.openHamburgerMenu();
//     //         await browser.pause(500);
//     //         await theSecurePage.clickResetAppState();
//     //         await theSecurePage.theXBtn.waitForClickable({ timeout: 5000 });
//     //         await theSecurePage.clickTheXBtn();

//     //         await browser.refresh();

//     //         await theSecurePage.addFirstItemToCartBtn.waitForExist({ timeout: 10000 });
//     //         await theSecurePage.addFirstItemToCartBtn.waitForClickable({ timeout: 10000 });
//     //         await theSecurePage.clickAddFirstItemToCartBtn();

//     //         // Handle 'Remove' logic for error_user and potential flakiness
//     //         if (username !== 'error_user') {
//     //             try {
//     //                 await theSecurePage.removeItemFromCartBtn.waitForExist({ timeout: 3000 });
//     //                 await theSecurePage.removeItemFromCartBtn.waitForClickable({ timeout: 3000 });
//     //                 await theSecurePage.clickRemoveItemFromCartBtn();
//     //             } catch (error) {
//     //                 // Graceful exit: if remove fails, we just continue the test
//     //             }
//     //         } 

//     //         // --- 4. PRODUCT DETAIL NAVIGATION ---
//     //         await theSecurePage.clickSauceLabsBackpackBtn();
            
//     //         await browser.waitUntil(
//     //             async () => (await browser.getUrl()).includes('inventory-item.html?id=4'),
//     //             { timeout: 15000 }
//     //         );

//     //         await theSecurePage.backToProductsBtn.waitForExist({ timeout: 10000 });
//     //         await theSecurePage.clickBackToProductsBtn();

//     //         // --- 5. LOGOUT ---
//     //         let burgerBtn = await LogoutProcess.hamburgerMenu();
//     //         await burgerBtn.waitForExist({ timeout: 10000 });
//     //         await burgerBtn.waitForClickable({ timeout: 10000 });
//     //         await LogoutProcess.logout();
            
// //         }); 
// //     } 
// // });

// describe('Negative Login Tests', () => {
//     // Negative tests
//     const negativeTests = [
//         { username: 'standard_user', password: '', errorElement: () => theSecurePage.needsPassword, description: 'empty password' },
//         { username: '', password: 'secret_sauce', errorElement: () => theSecurePage.needsUsername, description: 'empty username' },
//         { username: '', password: '', errorElement: () => theSecurePage.needsUsername, description: 'both fields empty' }
//     ];

//     for (let test of negativeTests) {
//         it(`should fail login with ${test.description}`, async () => {
//             await theLoginPage.open();
//             await theLoginPage.login(test.username, test.password);
//             await expect(test.errorElement()).toBeExisting();
//         });
//     }
// });

// //______________FOR TEST 2___________________________
// // DON'T WORK ON THIS TILL TEST 1 IS FULLY WORKING WITH ALL THE FUNCTIONS AND LOOPS AND EVERYTHING.
// // import { browser, expect } from '@wdio/globals';
// // import theLoginPage from '../pageobjects/loginpage.js';
// // import theSecurePage from '../pageobjects/HamburgerMenuPage.js';
// // import LogoutProcess from '../pageobjects/secureLogoutPage.js';
// // import sauceLabsPageFunctions from '../pageobjects/sauceLabsPage.js';

// // async function runFullUserFlow() {
// //     await expect(theSecurePage.landingPage).toBeExisting();

// //     await theSecurePage.openHamburgerMenu();
// //     await browser.pause(500);

// //     await browser.waitUntil(
// //         async () => theSecurePage.aboutEntry.isExisting(),
// //         { timeout: 5000 }
// //     );
// //     await browser.waitUntil(
// //         async () => theSecurePage.aboutEntry.isClickable(),
// //         { timeout: 5000 }
// //     );

// //     await browser.execute(() => {
// //         const link = document.querySelector('#about_sidebar_link');
// //         if (link) link.setAttribute('target', '_self');
// //     });

// //     await theSecurePage.clickAboutEntry();

// //     await browser.waitUntil(
// //         async () => (await browser.getUrl()).includes('saucelabs.com'),
// //         { timeout: 10000 }
// //     );

// //     await browser.pause(2000);

// //     await sauceLabsPageFunctions.sauceLabsSearchBtn.scrollIntoView();
// //     await sauceLabsPageFunctions.sauceLabsSearchBtn.waitForClickable({ timeout: 10000 });
// //     await sauceLabsPageFunctions.clickSauceLabsSearchBtn();

// //     await sauceLabsPageFunctions.sauceLabsSearchXBtn.waitForExist({ timeout: 10000 });
// //     await sauceLabsPageFunctions.clickSauceLabsSearchXBtn();

// //     await browser.url('https://www.saucedemo.com/inventory.html');

// //     await browser.waitUntil(
// //         async () => (await browser.getUrl()).includes('inventory.html'),
// //         { timeout: 5000 }
// //     );

// //     await theSecurePage.addFirstItemToCartBtn.waitForClickable();
// //     await theSecurePage.clickAddFirstItemToCartBtn();

// //     await theSecurePage.openHamburgerMenu();
// //     await browser.pause(500);
// //     await theSecurePage.clickResetAppState();
// //     await theSecurePage.theXBtn.waitForClickable({ timeout: 5000 });
// //     await theSecurePage.clickTheXBtn();

// //     await browser.refresh();

// //     await theSecurePage.addFirstItemToCartBtn.waitForClickable();
// //     await theSecurePage.clickAddFirstItemToCartBtn();

// //     await browser.waitUntil(
// //         async () => theSecurePage.removeItemFromCartBtn.isClickable(),
// //         { timeout: 5000 }
// //     );
// //     await theSecurePage.clickRemoveItemFromCartBtn();

// //     await theSecurePage.clickSauceLabsBackpackBtn();

// //     await browser.waitUntil(
// //         async () => (await browser.getUrl()).includes('inventory-item.html?id=4'),
// //         { timeout: 10000 }
// //     );

// //     await browser.execute(() => {
// //         const burgerBtn = document.querySelector('.bm-burger-button');
// //         if (burgerBtn) burgerBtn.click();
// //     });

// //     await browser.pause(1000);

// //     await theSecurePage.clickAllItemsEntry();

// //     await browser.waitUntil(
// //         async () => (await browser.getUrl()).includes('inventory.html'),
// //         { timeout: 10000 }
// //     );

// //     await browser.pause(1000);

// //     await theSecurePage.clickSauceLabsBackpackBtn();

// //     await browser.waitUntil(
// //         async () => (await browser.getUrl()).includes('inventory-item.html?id=4'),
// //         { timeout: 10000 }
// //     );

// //     await browser.waitUntil(
// //         async () => theSecurePage.backToProductsBtn.isExisting(),
// //         { timeout: 10000 }
// //     );

// //     await theSecurePage.clickBackToProductsBtn();

// //     await browser.waitUntil(
// //         async () => (await browser.getUrl()).includes('inventory.html'),
// //         { timeout: 10000 }
// //     );

// //     let burgerBtn = await LogoutProcess.hamburgerMenu();
// //     await burgerBtn.waitForClickable({ timeout: 5000 });

// //     await burgerBtn.scrollIntoView({ block: 'start', inline: 'start' });

// //     await LogoutProcess.logout();
// // }

// // describe('My Login application', () => {

// //     // ONLY CHANGE: use the function instead of duplicating logic
// //     it('should login with valid credentials and visit Sauce Labs', async () => {
// //         await theLoginPage.open();
// //         await theLoginPage.login('standard_user', 'secret_sauce');
// //         await runFullUserFlow();
// //     });
// // });

// // describe('Additional Login Tests', () => {
// //     const positiveUsers = ['problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];

// //     for (let username of positiveUsers) {
// //         it(`should login with ${username}`, async () => {
// //             await theLoginPage.open();
// //             await theLoginPage.login(username, 'secret_sauce');
// //             await expect(theSecurePage.landingPage).toBeExisting();
// //             await LogoutProcess.logout();
// //         });
// //     }
// // });

// // describe('Negative Login Tests', () => {
// //     const negativeTests = [
// //         { username: 'standard_user', password: '', errorElement: () => theSecurePage.needsPassword, description: 'empty password' },
// //         { username: '', password: 'secret_sauce', errorElement: () => theSecurePage.needsUsername, description: 'empty username' },
// //         { username: '', password: '', errorElement: () => theSecurePage.needsUsername, description: 'both fields empty' }
// //     ];

// //     for (let test of negativeTests) {
// //         it(`should fail login with ${test.description}`, async () => {
// //             await theLoginPage.open();
// //             await theLoginPage.login(test.username, test.password);
// //             await expect(test.errorElement()).toBeExisting();
// //         });
// //     }
// // });