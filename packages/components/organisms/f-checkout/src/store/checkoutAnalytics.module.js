import {
    mapAnalyticsName, mapAnalyticsNames, getAnalyticsErrorCodeByApiErrorCode
} from '../services/mapper';
import { VUEX_CHECKOUT_MODULE } from '../constants';

import {
    UPDATE_AUTOFILL,
    UPDATE_CHANGED_FIELD
} from './mutation-types';

export default {
    namespaced: true,

    state: () => ({
        autofill: [],
        changedFields: []
    }),

    actions: {
        /**
         * Calls `UPDATE_AUTOFILL` with an Array of autofill fields.
         * `CheckoutState` will only contain customer address if serviceType is delivery.
         */
        updateAutofill ({ commit }, checkoutState) {
            let autofill = [];

            if (checkoutState.customer.mobileNumber) {
                autofill.push('phone');
            }

            Object.entries(checkoutState.address).forEach(([field, value]) => {
                if (value) {
                    autofill.push(field);
                }
            });

            autofill = mapAnalyticsNames(autofill);

            commit(UPDATE_AUTOFILL, autofill);
        },

        /**
         * Maps a passed field too an analytics field name
         * Calls `UPDATE_CHANGED_FIELD` analytics field name.
         */
        updateChangedField ({ commit }, field) {
            const analyticsName = mapAnalyticsName(field);

            commit(UPDATE_CHANGED_FIELD, analyticsName);
        },

        /**
         * Pushes initial state of checkout to the dataLayer.
         */
        trackInitialLoad ({ rootState, dispatch }) {
            if (typeof (window) === 'undefined') {
                return;
            }

            const pageName = rootState[VUEX_CHECKOUT_MODULE].isLoggedIn ? 'Overview' : 'Guest';

            window.dataLayer.push({
                checkout: {
                    step: 1
                },
                basket: rootState[VUEX_CHECKOUT_MODULE].basket,
                restaurant: {
                    id: rootState[VUEX_CHECKOUT_MODULE].restaurant.id,
                    seoName: rootState[VUEX_CHECKOUT_MODULE].restaurant.seoName
                },
                pageData: {
                    name: `Checkout 1 ${pageName}`,
                    group: 'Checkout'
                },
                menu: {
                    type: rootState[VUEX_CHECKOUT_MODULE].serviceType
                }
            });

            dispatch('trackFormInteraction', { action: 'start' });
        },

        /**
         * Pushes `form` event to the dataLayer with correct data
         */
        trackFormInteraction ({ state, rootState }, { action, error }) {
            const formName = rootState[VUEX_CHECKOUT_MODULE].isLoggedIn ? 'checkout' : 'checkout_guest';

            window.dataLayer.push({
                event: 'Form',
                form: {
                    name: formName,
                    action,
                    error: error || null,
                    autofill: state.autofill,
                    changes: state.changedFields.toString()
                }
            });
        },

        /**
         * Pushes details that the Duplicated Order Warning dialog has been loaded
         */
        trackDuplicateOrderWarnDialog () {
            window.dataLayer.push({
                event: 'trackEvent',
                eventCategory: 'engagement',
                eventAction: 'dialog_duplicate_order_warning',
                eventLabel: 'view_dialog'
            });
        },

        /**
         *Dispatches `trackFormInteraction` with each error in `state.errors`.
         */
        trackFormErrors ({ rootState, dispatch }) {
            const trackedErrors = [];

            rootState[VUEX_CHECKOUT_MODULE].errors.forEach(error => {
                const mappedError = getAnalyticsErrorCodeByApiErrorCode(error);

                if (!trackedErrors.includes(mappedError)) {
                    trackedErrors.push(mappedError);

                    dispatch('trackFormInteraction', { action: 'error', error: mappedError });
                }
            });
        }
    },

    mutations: {
        [UPDATE_CHANGED_FIELD]: (state, field) => {
            if (!state.changedFields.includes(field)) {
                state.changedFields.push(field);
            }

            state.changedFields.sort();
        },

        [UPDATE_AUTOFILL]: (state, autofill) => {
            state.autofill = autofill.toString();
        }
    }
};
