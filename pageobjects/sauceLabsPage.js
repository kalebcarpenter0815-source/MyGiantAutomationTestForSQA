import { $, $$, browser } from '@wdio/globals'
import myPage from './thesigningInPage.js'

class SauceLabsPageFunctions extends myPage {
    get sauceLabsSearchButtons () {
        return 'button[aria-label*="Search"], button[title*="Search"], button[class*="IconButton"]';
    }

    get sauceLabsCloseButtons () {
        return 'button[aria-label*="Close"], button[aria-label*="close"], button[class*="close"], button[class*="Close"]';
    }

    get sauceLabsSearchBtn () {
        return $(this.sauceLabsSearchButtons);
    }

    get sauceLabsSearchXBtn () {
        return $(this.sauceLabsCloseButtons);
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

    async waitForPageToSettle () {
        await browser.waitUntil(
            async () => {
                try {
                    return await browser.execute(() => document.readyState === 'complete');
                } catch (error) {
                    return true;
                }
            },
            { timeout: 10000, timeoutMsg: 'Sauce Labs page did not finish getting ready' }
        );
    }

    async getFirstDisplayedButton (selector) {
        const buttons = await $$(selector);

        for (const button of buttons) {
            if (await button.isDisplayed()) {
                return button;
            }
        }

        return null;
    }

    async maybeOpenAndCloseSearch () {
        try {
            await this.waitForSauceLabsPageToLoad();
            await this.waitForPageToSettle();

            const visibleSearchButton = await this.getFirstDisplayedButton(this.sauceLabsSearchButtons);
            if (!visibleSearchButton) {
                return false;
            }

            await visibleSearchButton.scrollIntoView();
            await visibleSearchButton.waitForClickable({ timeout: 10000 });
            await visibleSearchButton.click();

            await browser.waitUntil(
                async () => !!(await this.getFirstDisplayedButton(this.sauceLabsCloseButtons)),
                { timeout: 5000, timeoutMsg: 'Sauce Labs close search button did not show up in time' }
            ).catch(() => false);

            const visibleCloseButton = await this.getFirstDisplayedButton(this.sauceLabsCloseButtons);

            if (!visibleCloseButton) {
                return true;
            }

            await visibleCloseButton.waitForClickable({ timeout: 5000 });
            await visibleCloseButton.click();
            return true;
        } catch (error) {
            return false;
        }
    }

    async clickSauceLabsSearchBtn () {
        await this.sauceLabsSearchBtn.waitForExist({ timeout: 10000 });
        await this.sauceLabsSearchBtn.waitForClickable({ timeout: 10000 });
        await this.sauceLabsSearchBtn.click();
    }
    async clickSauceLabsSearchXBtn () {
        await this.sauceLabsSearchXBtn.waitForExist({ timeout: 10000 });
        await this.sauceLabsSearchXBtn.click();
    }
}

export default new SauceLabsPageFunctions();
