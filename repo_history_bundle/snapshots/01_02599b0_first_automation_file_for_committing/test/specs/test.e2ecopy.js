import theLoginPage from '../pageobjects/login.pagecopy.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await theLoginPage.open()

        theLoginPage.login('standard_user', 'secret_sauce')
    })
})

