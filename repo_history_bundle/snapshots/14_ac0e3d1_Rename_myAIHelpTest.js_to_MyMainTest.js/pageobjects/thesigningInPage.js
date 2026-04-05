import { browser } from '@wdio/globals'
export default class signingInPage {
    async open() {
        await browser.url(`https://www.saucedemo.com/`)
        return this;
    }
}
