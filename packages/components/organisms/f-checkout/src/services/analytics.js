import { getAnalyticsErrorCodeByApiErrorCode } from './mapper';
import experimentService from './experimentService';
import { HEADER_LOW_VALUE_ORDER_EXPERIMENT } from '../constants';

export default class AnalyticService {
    constructor (store) {
        this.analytics = store.state.fCheckoutAnalyticsModule;
        this.checkout = store.state.fCheckoutModule;
    }

    /**
     * Pushes `form` event to the dataLayer with correct data
     */
    trackFormInteraction ({ action, error }) {
        const formName = this.checkout.isLoggedIn ? 'checkout' : 'checkout_guest';

        window.dataLayer.push({
            event: 'Form',
            form: {
                name: formName,
                action,
                error: error || null,
                autofill: this.analytics.autofill || null,
                changes: this.analytics.changedFields.toString() || null
            }
        });
    }

    /**
     * Pushes initial state of checkout to the dataLayer.
     */
    trackInitialLoad () {
        if (typeof (window) === 'undefined') {
            return;
        }

        window.dataLayer.push({
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
}

/**
 * Fetches the variant of the Low Value Order experiment from the headers and pushes an analytics event.
 */
const trackLowValueOrderExperiment = experimentHeaders => {
    const lowValueOrderExperimentVariant = experimentHeaders?.[HEADER_LOW_VALUE_ORDER_EXPERIMENT];
    if (lowValueOrderExperimentVariant) {
        const event = experimentService.getLowValueOrderExperimentTracking(lowValueOrderExperimentVariant);

        if (event) {
            window.dataLayer.push(event);
        }
    }
};

/**
 * Pushes details that an error dialog has been loaded
 */
const trackDialogEvent = action => {
    let eventAction;

    if (action.isDuplicateOrderError) {
        eventAction = 'dialog_duplicate_order_warning';
    } else {
        const error = action.code.toLowerCase();
        eventAction = `dialog_${error}_error`;
    }

    window.dataLayer.push({
        event: 'trackEvent',
        eventCategory: 'engagement',
        eventAction,
        eventLabel: 'view_dialog'
    });
};

export {
    trackLowValueOrderExperiment,
    trackDialogEvent
};
