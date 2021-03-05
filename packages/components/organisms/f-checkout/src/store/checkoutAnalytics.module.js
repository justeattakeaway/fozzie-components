import {
    mapAnalyticsName, mapAnalyticsNames, mapAnalyticsError
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
        changedFields: '', // TODO: come back to this, it should probably be an array that gets "stringified" before doing the dataLayer push.
        // errors: []
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
                    id: rootState[VUEX_CHECKOUT_MODULE].restaurantId
                },
                pageData: {
                    name: `Checkout 1 ${pageName}`,
                    group: 'Checkout'
                }
            });

            dispatch('trackFormInteraction', { action: 'start' });
        },

        /**
         * Pushes `form` event to the dataLayer with correct data
         */
        trackFormInteraction ({ state, rootState }, { action, error }) {
            let mappedError;
            const formName = rootState[VUEX_CHECKOUT_MODULE].isLoggedIn ? 'checkout' : 'checkout_guest';

            if (action !== 'error') {
                mappedError = error ? mapAnalyticsNames(error).toString() : null;
            }

            window.dataLayer.push({
                event: 'Form',
                form: {
                    name: formName,
                    action,
                    error: mappedError || error || null,
                    autofill: state.autofill,
                    changes: state.changedFields
                }
            });
        },

        /**
         *Dispatches `trackFormInteraction` with each error in `state.errors`.
         */
        trackFormError ({ rootState, dispatch }) {
            rootState[VUEX_CHECKOUT_MODULE].errors.forEach(error => {
                const mappedError = mapAnalyticsError(error);

                dispatch('trackFormInteraction', { action: 'error', error: mappedError });
            });
        }
    },

    mutations: {
        [UPDATE_CHANGED_FIELD]: (state, field) => {
            const changed = state.changedFields ? state.changedFields.split(',') : [];

            if (!changed.includes(field)) {
                changed.push(field);
            }

            state.changedFields = changed.sort().toString();
        },

        [UPDATE_AUTOFILL]: (state, autofill) => {
            state.autofill = autofill.toString();
        }
    }
};
