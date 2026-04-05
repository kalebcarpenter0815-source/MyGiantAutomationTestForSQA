import { browser } from '@wdio/globals'

export default class signingInPage {
    open (path) {
        return browser.url(`https://www.saucedemo.com/`)
    }
}
