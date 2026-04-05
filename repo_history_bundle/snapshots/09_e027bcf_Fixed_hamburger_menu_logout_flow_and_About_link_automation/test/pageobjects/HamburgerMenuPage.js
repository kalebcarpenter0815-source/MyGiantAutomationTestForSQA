import { $ } from '@wdio/globals'
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
    // wait until the button exists in the DOM
    await this.burgerBtn.waitForExist({ timeout: 15000 });

    // wait until it is actually clickable
    await this.burgerBtn.waitForClickable({ timeout: 15000 });

    // scroll it into view in case something covers it
    await this.burgerBtn.scrollIntoView();

    // short pause for page animation
    await browser.pause(300);

    // finally click
    await this.burgerBtn.click();
}

get allItemsEntry () {
        return $('//a[@id="inventory_sidebar_link"]');
    }

async clickAllItemsEntry () {
        await this.openHamburgerMenu();
        await this.allItemsEntry.waitForClickable({ timeout: 5000 });
        await this.allItemsEntry.click();
    }

get aboutEntry () {
        return $('//a[@id="about_sidebar_link"]');
    } 

async clickAboutEntry () {
        await this.aboutEntry.click();
    }

get addFirstItemToCartBtn () {
        return $('//button[@id="add-to-cart-sauce-labs-backpack"]');
    }
    
async clickAddFirstItemToCartBtn () {
        await this.addFirstItemToCartBtn.click();
    }

get resetAppState () {
        return $("#reset_sidebar_link");
    }

async clickResetAppState () {
        await this.resetAppState.click();
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
        await this.theXBtn.click();
    }

get logoutEntry () {
        return $('//a[@id="logout_sidebar_link"]');
    }
async clickLogoutEntry () {
        await this.logoutEntry.click();
    }
get sauceLabsBackpack () {
        return $('//*[contains(text(), "Sauce Labs Backpack")]');
     }
async clickSauceLabsBackpackBtn () {
        await this.sauceLabsBackpack.scrollIntoView();
        await this.sauceLabsBackpack.waitForClickable({ timeout: 10000 });
        await this.sauceLabsBackpack.click();
     }
}

export default new theSecurePage();
