import { mapAnalyticsName, mapAnalyticsNames } from '../services/mapper';
import { UPDATE_AUTOFILL, UPDATE_CHANGED_FIELD, UPDATE_HEADERS } from './mutation-types';

export default {
    namespaced: true,

    state: () => ({
        autofill: [],
        changedFields: [],
        headers: {}
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
         * Calls `UPDATE_HEADERS` with payload.
         */
        updateHeaders ({ commit }, headers) {
            commit(UPDATE_HEADERS, headers);
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
        },

        [UPDATE_HEADERS]: (state, headers) => {
            state.headers = headers;
        }
    }
};
