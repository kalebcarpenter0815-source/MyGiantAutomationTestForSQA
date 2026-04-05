import { $ } from '@wdio/globals'
import signingInPage from './pagecopy1PositiveandNegativeTest';

class LogoutProcess extends signingInPage {
    get hamburgerMenu () {
        return $(".bm-burger-button")
    }
    get logoutBtn(){
        return $("#logout_sidebar_link")
    }
    async logout(){
        await this.hamburgerMenu.click();
        await this.logoutBtn.waitForClickable({ timeout: 3000 });
        await this.logoutBtn.click();
    }
}

export default new LogoutProcess();