import { $ } from '@wdio/globals'
import myPage from './thesigningInPage.js'

class SauceLabsPageFunctions extends myPage {
    // 1. The Search Button
    get sauceLabsSearchBtn () {
        return $('//button[@class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1fd9qbi"]');
    }
    async clickSauceLabsSearchBtn () {
        await this.sauceLabsSearchBtn.waitForExist({ timeout: 10000 });
        await expect(this.sauceLabsSearchBtn).toBeExisting();
        await this.sauceLabsSearchBtn.waitForClickable({ timeout: 10000 });
        await this.sauceLabsSearchBtn.click();
    }

    // 2. The Search X (Close) Button
    get sauceLabsSearchXBtn () {
        return $('//div[@class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 css-8i6f6s"]/div[@class="MuiStack-root css-347cve"]/button');
    }
    async clickSauceLabsSearchXBtn () {
        await this.sauceLabsSearchXBtn.waitForExist({ timeout: 10000 });
        await this.sauceLabsSearchXBtn.click();
    }
}

export default new SauceLabsPageFunctions();