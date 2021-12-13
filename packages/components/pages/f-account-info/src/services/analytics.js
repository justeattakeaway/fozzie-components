export default class AccountInfoAnalyticsService {
    constructor ({ $store, $gtm }) {
        this.accountInfo = $store.state.fAccountInfoModule;
        this.$gtm = $gtm;
    }

    /**
     * Pushes `form` event to the dataLayer with correct data
     */
    trackFormSubmission () {
        debugger;

        this.$gtm.pushEvent({
            event: 'trackEvent',
            category: 'account',
            action: 'save_accountinfo_changes',
            label: 'submit'
        });
    }
}
