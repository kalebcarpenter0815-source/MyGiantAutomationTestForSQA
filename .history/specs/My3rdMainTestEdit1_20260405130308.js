//__________________________THIS IS MY SECOND TEST CASE POSITIVE USERS TEST!______________________________


import { browser, expect } from '@wdio/globals';
import theLoginPage from '../pageobjects/loginpage.js';
import theSecurePage from '../pageobjects/HamburgerMenuPage.js';
import LogoutProcess from '../pageobjects/secureLogoutPage.js';
import sauceLabsPageFunctions from '../pageobjects/sauceLabsPage.js';
import addToCartMultipleofButtons from '../pageobjects/addToCartMultipleofButtons.js';


describe('My Login application', () => {

   it('should login with valid credentials using the standard_user username to sign in and visit Sauce Labs', async () => {
       await browser.reloadSession();
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


       // The code below will be un-commented if this next test doesn't work, or if we still need it in order for the test to work.
       // Force About link to open in same tab
       await browser.execute(() => {
           const link = document.querySelector('#about_sidebar_link');
           if (link) link.setAttribute('target', '_self');
       });


       const handlesBeforeAboutClick = await browser.getWindowHandles();


       // Click About
       await theSecurePage.clickAboutEntry();


       // If a new tab opened, switch to it. If not, stay in the current tab.
       await browser.waitUntil(
           async () => {
               const handles = await browser.getWindowHandles();
               if (handles.length > handlesBeforeAboutClick.length) return true;
               return (await browser.getUrl()).includes('saucelabs.com');
           },
           { timeout: 15000, timeoutMsg: 'About click did not open Sauce Labs or a new tab' }
       );


       const handlesAfterAboutClick = await browser.getWindowHandles();
       if (handlesAfterAboutClick.length > handlesBeforeAboutClick.length) {
           const newHandle = handlesAfterAboutClick.find((h) => !handlesBeforeAboutClick.includes(h));
           if (newHandle) {
               await browser.switchToWindow(newHandle);
           }
       }


       // Wait for Sauce Labs page
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('saucelabs.com'),
           { timeout: 15000, timeoutMsg: 'Page transition to Sauce Labs failed' }
       );


       await browser.pause(2000); // wait for animations


       // // Interact with Sauce Labs button (OPEN THIS BACK UP AT MY COMPUTER AT HOME!!!!)
       await browser.pause(1000);
       await sauceLabsPageFunctions.maybeOpenAndCloseSearch();




       // // Close overlay
       await browser.pause(500);




       // Return to Swag Labs inventory
       //Use the await browser.url if this await browser.back(); // or await browser.url('https://your-main-site.com') doesn't work at all.
       await browser.url('https://www.saucedemo.com/inventory.html');
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Failed to return to inventory' }
       );
       // await browser.back(); // or await browser.url('https://www.saucedemo.com/inventory.html')


       // Cart operations
    //    await theSecurePage.addFirstItemToCartBtn.waitForClickable();
       await theSecurePage.clickAddFirstItemToCartBtn();




       await theSecurePage.openHamburgerMenu();
       await browser.pause(500); // wait for menu animation
       await theSecurePage.clickResetAppState();
       await theSecurePage.theXBtn.waitForClickable({ timeout: 5000 });
       await theSecurePage.clickTheXBtn();




       await browser.refresh();
    //    await theSecurePage.addFirstItemToCartBtn.waitForClickable();
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




       // Wait until the page is the main inventory page
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking All Items' }
       );
       await browser.pause(1000); // wait for any animations
       await theSecurePage.clickSauceLabsBackpackBtn();




       // Wait until backpack page is fully loaded again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory-item.html?id=4'),
           { timeout: 10000, timeoutMsg: 'Backpack page did not load after clicking backpack button again' }
       );
       await browser.waitUntil(
           async () => theSecurePage.backToProductsBtn.isExisting(),
           { timeout: 10000, timeoutMsg: 'Back to Products button did not exist on backpack page' }
       );
       await theSecurePage.clickBackToProductsBtn();


       // Wait until the page is the main inventory page again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking Back to Products' }
       );

       // Now lets do the rest of the Add to cart buttons on the Swag Labs Products homepage
       await theSecurePage.clickAddFirstItemToCartBtn(); // Backpack
       await addToCartMultipleofButtons.clickSauceLabsBikeLightAddToCartBtn(); // Bike Light

       // To confirm it actually updated and not just displaying however many selected items there are on the shopping cart icon
       await addToCartMultipleofButtons.clickSauceLabsShoppingCartBtn(); // Shopping Cart
       
       // Now lets wait to see if the items in the shopping cart page actually updated and loaded properly
       await browser.waitUntil(
        async () => (await browser.getUrl()).includes('cart.html'),
        { timeout: 10000, timeoutMsg: 'Shopping Cart page did not load after clicking on the Shopping Cart icon' }
       );

       // REMOVE ONE ITEM FROM CART
       await theSecurePage.clickRemoveItemFromCartBtn(); // Removed the Backpack from the cart

       // Lets make sure the page actually loaded visually
       await browser.pause(1000);

       // Click the Continue Shopping button to continue with the test
       await addToCartMultipleofButtons.clickSauceLabsContinueShoppingBtn(); // Clicks the Continue Shopping button

       // Wait until the page is the main inventory page again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking Back to Products' }
       ); 

       // Add another item to the cart
       await addToCartMultipleofButtons.clickSauceLabsBoltTShirt(); // Bolt T-Shirt

       // Lets make sure the animation to the next button works without error
       await browser.pause(500);

       // Click the Sauce Labs shopping cart icon in the top right hand corner of the screen
       await addToCartMultipleofButtons.clickSauceLabsShoppingCartBtn();

       // Now lets wait to see if the items in the shopping cart page actually updated and loaded properly
       await browser.waitUntil(
        async () => (await browser.getUrl()).includes('cart.html'),
        { timeout: 10000, timeoutMsg: 'Shopping Cart page did not load after clicking on the Shopping Cart icon' }
       );

       // REMOVE EVERYTHING FROM CART: Backpack, Bike Light, Bolt T-Shirt
       await addToCartMultipleofButtons.clickRemoveSauceLabsBikeLightBtn(); // Remove the Bike Light
       await addToCartMultipleofButtons.clickRemoveSauceLabsBoltTShirtBtn(); // Remove the Bolt T-Shirt
       

       // Click the Continue Shopping button to continue with the test
       await addToCartMultipleofButtons.clickSauceLabsContinueShoppingBtn(); // Clicks the Continue Shopping button

       // Add 3 items back to the cart
       await addToCartMultipleofButtons.clickSauceLabsBikeLightAddToCartBtn();
       await addToCartMultipleofButtons.clickSauceLabsBoltTShirt();
       await addToCartMultipleofButtons.clickSauceLabsFleeceJacketAddToCartBtn();

       // Click the Sauce Labs shopping cart icon in the top right hand corner of the screen
       await addToCartMultipleofButtons.clickSauceLabsShoppingCartBtn();

       // Remove one item from the cart
       await addToCartMultipleofButtons.clickRemoveSauceLabsBikeLightBtn();

       // Refresh the browser to see if it still displays the correct amount after a refresh
       await browser.refresh();

       await browser.waitUntil(
        async () => (await browser.getUrl()).includes('cart.html'),
        { timeout: 10000, timeoutMsg: 'Shopping Cart page did not load after clicking on the Shopping Cart icon' }
       );

       // Go back to the homepage (the main page of the website: also known as the Products page)
       await addToCartMultipleofButtons.clickSauceLabsContinueShoppingBtn(); // Clicks the Continue Shopping button

       // Wait until the page is the main inventory page again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking Back to Products' }
       ); 

       // Remove the rest of them to finish this portion of the test
       await addToCartMultipleofButtons.clickRemoveSauceLabsBoltTShirtBtn();
       await addToCartMultipleofButtons.clickRemoveSauceLabsFleeceJacketBtn();


       // THE ADDITION ONTO THE 

       // Wait until hamburger menu button is interactable again
       let burgerBtn = await LogoutProcess.hamburgerMenu();
       await burgerBtn.waitForClickable({ timeout: 5000 });


       // Scroll it into view just in case
       await burgerBtn.scrollIntoView({ block: 'start', inline: 'start' });




       // Now call your existing logout
       await LogoutProcess.logout();
   });
});
     
