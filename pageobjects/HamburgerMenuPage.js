import { $, browser } from '@wdio/globals'
import myPage from './thesigningInPage.js';

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
    await browser.pause(300);
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
    await browser.pause(200);
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

get addFirstItemToCartBtn () {
        return $('[name="add-to-cart-sauce-labs-backpack"]');
    }
    
async clickAddFirstItemToCartBtn () {
        const firstBackpackButtonIsThere = await this.addFirstItemToCartBtn.isExisting();

        if (!firstBackpackButtonIsThere) {
            await browser.pause(500);
            return;
        }

        await this.addFirstItemToCartBtn.waitForExist({ timeout: 15000 });
        await this.addFirstItemToCartBtn.waitForDisplayed({ timeout: 15000 });
        await this.addFirstItemToCartBtn.scrollIntoView();
        await browser.pause(400);
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
get backToProductsBtn () {
        // return $('//button[@id="back-to-products"]'); Do this in case the DOM structure is different on the backpack page, so we need to use a different selector
        return $('#back-to-products')
        }
     async clickBackToProductsBtn () {
        await this.backToProductsBtn.scrollIntoView();
        await this.backToProductsBtn.waitForClickable({ timeout: 10000 });
        await this.backToProductsBtn.click();
     }
    // Add this to your Page Object file
    async clickWhenReady(selector) {
    await selector.waitForExist({ timeout: 10000 });
    await selector.waitForClickable({ timeout: 10000 });
    await selector.click();
    }
}

export default new theSecurePage();
