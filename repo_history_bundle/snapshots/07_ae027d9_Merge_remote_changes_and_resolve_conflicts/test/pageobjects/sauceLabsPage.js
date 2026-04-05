import { $ } from '@wdio/globals'
import myPage from './thesigningInPage.js'

class sauceLabsPageFunctions extends myPage {
    get sauceLabsSearchBtn () {
        return () => $('//button[contains(text(), "AI-Powered Insights")]');
    }
    async clickSauceLabsSearchBtn () {
        await (this.sauceLabsSearchBtn()).click();
    }
// Make sure to update this so I have the searchXBtn when I go into the search, I can leave it. Find an element for it and then add a get and async for it.
    get sauceLabsHomePageforContinuousQualityAIPoweredInstights () {
        return () => $('div[class="MuiBox-root css-1kakr30"]');
    }
}

export default new sauceLabsPageFunctions();