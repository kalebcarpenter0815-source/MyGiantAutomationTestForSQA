import { $ } from '@wdio/globals'
import myPage from './pagecopy1PositiveandNegativeTest.js';

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
}

export default new theSecurePage();
