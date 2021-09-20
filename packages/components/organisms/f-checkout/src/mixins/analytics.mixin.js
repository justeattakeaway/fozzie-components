import { mapState } from 'vuex';
import { HEADER_LOW_VALUE_ORDER_EXPERIMENT, VUEX_CHECKOUT_ANALYTICS_MODULE, VUEX_CHECKOUT_MODULE } from '../constants';
import experimentService from '../services/experimentService';
import { getAnalyticsErrorCodeByApiErrorCode } from '../services/mapper';

export default {
    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'basket',
            'errors',
            'isLoggedIn',
            'restaurant',
            'serviceType'
        ]),

        ...mapState(VUEX_CHECKOUT_ANALYTICS_MODULE, [
            'autofill',
            'changedFields'
        ])
    },

    methods: {
        /**
         * Pushes initial state of checkout to the dataLayer.
         */
        trackInitialLoad () {
            this.$gtm.pushEvent({
                checkout: {
                    step: 1
                },
                basket: this.basket,
                restaurant: {
                    id: this.restaurant.id,
                    seoName: this.restaurant.seoName
                },
                menu: {
                    type: this.serviceType
                }
            });

            this.trackFormInteraction({ action: 'start' });
        },

        /**
         * Pushes `form` event to the dataLayer with correct data
         */
        trackFormInteraction ({ action, error }) {
            const formName = this.isLoggedIn ? 'checkout' : 'checkout_guest';

            this.$gtm.pushEvent({
                event: 'Form',
                form: {
                    name: formName,
                    action,
                    error: error || null,
                    autofill: this.autofill || null,
                    changes: this.changedFields.toString()
                }
            });
        },

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
        },

        /**
         * Dispatches `trackFormInteraction` with each error in `state.errors`.
         */
        trackFormErrors () {
            const trackedErrors = [];

            this.errors.forEach(error => {
                const mappedError = getAnalyticsErrorCodeByApiErrorCode(error);

                if (!trackedErrors.includes(mappedError)) {
                    trackedErrors.push(mappedError);

                    this.trackFormInteraction({ action: 'error', error: mappedError });
                }
            });
        },

        /**
         * Fetches the variant of the Low Value Order experiment from the headers and pushes an analytics event.
         */
        trackLowValueOrderExperiment (experimentHeaders) {
            const lowValueOrderExperimentVariant = experimentHeaders?.[HEADER_LOW_VALUE_ORDER_EXPERIMENT];

            if (lowValueOrderExperimentVariant) {
                const event = experimentService.getLowValueOrderExperimentTracking(lowValueOrderExperimentVariant);

                if (event) {
                    this.$gtm.pushEvent(event);
                }
            }
        }
    }
};