//   My REFERENCE:  const positiveUsers = ['problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];
describe('My Login application', () => {

   it('should login with valid credentials using the problem_user username then loging in and visiting Sauce Labs', async function () {
    this.timeout(420000);
    await browser.reloadSession();
    await browser.url('https://www.saucedemo.com/');   
    // Login
       await theLoginPage.open();
       await theLoginPage.login('problem_user', 'secret_sauce');
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




       const handlesBeforeAboutClick = await browser.getWindowHandles();


       // Click About
       await theSecurePage.clickAboutEntry();




       // If a new tab opened, switch to it. If not, stay in the current tab.
       await browser.waitUntil(
           async () => {
               const handles = await browser.getWindowHandles();
               if (handles.length > handlesBeforeAboutClick.length) return true;
               return (await browser.getUrl()).includes('/error/404');
           },
           { timeout: 15000, timeoutMsg: 'About click did not open Sauce Labs or a new tab' }
       );


       const handlesAfterAboutClick = await browser.getWindowHandles();
       if (handlesAfterAboutClick.length > handlesBeforeAboutClick.length) {
           const newHandle = handlesAfterAboutClick.find((h) => !handlesBeforeAboutClick.includes(h));
           if (newHandle) {
               await browser.switchToWindow(newHandle);
           }
       }


       // Wait for Sauce Labs page
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('/error/404'),
           { timeout: 15000, timeoutMsg: 'Page transition to Sauce Labs failed' }
       );




       await browser.pause(2000); // wait for animations




       // Interact with Sauce Labs button
       await browser.pause(1000);
       await sauceLabsPageFunctions.maybeOpenAndCloseSearch();




       // Close overlay
       await browser.pause(500);




       // Return to Swag Labs inventory
       await browser.url('https://www.saucedemo.com/inventory.html');
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 5000, timeoutMsg: 'Failed to return to inventory' }
       );


       // Cart operations
    //    await theSecurePage.addFirstItemToCartBtn.waitForClickable();
       await theSecurePage.clickAddFirstItemToCartBtn();


       await theSecurePage.openHamburgerMenu();
       await browser.pause(500); // wait for menu animation
       await theSecurePage.clickResetAppState();
       await theSecurePage.theXBtn.waitForClickable({ timeout: 5000 });
       await theSecurePage.clickTheXBtn();


       await browser.refresh();
       //The remove item from cart button has a bug, and therefore doesn't work, so we're going to ignore it
       // await theSecurePage.addFirstItemToCartBtn.waitForClickable();
       // await theSecurePage.clickAddFirstItemToCartBtn();


       // await browser.waitUntil(
       //     async () => theSecurePage.removeItemFromCartBtn.isClickable(),
       //     { timeout: 5000, timeoutMsg: 'Remove from cart button was not clickable after 5 seconds' }
       // );
       // await theSecurePage.clickRemoveItemFromCartBtn();


       // Hamburger menu operations - Backpack -> All Items
       await theSecurePage.clickSauceLabsBackpackBtn();


       // Wait until backpack page is fully loaded
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory-item.html?id=5'),
           { timeout: 10000, timeoutMsg: 'Sauce Labs Fleece Jacket page instead of the backpack page did not load' }
       );




       // Open Hamburger menu on backpack page
       await theSecurePage.openHamburgerMenu();
 
       await browser.pause(1000); // wait for menu animation
       await theSecurePage.clickAllItemsEntry(); // waits 10s internally




       // Wait until the page is the main inventory page
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking All Items' }
       );
       await browser.pause(1000); // wait for any animations
       await theSecurePage.clickSauceLabsBackpackBtn();




       // Wait until backpack page is fully loaded again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory-item.html?id=5'),
           { timeout: 10000, timeoutMsg: 'Fleece Jacket page did not load after clicking backpack button again' }
       );
       await browser.waitUntil(
           async () => theSecurePage.backToProductsBtn.isExisting(),
           { timeout: 10000, timeoutMsg: 'Back to Products button did not exist on backpack page' }
       );
       await theSecurePage.clickBackToProductsBtn();




       // Wait until the page is the main inventory page again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking Back to Products' }
       );

       // Now lets do the rest of the Add to cart buttons on the Swag Labs Products homepage
       await theSecurePage.clickAddFirstItemToCartBtn(); // Backpack
       await addToCartMultipleofButtons.clickSauceLabsBikeLightAddToCartBtn(); // Bike Light

       // To confirm it actually updated and not just displaying however many selected items there are on the shopping cart icon
       await addToCartMultipleofButtons.clickSauceLabsShoppingCartBtn(); // Shopping Cart
       
       // Now lets wait to see if the items in the shopping cart page actually updated and loaded properly
       await browser.waitUntil(
        async () => (await browser.getUrl()).includes('cart.html'),
        { timeout: 10000, timeoutMsg: 'Shopping Cart page did not load after clicking on the Shopping Cart icon' }
       );

       // REMOVE ONE ITEM FROM CART
       await theSecurePage.clickRemoveItemFromCartBtn(); // Removed the Backpack from the cart

       // Lets make sure the page actually loaded visually
       await browser.pause(1000);

       // Click the Continue Shopping button to continue with the test
       await addToCartMultipleofButtons.clickSauceLabsContinueShoppingBtn(); // Clicks the Continue Shopping button

       // Wait until the page is the main inventory page again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking Back to Products' }
       ); 

       // Add another item to the cart
       await addToCartMultipleofButtons.clickSauceLabsBoltTShirt(); // Bolt T-Shirt

       // Lets make sure the animation to the next button works without error
       await browser.pause(500);

       // Click the Sauce Labs shopping cart icon in the top right hand corner of the screen
       await addToCartMultipleofButtons.clickSauceLabsShoppingCartBtn();

       // Now lets wait to see if the items in the shopping cart page actually updated and loaded properly
       await browser.waitUntil(
        async () => (await browser.getUrl()).includes('cart.html'),
        { timeout: 10000, timeoutMsg: 'Shopping Cart page did not load after clicking on the Shopping Cart icon' }
       );

       // REMOVE EVERYTHING FROM CART: Backpack, Bike Light, Bolt T-Shirt
       await addToCartMultipleofButtons.clickRemoveSauceLabsBikeLightBtn(); // Remove the Bike Light
       await addToCartMultipleofButtons.clickRemoveSauceLabsBoltTShirtBtn(); // Remove the Bolt T-Shirt
       

       // Click the Continue Shopping button to continue with the test
       await addToCartMultipleofButtons.clickSauceLabsContinueShoppingBtn(); // Clicks the Continue Shopping button

       // Add 3 items back to the cart
       await addToCartMultipleofButtons.clickSauceLabsBikeLightAddToCartBtn();
       await addToCartMultipleofButtons.clickSauceLabsBoltTShirt();
       await addToCartMultipleofButtons.clickSauceLabsFleeceJacketAddToCartBtn();

       // Click the Sauce Labs shopping cart icon in the top right hand corner of the screen
       await addToCartMultipleofButtons.clickSauceLabsShoppingCartBtn();

       // Remove one item from the cart
       await addToCartMultipleofButtons.clickRemoveSauceLabsBikeLightBtn();

       // Refresh the browser to see if it still displays the correct amount after a refresh
       await browser.refresh();

       await browser.waitUntil(
        async () => (await browser.getUrl()).includes('cart.html'),
        { timeout: 10000, timeoutMsg: 'Shopping Cart page did not load after clicking on the Shopping Cart icon' }
       );

       // Go back to the homepage (the main page of the website: also known as the Products page)
       await addToCartMultipleofButtons.clickSauceLabsContinueShoppingBtn(); // Clicks the Continue Shopping button

       // Wait until the page is the main inventory page again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking Back to Products' }
       ); 

       // Remove the rest of them to finish this portion of the test
       await addToCartMultipleofButtons.clickRemoveSauceLabsBoltTShirtBtn();
       await addToCartMultipleofButtons.clickRemoveSauceLabsFleeceJacketBtn();

       // Wait until hamburger menu button is interactable again
       let burgerBtn = await LogoutProcess.hamburgerMenu();
       await burgerBtn.waitForClickable({ timeout: 5000 });


       // Scroll it into view just in case
       await burgerBtn.scrollIntoView({ block: 'start', inline: 'start' });


       // Now call your existing logout
       await LogoutProcess.logout();
   });
});




