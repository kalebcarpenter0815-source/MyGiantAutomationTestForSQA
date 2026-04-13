import { $, browser } from '@wdio/globals'
import myPage from './thesigningInPage.js';
import sauceLabsPageFunctions from './sauceLabsPage.js';

class theSecurePage extends myPage {
get landingPage () {
        return $(".shopping_cart_link");
    }

get needsUsername () {
        return $('//*[contains(text(), "Epic sadface: Username is required")]');
    }

get LockedOutUser () {
        return $('//*[contains(text(), "Epic sadface: Sorry, this user has been locked out.")]');
    }

get needsPassword () {
        return $('//*[contains(text(), "Epic sadface: Password is required")]');
    }

get burgerBtn () {
        return $('#react-burger-menu-btn');
    }

async openHamburgerMenu () {
    await this.burgerBtn.waitForExist({ timeout: 15000 });
    await this.burgerBtn.waitForDisplayed({ timeout: 15000 });
    await this.burgerBtn.scrollIntoView();
    try {
        await this.burgerBtn.waitForClickable({ timeout: 15000 });
        await this.burgerBtn.click();
    } catch (error) {
        await browser.execute((button) => button.click(), await this.burgerBtn);
    }
    await this.waitForMenuToOpen();
}

async waitForMenuToOpen () {
    await this.aboutEntry.waitForExist({ timeout: 20000 });
    await this.aboutEntry.waitForDisplayed({ timeout: 20000 });
    await this.aboutEntry.waitForClickable({ timeout: 20000 });
}

async clickSidebarEntry (entry) {
    await entry.waitForExist({ timeout: 10000 });
    try {
        await entry.waitForDisplayed({ timeout: 10000 });
        await entry.scrollIntoView();
        await entry.waitForClickable({ timeout: 10000 });
        await entry.click();
    } catch (error) {
        await browser.execute((element) => element.click(), await entry);
    }
}

get allItemsEntry () {
        return $('#inventory_sidebar_link');
    }

async clickAllItemsEntry () {
        await this.clickSidebarEntry(this.allItemsEntry);
    }

get aboutEntry () {
        return $('#about_sidebar_link');
    } 

async clickAboutEntry () {
        await this.clickSidebarEntry(this.aboutEntry);
    }

async openAboutAndComeBack (expectedUrlPiece = 'saucelabs.com', returnTimeout = 10000) {
        await this.openHamburgerMenu();

        await browser.waitUntil(
            async () => this.aboutEntry.isExisting(),
            { timeout: 5000, timeoutMsg: 'About link did not appear after 5 seconds' }
        );
        await browser.waitUntil(
            async () => this.aboutEntry.isDisplayed(),
            { timeout: 5000, timeoutMsg: 'About link was not showing after 5 seconds' }
        );

        await browser.execute(() => {
            const link = document.querySelector('#about_sidebar_link');
            if (link) link.setAttribute('target', '_self');
        });

        const handlesBeforeAboutClick = await browser.getWindowHandles();

        await this.clickAboutEntry();

        await browser.waitUntil(
            async () => {
                const handles = await browser.getWindowHandles();
                if (handles.length > handlesBeforeAboutClick.length) return true;
                return (await browser.getUrl()).includes(expectedUrlPiece);
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

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(expectedUrlPiece),
            { timeout: 15000, timeoutMsg: 'Page transition to Sauce Labs failed' }
        );

        await sauceLabsPageFunctions.maybeOpenAndCloseSearch();

        await browser.url('https://www.saucedemo.com/inventory.html');
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory.html'),
            { timeout: returnTimeout, timeoutMsg: 'Failed to return to inventory' }
        );
    }

async waitForInventoryPageToLoad (timeout = 10000, timeoutMsg = 'Inventory page did not load') {
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory.html'),
            { timeout, timeoutMsg }
        );
    }

get addFirstItemToCartBtn () {
        return $('[name="add-to-cart-sauce-labs-backpack"]');
    }
    
async clickAddFirstItemToCartBtn () {
        const firstBackpackButtonIsThere = await this.addFirstItemToCartBtn.isExisting();

        if (!firstBackpackButtonIsThere) {
            return;
        }

        await this.addFirstItemToCartBtn.waitForExist({ timeout: 15000 });
        await this.addFirstItemToCartBtn.waitForDisplayed({ timeout: 15000 });
        await this.addFirstItemToCartBtn.scrollIntoView();
        try {
            await this.addFirstItemToCartBtn.waitForClickable({ timeout: 15000 });
            await this.addFirstItemToCartBtn.click();
        } catch (error) {
            await browser.execute((button) => button.click(), await this.addFirstItemToCartBtn);
        }
    }

