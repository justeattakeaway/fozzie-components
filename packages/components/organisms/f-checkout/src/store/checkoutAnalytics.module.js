import { mapAnalyticsName, mapAnalyticsNames, mapAnalyticsErrors } from '../services/mapper';
import { VUEX_CHECKOUT_MODULE } from '../constants';

import {
    UPDATE_AUTOFILL,
    UPDATE_CHANGED_FIELD,
    UPDATE_ERRORS
} from './mutation-types';

export default {
    namespaced: true,

    state: () => ({
        changedFields: [],
        autofill: [],
        errors: []
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
                    autofill: state.autofill.toString(),
                    changes: state.changedFields.toString()
                }
            });
        },

        /**
         * Pushes `form` event to the dataLayer with correct data
         */
        trackFormError ({ state, dispatch }) {
            state.errors.forEach(error => {
                dispatch('trackFormInteraction', { action: 'error', error });
            });
        },

        /**
         * Maps a passed issues too an analyticsErrors
         * Calls `UPDATE_Errors` mapped Errors.
         */
        updateErrors ({ commit }, issues) {
            if (issues) {
                const issueArray = [];

                issues.forEach(issue => {
                    issueArray.push(issue.code);
                });

                const errors = mapAnalyticsErrors(issueArray);

                commit(UPDATE_ERRORS, errors);
            }
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
            state.autofill = autofill;
        },

        [UPDATE_ERRORS]: (state, errors) => {
            errors.forEach(error => {
                if (!state.errors.includes(error)) {
                    state.errors.push(error);
                }
            });
        }
    }
};
