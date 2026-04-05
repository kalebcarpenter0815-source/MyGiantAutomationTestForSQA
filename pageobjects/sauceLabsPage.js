import { $, $$, browser, expect } from '@wdio/globals'
import myPage from './thesigningInPage.js'

class SauceLabsPageFunctions extends myPage {
    get sauceLabsSearchBtn () {
        return $('button[aria-label*="Search"], button[title*="Search"], button[class*="IconButton"]');
    }

    get sauceLabsSearchXBtn () {
        return $('button[aria-label*="Close"], button[aria-label*="close"], button[class*="close"], button[class*="Close"]');
    }

    async waitForSauceLabsPageToLoad () {
        await browser.waitUntil(
            async () => {
                const url = await browser.getUrl();
                const title = await browser.getTitle();

                return (
                    url.includes('saucelabs.com') ||
                    url.includes('/error/404') ||
                    title.toLowerCase().includes('sauce')
                );
            },
            { timeout: 20000, timeoutMsg: 'Sauce Labs page did not finish loading' }
        );
    }

    async maybeOpenAndCloseSearch () {
        try {
            const searchButtons = await $$('button[aria-label*="Search"], button[title*="Search"], button[class*="IconButton"]');

            if (searchButtons.length === 0) {
                return false;
            }

            const visibleSearchButton = await searchButtons.find(async (button) => await button.isDisplayed());
            if (!visibleSearchButton) {
                return false;
            }

            await visibleSearchButton.scrollIntoView();
            await browser.pause(500);
            await visibleSearchButton.click();

            const closeButtons = await $$('button[aria-label*="Close"], button[aria-label*="close"], button[class*="close"], button[class*="Close"]');
            const visibleCloseButton = await closeButtons.find(async (button) => await button.isDisplayed());

            if (!visibleCloseButton) {
                return true;
            }

            await visibleCloseButton.click();
            return true;
        } catch (error) {
            return false;
        }
    }

    async clickSauceLabsSearchBtn () {
        await this.sauceLabsSearchBtn.waitForExist({ timeout: 10000 });
        await expect(this.sauceLabsSearchBtn).toBeExisting();
        await this.sauceLabsSearchBtn.waitForClickable({ timeout: 10000 });
        await this.sauceLabsSearchBtn.click();
    }
    async clickSauceLabsSearchXBtn () {
        await this.sauceLabsSearchXBtn.waitForExist({ timeout: 10000 });
        await this.sauceLabsSearchXBtn.click();
    }
}

export default new SauceLabsPageFunctions();