get addToCartBtnForSLBPage () {
        return $('button[data-test="add-to-cart"]')
    }
async clickAddToCartBtnForSLBPage () {
        await this.addToCartBtnForSLBPage.waitForClickable({ timeout: 10000 });
        await this.addToCartBtnForSLBPage.click();
}

get removeSauceLabsBackpackButtonNotOnMainPage () {
    return $('button#remove')
}
async clickRemoveSauceLabsBackpackButtonNotOnMainPage () {
    await this.removeSauceLabsBackpackButtonNotOnMainPage.waitForClickable({ timeout: 10000 });
    await this.removeSauceLabsBackpackButtonNotOnMainPage.click();
}

get resetAppState () {
        return $("#reset_sidebar_link");
    }

async clickResetAppState () {
        await this.clickSidebarEntry(this.resetAppState);
    }

async resetTheAppStateAndCloseTheMenu () {
        await this.openHamburgerMenu();
        await this.clickResetAppState();
        await this.theXBtn.waitForExist({ timeout: 5000 });
        await this.clickTheXBtn();
    }

get removeItemFromCartBtn () {
        return $('#remove-sauce-labs-backpack');
    }
    
async clickRemoveItemFromCartBtn () {
        await this.removeItemFromCartBtn.waitForClickable({ timeout: 10000 });
        await this.removeItemFromCartBtn.click();
    }

get theXBtn () {
        return $('#react-burger-cross-btn');
    }

async clickTheXBtn () {
        await this.theXBtn.waitForExist({ timeout: 10000 });
        try {
            await this.theXBtn.waitForDisplayed({ timeout: 10000 });
            await this.theXBtn.waitForClickable({ timeout: 10000 });
            await this.theXBtn.click();
        } catch (error) {
            await browser.execute((button) => button.click(), await this.theXBtn);
        }
    }

get logoutEntry () {
        return $('#logout_sidebar_link');
    }
async clickLogoutEntry () {
        await this.clickSidebarEntry(this.logoutEntry);
    }
get sauceLabsBackpack () {
        return $('//*[contains(text(), "Sauce Labs Backpack")]');
     }
async clickSauceLabsBackpackBtn () {
        await this.sauceLabsBackpack.scrollIntoView();
        await this.sauceLabsBackpack.waitForClickable({ timeout: 10000 });
        await this.sauceLabsBackpack.click();
     }

async goToBackpackAndOpenAllItems (backpackUrlPart = 'inventory-item.html?id=4', timeoutMessage = 'Backpack page did not load') {
        await this.clickSauceLabsBackpackBtn();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(backpackUrlPart),
            { timeout: 10000, timeoutMsg: timeoutMessage }
        );

        await this.openHamburgerMenu();
        await this.clickAllItemsEntry();

        await this.waitForInventoryPageToLoad(
            10000,
            'Main inventory page did not load after clicking All Items'
        );

        await this.clickSauceLabsBackpackBtn();
    }

get backToProductsBtn () {
        // return $('//button[@id="back-to-products"]'); Do this in case the DOM structure is different on the backpack page, so we need to use a different selector
        return $('#back-to-products')
        }
     async clickBackToProductsBtn () {
        await this.backToProductsBtn.scrollIntoView();
        await this.backToProductsBtn.waitForClickable({ timeout: 10000 });
        await this.backToProductsBtn.click();
     }

    async finishWithBackToProducts (backpackUrlPart = 'inventory-item.html?id=4', timeoutMessage = 'Backpack page did not load after clicking backpack button again') {
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(backpackUrlPart),
            { timeout: 10000, timeoutMsg: timeoutMessage }
        );

        await browser.waitUntil(
            async () => this.backToProductsBtn.isExisting(),
            { timeout: 10000, timeoutMsg: 'Back to Products button did not exist on backpack page' }
        );

        await this.clickBackToProductsBtn();
        await this.waitForInventoryPageToLoad(
            10000,
            'Main inventory page did not load after clicking Back to Products'
        );
    }

    // Add this to your Page Object file
    async clickWhenReady(selector) {
    await selector.waitForExist({ timeout: 10000 });
    await selector.waitForClickable({ timeout: 10000 });
    await selector.click();
    }
}

export default new theSecurePage();