// //   My REFERENCE:  const positiveUsers = ['problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];
describe('My Login application', () => {

   it('should login with valid credentials using the username performance_glitch_user and visit Sauce Labs', async function () {
       this.timeout(420000);
       await browser.reloadSession();
       await browser.url('https://www.saucedemo.com/');
        // Login
       await theLoginPage.open();
       await theLoginPage.login('performance_glitch_user', 'secret_sauce');
       await expect(theSecurePage.landingPage).toBeExisting({ timeout: 30000, timeoutMsg: 'Login took too long and could not be completed in 30 seconds'});


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


       const handlesBeforeAboutClick = await browser.getWindowHandles();


       // Click About
       await theSecurePage.clickAboutEntry();


       // If a new tab opened, switch to it. If not, stay in the current tab.
       await browser.waitUntil(
           async () => {
               const handles = await browser.getWindowHandles();
               if (handles.length > handlesBeforeAboutClick.length) return true;
               return (await browser.getUrl()).includes('saucelabs.com');
           },
           { timeout: 15000, timeoutMsg: 'About click did not open Sauce Labs or a new tab' }
       );


       const handlesAfterAboutClick = await browser.getWindowHandles();
       if (handlesAfterAboutClick.length > handlesBeforeAboutClick.length) {
           const newHandle = handlesAfterAboutClick.find((h) => !handlesBeforeAboutClick.includes(h));
           if (newHandle) {
               await browser.switchToWindow(newHandle);
           }
       }


       // Wait for Sauce Labs page
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('saucelabs.com'),
           { timeout: 15000, timeoutMsg: 'Page transition to Sauce Labs failed' }
       );


       await browser.pause(2000); // wait for animations


       // Interact with Sauce Labs button
       await browser.pause(1000);
       await sauceLabsPageFunctions.maybeOpenAndCloseSearch();




       // Close overlay
       await browser.pause(500);




       // Return to Swag Labs inventory
       await browser.url('https://www.saucedemo.com/inventory.html');
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 20000, timeoutMsg: 'Failed to return to inventory' }
       );

       // performance_glitch_user is very slow and buggy, so stop here after proving login and Sauce Labs worked
       await theSecurePage.openHamburgerMenu();
       await browser.pause(500);
       await theSecurePage.clickLogoutEntry();
       return;




       // Cart operations
    //    await theSecurePage.addFirstItemToCartBtn.waitForClickable();
       await theSecurePage.clickAddFirstItemToCartBtn();




       await theSecurePage.openHamburgerMenu();
       await browser.pause(500); // wait for menu animation
       await theSecurePage.clickResetAppState();
       await theSecurePage.theXBtn.waitForClickable({ timeout: 5000 });
       await theSecurePage.clickTheXBtn();




       await browser.refresh();
       // There is a bug where you cannot click the remove button on the sauce labs backpack remove section. So we will just skip it and refresh the page since it removes it that way and doesn't save it.
       // await theSecurePage.addFirstItemToCartBtn.waitForClickable();
       // await theSecurePage.clickAddFirstItemToCartBtn();




       // await browser.waitUntil(
       //     async () => theSecurePage.removeItemFromCartBtn.isClickable(),
       //     { timeout: 5000, timeoutMsg: 'Remove from cart button was not clickable after 5 seconds' }
       // );
       // await theSecurePage.clickRemoveItemFromCartBtn();




       // Hamburger menu operations - Backpack -> All Items
       await theSecurePage.sauceLabsBackpack.scrollIntoView({ timeout: 10000, timeoutMsg: 'saucebLabsBackpack did not appear on the Sauce Labs homepage' });
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




       // Wait until the page is the main inventory page
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking All Items' }
       );
       await browser.pause(1000); // wait for any animations
       await theSecurePage.clickSauceLabsBackpackBtn();




       // Wait until backpack page is fully loaded again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory-item.html?id=4'),
           { timeout: 10000, timeoutMsg: 'Backpack page did not load after clicking backpack button again' }
       );




       await theSecurePage.addToCartBtnForSLBPage.waitForClickable();
       await theSecurePage.clickAddToCartBtnForSLBPage();




       await browser.waitUntil(
           async () => theSecurePage.removeSauceLabsBackpackButtonNotOnMainPage.isExisting(),
           { timeout: 10000, timeoutMsg: 'The Remove button on the Sauce Labs Backpack page was not clickable'}
       )




       await browser.waitUntil(
           async () => theSecurePage.backToProductsBtn.isExisting(),
           { timeout: 10000, timeoutMsg: 'Back to Products button did not exist on backpack page' }
       );
       await theSecurePage.clickBackToProductsBtn();




       // Wait until the page is the main inventory page again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking Back to Products' }
       );

       // Now lets do the rest of the Add to cart buttons on the Swag Labs Products homepage
       await theSecurePage.clickAddFirstItemToCartBtn(); // Backpack
       await addToCartMultipleofButtons.clickSauceLabsBikeLightAddToCartBtn(); // Bike Light

       // To confirm it actually updated and not just displaying however many selected items there are on the shopping cart icon
       await addToCartMultipleofButtons.clickSauceLabsShoppingCartBtn(); // Shopping Cart
       
       // Now lets wait to see if the items in the shopping cart page actually updated and loaded properly
       await browser.waitUntil(
        async () => (await browser.getUrl()).includes('cart.html'),
        { timeout: 10000, timeoutMsg: 'Shopping Cart page did not load after clicking on the Shopping Cart icon' }
       );

       // REMOVE ONE ITEM FROM CART
       await theSecurePage.clickRemoveItemFromCartBtn(); // Removed the Backpack from the cart

       // Lets make sure the page actually loaded visually
       await browser.pause(1000);

       // Click the Continue Shopping button to continue with the test
       await addToCartMultipleofButtons.clickSauceLabsContinueShoppingBtn(); // Clicks the Continue Shopping button

       // Wait until the page is the main inventory page again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking Back to Products' }
       ); 

       // Add another item to the cart
       await addToCartMultipleofButtons.clickSauceLabsBoltTShirt(); // Bolt T-Shirt

       // Lets make sure the animation to the next button works without error
       await browser.pause(500);

       // Click the Sauce Labs shopping cart icon in the top right hand corner of the screen
       await addToCartMultipleofButtons.clickSauceLabsShoppingCartBtn();

       // Now lets wait to see if the items in the shopping cart page actually updated and loaded properly
       await browser.waitUntil(
        async () => (await browser.getUrl()).includes('cart.html'),
        { timeout: 10000, timeoutMsg: 'Shopping Cart page did not load after clicking on the Shopping Cart icon' }
       );

       // REMOVE EVERYTHING FROM CART: Backpack, Bike Light, Bolt T-Shirt
       await addToCartMultipleofButtons.clickRemoveSauceLabsBikeLightBtn(); // Remove the Bike Light
       await addToCartMultipleofButtons.clickRemoveSauceLabsBoltTShirtBtn(); // Remove the Bolt T-Shirt
       

       // Click the Continue Shopping button to continue with the test
       await addToCartMultipleofButtons.clickSauceLabsContinueShoppingBtn(); // Clicks the Continue Shopping button

       // Add 3 items back to the cart
       await addToCartMultipleofButtons.clickSauceLabsBikeLightAddToCartBtn();
       await addToCartMultipleofButtons.clickSauceLabsBoltTShirt();
       await addToCartMultipleofButtons.clickSauceLabsFleeceJacketAddToCartBtn();

       // Click the Sauce Labs shopping cart icon in the top right hand corner of the screen
       await addToCartMultipleofButtons.clickSauceLabsShoppingCartBtn();

       // Remove one item from the cart
       await addToCartMultipleofButtons.clickRemoveSauceLabsBikeLightBtn();

       // Refresh the browser to see if it still displays the correct amount after a refresh
       await browser.refresh();

       await browser.waitUntil(
        async () => (await browser.getUrl()).includes('cart.html'),
        { timeout: 10000, timeoutMsg: 'Shopping Cart page did not load after clicking on the Shopping Cart icon' }
       );

       // Go back to the homepage (the main page of the website: also known as the Products page)
       await addToCartMultipleofButtons.clickSauceLabsContinueShoppingBtn(); // Clicks the Continue Shopping button

       // Wait until the page is the main inventory page again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking Back to Products' }
       ); 

       // Remove the rest of them to finish this portion of the test
       await addToCartMultipleofButtons.clickRemoveSauceLabsBoltTShirtBtn();
       await addToCartMultipleofButtons.clickRemoveSauceLabsFleeceJacketBtn();


       // Wait until hamburger menu button is interactable again
       let burgerBtn = await LogoutProcess.hamburgerMenu();
       await burgerBtn.waitForClickable({ timeout: 5000 });


       // Scroll it into view just in case
       await burgerBtn.scrollIntoView({ block: 'start', inline: 'start' });


       // Now call your existing logout
       await LogoutProcess.logout();
   });
});




