import { browser } from '@wdio/globals'
export default class signingInPage {
    open (path) { //NOTE: Put *path* back here between the parenthesis if it stops working on this line.
        return browser.url(`https://www.saucedemo.com/`)
    }
}
