import { $ } from '@wdio/globals'
import signingInPage from './pagecopy1PositiveandNegativeTest.js';
//(_____________) -Means separating the code so I know what I am looking at, which helps visualize the negative test.
//______________________________________________________________
class theLoginPage extends signingInPage {
  //______________________________________________________________
    get inputYourUsername () {
        return $('#user-name');
    }

    get inputYourPassword () {
        return $('#password');
    }

    get btnToSubmit () {
        return $('input[class="submit-button btn_action"]');
    }

//______________________________________________________________
     async login (username, password) {
        await this.inputYourUsername.setValue(username);
        await this.inputYourPassword.setValue(password);
        await this.btnToSubmit.click();
    }

 //______________________________________________________________
    open () {
        return super.open('login');
    }
}

export default new theLoginPage();
