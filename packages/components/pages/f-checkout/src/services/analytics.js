import { getAnalyticsErrorCodeByApiErrorCode } from './mapper';
import { HEADER_LOW_VALUE_ORDER_EXPERIMENT } from '../constants';

export default class CheckoutAnalyticService {
    constructor ({ $store, $gtm }) {
        this.analytics = $store.state.fCheckoutAnalyticsModule;
        this.checkout = $store.state.fCheckoutModule;
        this.$gtm = $gtm;
    }

    /**
     * Pushes `form` event to the dataLayer with correct data
     */
    trackFormInteraction ({ action, error }) {
        const formName = this.checkout.isLoggedIn ? 'checkout' : 'checkout_guest';

        this.$gtm.pushEvent({
            event: 'Form',
            form: {
                name: formName,
                action,
                error: error || null,
                autofill: this.analytics.autofill || null,
                changes: this.analytics.changedFields.toString() || null
            }
        });

        if (action === 'submit') {
            this.trackSelectedTimes();
        }
    }

    /**
     * Pushes initial state of checkout to the dataLayer.
     */
    trackInitialLoad () {
        this.$gtm.pushEvent({
            checkout: {
                step: 1
            },
            basket: this.checkout.basket,
            restaurant: {
                id: this.checkout.restaurant.id,
                seoName: this.checkout.restaurant.seoName
            },
            menu: {
                type: this.checkout.serviceType
            }
        });

        this.trackFormInteraction({ action: 'start' });
    }

    /**
     * Calls `trackFormInteraction` with each error in `state.errors`.
     */
    trackFormErrors () {
        const trackedErrors = [];

        this.checkout.errors.forEach(error => {
            const mappedError = getAnalyticsErrorCodeByApiErrorCode(error);

            if (!trackedErrors.includes(mappedError)) {
                trackedErrors.push(mappedError);

                this.trackFormInteraction({ action: 'error', error: mappedError });
            }
        });
    }

    /**
     * Fetches the variant of the Low Value Order experiment from the headers and pushes an analytics event.
     */
    trackLowValueOrderExperiment (experimentHeaders) {
        const lowValueOrderExperimentVariant = experimentHeaders?.[HEADER_LOW_VALUE_ORDER_EXPERIMENT];

        if (lowValueOrderExperimentVariant) {
            const event = {
                event: 'trackExperimentV2',
                custom: {
                    experiment: {
                        id: 'EX-1880',
                        name: 'low_value_order_phase_2',
                        platform: 'experiment_api',
                        version: 1,
                        variant: {
                            name: lowValueOrderExperimentVariant ?? 'reserve'
                        }
                    }
                }
            };

            if (event) {
                this.$gtm.pushEvent(event);
            }
        }
    }

    /**
     * Pushes details that an error dialog has been loaded
     */
    trackDialogEvent (action) {
        let eventAction;

        if (action.isDuplicateOrderError) {
            eventAction = 'dialog_duplicate_order_warning';
        } else {
            const error = action.code.toLowerCase();
            eventAction = `dialog_${error}_error`;
        }

        this.$gtm.pushEvent({
            event: 'trackEvent',
            eventCategory: 'engagement',
            eventAction,
            eventLabel: 'view_dialog'
        });
    }

    /**
     * Pushes timeSelected event to identify if the customer has selected asap
     */
    trackSelectedTimes () {
        this.$gtm.pushEvent({
            event: 'timeSelected',
            eventCategory: 'engagement',
            isAsapSelected: this.checkout.hasAsapSelected
        });
    }

    /**
     * Push guest checkout submission
     */
    trackGuestCheckoutSubmission () {
        this.$gtm.pushEvent({
            event: 'trackEvent',
            eventCategory: 'engagement',
            eventAction: 'form_checkout_guest',
            eventLabel: 'success'
        });
    }
}
