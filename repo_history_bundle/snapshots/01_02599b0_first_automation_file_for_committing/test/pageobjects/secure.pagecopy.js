import { $ } from '@wdio/globals'
import myPage from './pagecopy.js';

class theSecurePage extends myPage {
    get landingPage () {
        return $(".shopping_cart_link");
    }
}

export default new theSecurePage();
