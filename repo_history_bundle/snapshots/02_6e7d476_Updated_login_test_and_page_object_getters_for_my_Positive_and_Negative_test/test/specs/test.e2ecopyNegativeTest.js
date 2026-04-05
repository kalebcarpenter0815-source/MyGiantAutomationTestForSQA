import { expect } from '@wdio/globals'
import signingInPage from '../pageobjects/pagecopy1PositiveandNegativeTest.js'
import theLoginPage from '../pageobjects/login.pagecopyPositiveandNegativeTest.js'
import theSecurePage from '../pageobjects/secure.pagecopyPositiveandNegativeTest.js'
import LogoutProcess from '../pageobjects/secureLogoutPage.js'
describe('My Login application', () => {
     // Positive Testing for My Assignment
    it('should login with valid credentials', async () => {
        await theLoginPage.open();
        await theLoginPage.login('standard_user', 'secret_sauce');
        await expect(theSecurePage.landingPage).toBeExisting();
        await LogoutProcess.logout();
    });
    
    it('should show error for locked_out_user', async () => {
        await theLoginPage.open();
        await theLoginPage.login('locked_out_user', 'secret_sauce');
        await expect(theSecurePage.LockedOutUser).toBeExisting();
    });
    
    it('should login with problem_user', async () => {
        await theLoginPage.open();
        await theLoginPage.login('problem_user', 'secret_sauce');
        await expect(theSecurePage.landingPage).toBeExisting();
        await LogoutProcess.logout();
    });  
    
    it('should login with performance_glitch_user', async () => {
        await theLoginPage.open();
        await theLoginPage.login('performance_glitch_user', 'secret_sauce');
        await expect(theSecurePage.landingPage).toBeExisting();
        await LogoutProcess.logout();
    });
    
    it('should login with error_user', async () => {
        await theLoginPage.open();
        await theLoginPage.login('error_user', 'secret_sauce');
        await expect(theSecurePage.landingPage).toBeExisting();
        await LogoutProcess.logout();
    });
    
    it('should login with visual_user', async () => {
        await theLoginPage.open();
        await theLoginPage.login('visual_user', 'secret_sauce');
        await expect(theSecurePage.landingPage).toBeExisting();
        await LogoutProcess.logout();
    });

        // Negative test for my assignment:
    
    it('should fail login with wrong password', async () => {
        await theLoginPage.open();
        await theLoginPage.login('standard_user', '');
        await expect(theSecurePage.needsPassword).toBeExisting();
    });

    it('should fail login with empty username', async () => {
        await theLoginPage.open();
        await theLoginPage.login('', 'secret_sauce');
        await expect(theSecurePage.needsUsername).toBeExisting();
    });

    it('should fail login with empty password', async () => {
        await theLoginPage.open();
        await theLoginPage.login('standard_user', '');
        await expect(theSecurePage.needsPassword).toBeExisting();
    });

    it('should fail login with both fields empty', async () => {
        await theLoginPage.open();
        await theLoginPage.login('', '');
        await expect(theSecurePage.needsUsername).toBeExisting();
    });
});


