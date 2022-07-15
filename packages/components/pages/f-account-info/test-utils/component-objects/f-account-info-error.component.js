import Page from '@justeat/f-wdio-utils';

class AccountInfoErrorCard extends Page {
    constructor () {
        super('page', 'account-info-component');
    }

    // Overriding base implementation
    get component () { return $('[data-test-id="account-info-error-card"]'); }
}

export default new AccountInfoErrorCard();
