import { $ } from '@wdio/globals'
import myPage from './thesigningInPage.js';

class theSecurePage extends myPage {
    get landingPage () {
        return () => $(".shopping_cart_link");
    }

    get needsUsername () {
        return () => $('//*[contains(text(), "Epic sadface: Username is required")]');
    }

    get LockedOutUser () {
        return () => $('//*[contains(text(), "Epic sadface: Sorry, this user has been locked out.")]');
    }

    get needsPassword () {
        return () => $('//*[contains(text(), "Epic sadface: Password is required")]');
    }

    get burgerBtn () {
        return () => $('#react-burger-menu-btn');
    }

    async openHamburgerMenu () {
        await (this.burgerBtn()).click();
    }

    get allItemsLink () {
        return () => $('//a[@id="inventory_sidebar_link"]');
    }

    async clickAllItemsLink () {
        await (this.allItemsLink()).click();
    }

    get aboutLink () {
        return () => $('//a[@id="about_sidebar_link"]');
    } 

    async clickAboutLink () {
        await (this.aboutLink()).click();
    }

    get addFirstItemToCartBtn () {
        return () => $('//button[@id="add-to-cart-sauce-labs-backpack"]');
    }
    
    async clickAddFirstItemToCartBtn () {
        await (this.addFirstItemToCartBtn()).click();
    }

    get resetAppState () {
        return () => $("//nav[contains(@class, 'bm-item-list')]//a[@id='about_sidebar_link']");
    }

    async clickResetAppState () {
        await (this.resetAppState()).click();
    }

    get removeItemFromCartBtn () {
        return () => $('#remove-sauce-labs-backpack');
    }
    
    async clickRemoveItemFromCartBtn () {
        await (this.removeItemFromCartBtn()).click();
    }

    get theXBtn () {
        return () => $('#react-burger-cross-btn');
    }

    async clickTheXBtn () {
        await (this.theXBtn()).click();
    }
// -------------------
    get logoutLink () {
        return () => $('//a[@id="logout_sidebar_link"]');
    }
     async clickLogoutLink () {
        await (this.logoutLink()).click();
    }
}
export default new theSecurePage();