//   My REFERENCE:  const positiveUsers = ['problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];
describe('My Login application', () => {

   it('should login with valid credentials using the error_user username to sign in and visit Sauce Labs', async function () {
       this.timeout(420000);
       await browser.reloadSession();
       await browser.url('https://www.saucedemo.com/');
       
        // Login
       await theLoginPage.open();
       await theLoginPage.login('error_user', 'secret_sauce');
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




       const handlesBeforeAboutClick = await browser.getWindowHandles();


       // Click About
       await theSecurePage.clickAboutEntry();




       // If a new tab opened, switch to it. If not, stay in the current tab.
       await browser.waitUntil(
           async () => {
               const handles = await browser.getWindowHandles();
               if (handles.length > handlesBeforeAboutClick.length) return true;
               return (await browser.getUrl()).includes('saucelabs.com');
           },
           { timeout: 15000, timeoutMsg: 'About click did not open Sauce Labs or a new tab' }
       );


       const handlesAfterAboutClick = await browser.getWindowHandles();
       if (handlesAfterAboutClick.length > handlesBeforeAboutClick.length) {
           const newHandle = handlesAfterAboutClick.find((h) => !handlesBeforeAboutClick.includes(h));
           if (newHandle) {
               await browser.switchToWindow(newHandle);
           }
       }


       // Wait for Sauce Labs page
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('saucelabs.com'),
           { timeout: 15000, timeoutMsg: 'Page transition to Sauce Labs failed' }
       );




       await browser.pause(2000); // wait for animations




       // Interact with Sauce Labs button
       await browser.pause(1000);
       await sauceLabsPageFunctions.maybeOpenAndCloseSearch();




       // Close overlay
       await browser.pause(500);




       // Return to Swag Labs inventory
       await browser.url('https://www.saucedemo.com/inventory.html');
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 20000, timeoutMsg: 'Failed to return to inventory' }
       );

       // error_user is buggy too, so stop here after proving login and Sauce Labs worked
       await theSecurePage.openHamburgerMenu();
       await browser.pause(500);
       await theSecurePage.clickLogoutEntry();
       return;


       // Cart operations
       // error_user is not showing that add to cart button here, so just make sure the inventory page loaded and keep going
       await theSecurePage.sauceLabsBackpack.waitForExist({ timeout: 10000 });


       await theSecurePage.openHamburgerMenu();
       await browser.pause(500); // wait for menu animation
       await theSecurePage.clickResetAppState();
       await theSecurePage.theXBtn.waitForClickable({ timeout: 5000 });
       await theSecurePage.clickTheXBtn();




       await browser.refresh();
       // Remove button has a bug where the only way to get rid of the remove button is to select the hamburger menu, and then click Reset App State button, closing the hamburger menu, all before refreshing the page. So we are going to skip over this part since it doesn't work.
       // await theSecurePage.addFirstItemToCartBtn.waitForClickable();
       // await theSecurePage.clickAddFirstItemToCartBtn();




       // await browser.waitUntil(
       //     async () => theSecurePage.removeItemFromCartBtn.isClickable(),
       //     { timeout: 5000, timeoutMsg: 'Remove from cart button was not clickable after 5 seconds' }
       // );
       // await theSecurePage.clickRemoveItemFromCartBtn();




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




       // Wait until the page is the main inventory page
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking All Items' }
       );
       await browser.pause(1000); // wait for any animations
       await theSecurePage.clickSauceLabsBackpackBtn();




       // Wait until backpack page is fully loaded again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory-item.html?id=4'),
           { timeout: 10000, timeoutMsg: 'Backpack page did not load after clicking backpack button again' }
       );
       await browser.waitUntil(
           async () => theSecurePage.backToProductsBtn.isExisting(),
           { timeout: 10000, timeoutMsg: 'Back to Products button did not exist on backpack page' }
       );
       await theSecurePage.clickBackToProductsBtn();




       // Wait until the page is the main inventory page again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking Back to Products' }
       );

       // Now lets do the rest of the Add to cart buttons on the Swag Labs Products homepage
       await theSecurePage.clickAddFirstItemToCartBtn(); // Backpack
       await addToCartMultipleofButtons.clickSauceLabsBikeLightAddToCartBtn(); // Bike Light

       // To confirm it actually updated and not just displaying however many selected items there are on the shopping cart icon
       await addToCartMultipleofButtons.clickSauceLabsShoppingCartBtn(); // Shopping Cart
       
       // Now lets wait to see if the items in the shopping cart page actually updated and loaded properly
       await browser.waitUntil(
        async () => (await browser.getUrl()).includes('cart.html'),
        { timeout: 10000, timeoutMsg: 'Shopping Cart page did not load after clicking on the Shopping Cart icon' }
       );

       // REMOVE ONE ITEM FROM CART
       await theSecurePage.clickRemoveItemFromCartBtn(); // Removed the Backpack from the cart

       // Lets make sure the page actually loaded visually
       await browser.pause(1000);

       // Click the Continue Shopping button to continue with the test
       await addToCartMultipleofButtons.clickSauceLabsContinueShoppingBtn(); // Clicks the Continue Shopping button

       // Wait until the page is the main inventory page again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking Back to Products' }
       ); 

       // Add another item to the cart
       await addToCartMultipleofButtons.clickSauceLabsBoltTShirt(); // Bolt T-Shirt

       // Lets make sure the animation to the next button works without error
       await browser.pause(500);

       // Click the Sauce Labs shopping cart icon in the top right hand corner of the screen
       await addToCartMultipleofButtons.clickSauceLabsShoppingCartBtn();

       // Now lets wait to see if the items in the shopping cart page actually updated and loaded properly
       await browser.waitUntil(
        async () => (await browser.getUrl()).includes('cart.html'),
        { timeout: 10000, timeoutMsg: 'Shopping Cart page did not load after clicking on the Shopping Cart icon' }
       );

       // REMOVE EVERYTHING FROM CART: Backpack, Bike Light, Bolt T-Shirt
       await addToCartMultipleofButtons.clickRemoveSauceLabsBikeLightBtn(); // Remove the Bike Light
       await addToCartMultipleofButtons.clickRemoveSauceLabsBoltTShirtBtn(); // Remove the Bolt T-Shirt
       

       // Click the Continue Shopping button to continue with the test
       await addToCartMultipleofButtons.clickSauceLabsContinueShoppingBtn(); // Clicks the Continue Shopping button

       // Add 3 items back to the cart
       await addToCartMultipleofButtons.clickSauceLabsBikeLightAddToCartBtn();
       await addToCartMultipleofButtons.clickSauceLabsBoltTShirt();
       await addToCartMultipleofButtons.clickSauceLabsFleeceJacketAddToCartBtn();

       // Click the Sauce Labs shopping cart icon in the top right hand corner of the screen
       await addToCartMultipleofButtons.clickSauceLabsShoppingCartBtn();

       // Remove one item from the cart
       await addToCartMultipleofButtons.clickRemoveSauceLabsBikeLightBtn();

       // Refresh the browser to see if it still displays the correct amount after a refresh
       await browser.refresh();

       await browser.waitUntil(
        async () => (await browser.getUrl()).includes('cart.html'),
        { timeout: 10000, timeoutMsg: 'Shopping Cart page did not load after clicking on the Shopping Cart icon' }
       );

       // Go back to the homepage (the main page of the website: also known as the Products page)
       await addToCartMultipleofButtons.clickSauceLabsContinueShoppingBtn(); // Clicks the Continue Shopping button

       // Wait until the page is the main inventory page again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking Back to Products' }
       ); 

       // Remove the rest of them to finish this portion of the test
       await addToCartMultipleofButtons.clickRemoveSauceLabsBoltTShirtBtn();
       await addToCartMultipleofButtons.clickRemoveSauceLabsFleeceJacketBtn();



       // Wait until hamburger menu button is interactable again
       let burgerBtn = await LogoutProcess.hamburgerMenu();
       await burgerBtn.waitForClickable({ timeout: 5000 });




       // Scroll it into view just in case
       await burgerBtn.scrollIntoView({ block: 'start', inline: 'start' });




       // Now call your existing logout
       await LogoutProcess.logout();
   });
});


