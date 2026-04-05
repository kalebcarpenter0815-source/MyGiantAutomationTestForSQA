import signingInPage from './thesigningInPage.js';
import { browser } from '@wdio/globals';

class LogoutProcess extends signingInPage {
    get hamburgerMenu () {
        return () => $(".bm-burger-button");
    }
    get logoutBtn(){
        return () => $("#logout_sidebar_link");
    }
    async logout(){
        await (await this.hamburgerMenu()).click();
        await browser.execute(() => {
            document.getElementById('logout_sidebar_link').click();
        });
    }
}

export default new LogoutProcess();
