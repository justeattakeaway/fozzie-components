export default class AccountInfoAnalyticsService {
    #$gtm;

    constructor ($gtm) {
        this.#$gtm = $gtm;
    }

    /**
     * Pushes `form` event to the dataLayer with correct data
     */
    trackFormSubmission (hasAddressBeenUpdated) {
        this.#$gtm.pushEvent({
            event: 'trackEvent',
            category: 'account',
            action: 'save_accountinfo_changes',
            label: 'submit'
        });

        if (hasAddressBeenUpdated) {
            this.#$gtm.pushEvent({
                event: 'trackEvent',
                category: 'my acccount',
                action: 'account info',
                label: 'address change intent'
            });
        }
    }
}
