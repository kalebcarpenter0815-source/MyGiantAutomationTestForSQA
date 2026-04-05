import { $ } from '@wdio/globals'
import signingInPage from './pagecopy1.js';
//(_____________) -Means separating the code so I know what I am looking at.
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
        return $('button[submit-button btn_action="Login"]');
    }

//______________________________________________________________
     login (username, password) {
         this.inputYourUsername.setValue(username);
         this.inputYourPassword.setValue(password);
         this.btnToSubmit.click();
    }

 //______________________________________________________________
    open () {
        return super.open('login');
    }
}

export default new theLoginPage();
