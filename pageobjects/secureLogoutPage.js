import signingInPage from './thesigningInPage.js';
import { browser } from '@wdio/globals';

class LogoutProcess extends signingInPage {
    get hamburgerMenu () {
        return () => $("#react-burger-menu-btn");
    }
    get logoutBtn(){
        return () => $("#logout_sidebar_link");
    }
    async logout(){
        let burgerBtn = await this.hamburgerMenu();
        await burgerBtn.waitForExist({ timeout: 10000 });
        await burgerBtn.waitForDisplayed({ timeout: 10000 });
        try {
            await burgerBtn.waitForClickable({ timeout: 10000 });
            await burgerBtn.click();
        } catch (error) {
            await browser.execute((button) => button.click(), burgerBtn);
        }
        await (await this.logoutBtn()).waitForExist({ timeout: 10000 });
        await browser.execute(() => {
            const logoutLink = document.getElementById('logout_sidebar_link');
            if (logoutLink) logoutLink.click();
        });
    }
}

export default new LogoutProcess();
