import { $, browser } from '@wdio/globals'
import myPage from './thesigningInPage.js'

class multipleAddToCartButtons extends myPage {
    async clickTheButtonWhenItShowsUp (theButton) {
         try {
             const theButtonIsThere = await theButton.isExisting();

             if (!theButtonIsThere) {
                 await browser.pause(100);
                 return;
             }

             await theButton.waitForExist({ timeout: 15000 });
             await theButton.waitForDisplayed({ timeout: 15000 });
             await theButton.scrollIntoView();
             await browser.pause(100);
             try {
                 await theButton.waitForClickable({ timeout: 15000 });
                 await theButton.click();
             } catch (error) {
                 await browser.execute((button) => button.click(), await theButton);
             }
         } catch (error) {
             await browser.pause(100);
         }
    }

    // SauceLabs Add to Cart for Backpack is in the HamburgerMenuPage.js file
    // SauceLabs Add to cart for Bike Light
    get sauceLabsBikeLightAddToCartBtn () {
        return $('button[name="add-to-cart-sauce-labs-bike-light"]');
    }
    async clickSauceLabsBikeLightAddToCartBtn () {
         await this.clickTheButtonWhenItShowsUp(this.sauceLabsBikeLightAddToCartBtn);
    }
    // Sauce Labs Remove from cart for Bike Light
    get removeSauceLabsBikeLightBtn () {
        return $('button[name="remove-sauce-labs-bike-light"]');
    }
    async clickRemoveSauceLabsBikeLightBtn () {
         await this.clickTheButtonWhenItShowsUp(this.removeSauceLabsBikeLightBtn);
    }


    // Sauce Labs Add to cart for Bolt T-Shirt
    get sauceLabsBoltTShirt () {
        return $('button[name="add-to-cart-sauce-labs-bolt-t-shirt"]');
    }
    async clickSauceLabsBoltTShirt () {
         await this.clickTheButtonWhenItShowsUp(this.sauceLabsBoltTShirt);
    }
    // Sauce Labs Remove from cart for Bolt T-Shirt
    get removeSauceLabsBoltTShirtBtn () {
        return $('button[name="remove-sauce-labs-bolt-t-shirt"]');
    }
    get removeSauceLabsBoltTShirtBtnProblemUserBackup () {
        return $('button[name="remove-sauce-labs-fleece-jacket"]');
    }
    async clickRemoveSauceLabsBoltTShirtBtn () {
         const boltButtonIsThere = await this.removeSauceLabsBoltTShirtBtn.isExisting();
         const fleeceButtonIsThere = await this.removeSauceLabsBoltTShirtBtnProblemUserBackup.isExisting();

         if (boltButtonIsThere) {
             await this.clickTheButtonWhenItShowsUp(this.removeSauceLabsBoltTShirtBtn);
         } else if (fleeceButtonIsThere) {
             // problem_user is buggy on this site sometimes, so use the other button if the Bolt one never showed up
             await this.clickTheButtonWhenItShowsUp(this.removeSauceLabsBoltTShirtBtnProblemUserBackup);
         } else {
             await browser.pause(500);
         }
    }


    // Sauce Labs Add to cart for Fleece Jacket
    get sauceLabsFleeceJacketAddToCartBtn () {
        return $('button[name="add-to-cart-sauce-labs-fleece-jacket"]');
    }
    async clickSauceLabsFleeceJacketAddToCartBtn () {
         await this.clickTheButtonWhenItShowsUp(this.sauceLabsFleeceJacketAddToCartBtn);
    }
    // Sauce Labs Remove from cart for Fleece Jacket
    get removeSauceLabsFleeceJacketBtn () {
        return $('button[name="remove-sauce-labs-fleece-jacket"]');
    }
    async clickRemoveSauceLabsFleeceJacketBtn () {
         await this.clickTheButtonWhenItShowsUp(this.removeSauceLabsFleeceJacketBtn);
    }


    // Sauce Labs Add to cart for Onesie
    get sauceLabsOnesieAddToCartBtn () {
        return $('button[name="add-to-cart-sauce-labs-onesie"]');
    }
    async clickSauceLabsOnesieAddToCartBtn () {
         await this.clickTheButtonWhenItShowsUp(this.sauceLabsOnesieAddToCartBtn);
    }
    // Sauce Labs Remove from cart for Onesie
    get removeSauceLabsOnesieBtn () {
        return $('button[name="remove-sauce-labs-onesie"]');
    }
    async clickRemoveSauceLabsOnesieBtn () {
        await this.clickTheButtonWhenItShowsUp(this.removeSauceLabsOnesieBtn);
    }


    // Sauce Labs Add to cart for the Red T-Shirt in the bottom right hand corner
    get sauceLabsRedTShirtAddToCartBtn () {
        return $('button[name="add-to-cart-test.allthethings()-t-shirt-(red)"]');
    }
    async clickSauceLabsRedTShirtAddToCartBtn () {
         await this.clickTheButtonWhenItShowsUp(this.sauceLabsRedTShirtAddToCartBtn);
    }
    // Sauce Labs Remove from cart for Red T-Shirt
    get removeSauceLabsRedTShirtBtn () {
        return $('button[name="remove-test.allthethings()-t-shirt-(red)"]');
    }
    async clickRemoveSauceLabsRedTShirtBtn () {
         await this.clickTheButtonWhenItShowsUp(this.removeSauceLabsRedTShirtBtn);
    }


    // Sauce Labs Shopping Cart Button that is in the top right hand corner
    get sauceLabsShoppingCartBtn () {
        return $('.shopping_cart_link'); //Use this just in case this selector fails: ('a[class="shopping_cart_link"]')
    }
    async clickSauceLabsShoppingCartBtn () {
         await this.clickTheButtonWhenItShowsUp(this.sauceLabsShoppingCartBtn);
    }


    get sauceLabsContinueShoppingBtn () {
        return $('button[name="continue-shopping"]');
    }
    async clickSauceLabsContinueShoppingBtn () {
         await this.clickTheButtonWhenItShowsUp(this.sauceLabsContinueShoppingBtn);
    }
}

export default new multipleAddToCartButtons(); 