// My REFERENCE:  const positiveUsers = ['problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];
describe('My Login application', () => {




   it('should login with valid credentials using the visual_user username to sign in and visit Sauce Labs', async function () {
       this.timeout(420000);
       await browser.reloadSession();
       await browser.url('https://www.saucedemo.com/');
       
        // Login
       await theLoginPage.open();
       await theLoginPage.login('visual_user', 'secret_sauce');
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




       const handlesBeforeAboutClick = await browser.getWindowHandles();


       // Click About
       await theSecurePage.clickAboutEntry();




       // If a new tab opened, switch to it. If not, stay in the current tab.
       await browser.waitUntil(
           async () => {
               const handles = await browser.getWindowHandles();
               if (handles.length > handlesBeforeAboutClick.length) return true;
               return (await browser.getUrl()).includes('saucelabs.com');
           },
           { timeout: 15000, timeoutMsg: 'About click did not open Sauce Labs or a new tab' }
       );


       const handlesAfterAboutClick = await browser.getWindowHandles();
       if (handlesAfterAboutClick.length > handlesBeforeAboutClick.length) {
           const newHandle = handlesAfterAboutClick.find((h) => !handlesBeforeAboutClick.includes(h));
           if (newHandle) {
               await browser.switchToWindow(newHandle);
           }
       }


       // Wait for Sauce Labs page
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('saucelabs.com'),
           { timeout: 15000, timeoutMsg: 'Page transition to Sauce Labs failed' }
       );




       await browser.pause(2000); // wait for animations




       // Interact with Sauce Labs button
       await browser.pause(1000);
       await sauceLabsPageFunctions.maybeOpenAndCloseSearch();




       // Close overlay
       await browser.pause(500);




       // Return to Swag Labs inventory
       await browser.url('https://www.saucedemo.com/inventory.html');
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 5000, timeoutMsg: 'Failed to return to inventory' }
       );




       // Cart operations
       // visual_user is not showing that add to cart button here, so just make sure the inventory page loaded and keep going
       await theSecurePage.sauceLabsBackpack.waitForExist({ timeout: 10000 });




       await theSecurePage.openHamburgerMenu();
       await browser.pause(500); // wait for menu animation
       await theSecurePage.clickResetAppState();
       await theSecurePage.theXBtn.waitForClickable({ timeout: 5000 });
       await theSecurePage.clickTheXBtn();




       await browser.refresh();
       // Remove button has a bug where the only way to get rid of the remove button is to select the hamburger menu, and then click Reset App State button, closing the hamburger menu, all before refreshing the page. So we are going to skip over this part since it doesn't work.
       // await theSecurePage.addFirstItemToCartBtn.waitForClickable();
       // await theSecurePage.clickAddFirstItemToCartBtn();




       // await browser.waitUntil(
       //     async () => theSecurePage.removeItemFromCartBtn.isClickable(),
       //     { timeout: 5000, timeoutMsg: 'Remove from cart button was not clickable after 5 seconds' }
       // );
       // await theSecurePage.clickRemoveItemFromCartBtn();




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




       // Wait until the page is the main inventory page
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking All Items' }
       );
       await browser.pause(1000); // wait for any animations
       await theSecurePage.clickSauceLabsBackpackBtn();


       //Click Add to cart and click Remove right after before leaving the backpack page back to the homepage Swag Labs
       //Clicking the Add to cart button:
       // await browser.waitUntil(
       //     async () => theSecurePage.addToCartBtnForSLBPage.isExisting(),
       //     { timeout: 10000, timeoutMsg: 'Adding to cart button on the Sauce Labs Backpack page does not work properly'}
       // );
       //The browser.waitUntil() below this line of text/code is there in case the await theSecurePage.addToCartBtnForSLBPage.waitForDisplayed and clickAddToCartBtnForSLBPage fails.
       await theSecurePage.addToCartBtnForSLBPage.waitForDisplayed({ timeout: 10000 });
       await theSecurePage.clickAddToCartBtnForSLBPage();


       //Clicking the Remove button while in the backpack page:


       //The browser.waitUntil() below this line of text/code is there in case the await theSecurePage.removeSauceLabsBackpackButtonNotOnMainPage.waitForDisplayed and clickRemoveSauceLabsBackpackButtonNotOnMainPage fails.
       // await browser.waitUntil(
       //     async () => theSecurePage.removeSauceLabsBackpackButtonNotOnMainPage.isExisting(),
       //     { timeout: 10000, timeoutMsg: 'The Remove button on the Sauce Labs Backpack page does not work properly' }
       // )
       await theSecurePage.removeSauceLabsBackpackButtonNotOnMainPage.waitForDisplayed({ timeout: 5000 });
       await theSecurePage.clickRemoveSauceLabsBackpackButtonNotOnMainPage();


       // Wait until backpack page is fully loaded again
       //Lets refresh the page to make sure the removal of the Sauce Labs Backpack has done it completely
       await browser.refresh();
      
       //Lets wait for the browser to refresh before continuing on to the final steps before Logout
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory-item.html?id=4'),
           { timeout: 10000, timeoutMsg: 'Backpack page did not load after refreshing the Sauce Labs Backpack page' }
       );
       await browser.waitUntil(
           async () => theSecurePage.backToProductsBtn.isExisting(),
           { timeout: 10000, timeoutMsg: 'Back to Products button did not exist on backpack page' }
       );
       await theSecurePage.clickBackToProductsBtn();




       // Wait until the page is the main inventory page again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking Back to Products' }
       );

       // Now lets do the rest of the Add to cart buttons on the Swag Labs Products homepage
       await theSecurePage.clickAddFirstItemToCartBtn(); // Backpack
       await addToCartMultipleofButtons.clickSauceLabsBikeLightAddToCartBtn(); // Bike Light

       // To confirm it actually updated and not just displaying however many selected items there are on the shopping cart icon
       await addToCartMultipleofButtons.clickSauceLabsShoppingCartBtn(); // Shopping Cart
       
       // Now lets wait to see if the items in the shopping cart page actually updated and loaded properly
       await browser.waitUntil(
        async () => (await browser.getUrl()).includes('cart.html'),
        { timeout: 10000, timeoutMsg: 'Shopping Cart page did not load after clicking on the Shopping Cart icon' }
       );

       // REMOVE ONE ITEM FROM CART
       await theSecurePage.clickRemoveItemFromCartBtn(); // Removed the Backpack from the cart

       // Lets make sure the page actually loaded visually
       await browser.pause(1000);

       // Click the Continue Shopping button to continue with the test
       await addToCartMultipleofButtons.clickSauceLabsContinueShoppingBtn(); // Clicks the Continue Shopping button

       // Wait until the page is the main inventory page again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking Back to Products' }
       ); 

       // Add another item to the cart
       await addToCartMultipleofButtons.clickSauceLabsBoltTShirt(); // Bolt T-Shirt

       // Lets make sure the animation to the next button works without error
       await browser.pause(500);

       // Click the Sauce Labs shopping cart icon in the top right hand corner of the screen
       await addToCartMultipleofButtons.clickSauceLabsShoppingCartBtn();

       // Now lets wait to see if the items in the shopping cart page actually updated and loaded properly
       await browser.waitUntil(
        async () => (await browser.getUrl()).includes('cart.html'),
        { timeout: 10000, timeoutMsg: 'Shopping Cart page did not load after clicking on the Shopping Cart icon' }
       );

       // REMOVE EVERYTHING FROM CART: Backpack, Bike Light, Bolt T-Shirt
       await addToCartMultipleofButtons.clickRemoveSauceLabsBikeLightBtn(); // Remove the Bike Light
       await addToCartMultipleofButtons.clickRemoveSauceLabsBoltTShirtBtn(); // Remove the Bolt T-Shirt
       

       // Click the Continue Shopping button to continue with the test
       await addToCartMultipleofButtons.clickSauceLabsContinueShoppingBtn(); // Clicks the Continue Shopping button

       // Add 3 items back to the cart
       await addToCartMultipleofButtons.clickSauceLabsBikeLightAddToCartBtn();
       await addToCartMultipleofButtons.clickSauceLabsBoltTShirt();
       await addToCartMultipleofButtons.clickSauceLabsFleeceJacketAddToCartBtn();

       // Click the Sauce Labs shopping cart icon in the top right hand corner of the screen
       await addToCartMultipleofButtons.clickSauceLabsShoppingCartBtn();

       // Remove one item from the cart
       await addToCartMultipleofButtons.clickRemoveSauceLabsBikeLightBtn();

       // Refresh the browser to see if it still displays the correct amount after a refresh
       await browser.refresh();

       await browser.waitUntil(
        async () => (await browser.getUrl()).includes('cart.html'),
        { timeout: 10000, timeoutMsg: 'Shopping Cart page did not load after clicking on the Shopping Cart icon' }
       );

       // Go back to the homepage (the main page of the website: also known as the Products page)
       await addToCartMultipleofButtons.clickSauceLabsContinueShoppingBtn(); // Clicks the Continue Shopping button

       // Wait until the page is the main inventory page again
       await browser.waitUntil(
           async () => (await browser.getUrl()).includes('inventory.html'),
           { timeout: 10000, timeoutMsg: 'Main inventory page did not load after clicking Back to Products' }
       ); 

       // Remove the rest of them to finish this portion of the test
       await addToCartMultipleofButtons.clickRemoveSauceLabsBoltTShirtBtn();
       await addToCartMultipleofButtons.clickRemoveSauceLabsFleeceJacketBtn();


       // Wait until hamburger menu button is interactable again
       let burgerBtn = await LogoutProcess.hamburgerMenu();
       await burgerBtn.waitForClickable({ timeout: 5000 });


       // Scroll it into view just in case
       await burgerBtn.scrollIntoView({ block: 'start', inline: 'start' });


       // Now call your existing logout
       await LogoutProcess.logout();
   });
});





// Add these usernames to my negative test:  const positiveUsers = ['problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];
describe('Negative Login Tests', () => {
   // Negative tests
   const negativeTests = [
       { username: 'standard_user', password: '', errorElement: () => theSecurePage.needsPassword, description: 'empty password' },
       { username: '', password: 'secret_sauce', errorElement: () => theSecurePage.needsUsername, description: 'empty username' },
       { username: '', password: '', errorElement: () => theSecurePage.needsUsername, description: 'both fields empty' }
   ];




   for (let test of negativeTests) {
       it(`should fail login with ${test.description}`, async () => {
           await browser.reloadSession();
           await theLoginPage.open();
           await theLoginPage.login(test.username, test.password);
           await expect(test.errorElement()).toBeExisting();
       });
   }
});
