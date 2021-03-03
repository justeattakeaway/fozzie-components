import { mapAnalyticsName, mapAnalyticsNames } from '../services/mapper';
import { VUEX_CHECKOUT_MODULE } from '../constants';

import {
    UPDATE_CHANGED_FIELD,
    UPDATE_AUTOFILL
} from './mutation-types';

export default {
    namespaced: true,

    state: () => ({
        changedFields: [],
        autofill: []
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
                custom: {
                    checkout: {
                        step: 1
                    },
                    basket: rootState[VUEX_CHECKOUT_MODULE].basket,
                    restaurant: {
                        id: rootState[VUEX_CHECKOUT_MODULE].restaurantId
                    },
                    pageData: {
                        name: `Checkout 1 ${pageName}`,
                        group: 'Checkout'
                    }
                }
            });

            dispatch('trackFormInteraction', { action: 'start' });
        },

        /**
         * Pushes `form` event to the dataLayer with correct data
         */
        trackFormInteraction ({ state, rootState }, { action, error }) {
            const formName = rootState[VUEX_CHECKOUT_MODULE].isLoggedIn ? 'checkout' : 'checkout_guest';

            const mappedError = error ? mapAnalyticsNames(error) : null;

            window.dataLayer.push({
                event: 'Form',
                custom: {
                    form: {
                        name: formName,
                        action,
                        error: mappedError,
                        autofill: state.autofill,
                        changes: state.changedFields.sort()
                    }
                }
            });
        }
    },

    mutations: {
        [UPDATE_CHANGED_FIELD]: (state, field) => {
            if (!state.changedFields.includes(field)) {
                state.changedFields.push(field);
            }
        },

        [UPDATE_AUTOFILL]: (state, autofill) => {
            state.autofill = autofill;
        }
    }
};
