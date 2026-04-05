import { $ } from '@wdio/globals'
import signingInPage from './thesigningInPage.js';
class theLoginPage extends signingInPage {
    get inputYourUsername () {
        return () => $('#user-name');
    }

    get inputYourPassword () {
        return () => $('#password');
    }

    get btnToSubmit () {
        return () => $('input[class="submit-button btn_action"]');
    }

     async login (username, password) {
        await (this.inputYourUsername()).setValue(username);
        await (this.inputYourPassword()).setValue(password);
        await (this.btnToSubmit()).click();
    }

    open () {
        return super.open('login');
    }
}

export default new theLoginPage();
