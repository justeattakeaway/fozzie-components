import Trak from '@justeat/f-trak';
import { mapAnalyticsFieldNames } from '../services/mapper';

import {
    UPDATE_ANALYTICS_STATE,
    UPDATE_CHANGED_FIELDS,
    UPDATE_AUTOFILL
} from './mutation-types';

export default {
    namespaced: true,

    state: () => ({
        serviceType: '',
        restaurantId: '',
        basket: {
            id: '',
            total: 0
        },
        isLoggedIn: false,
        changedFields: [],
        autofill: []
    }),

    actions: {
        updateState ({ rootState, commit }, payload) {
            const checkoutState = {
                isLoggedIn: rootState.checkout.isLoggedIn,
                basket: rootState.checkout.basket,
                restaurantId: rootState.checkout.restaurantId,
                serviceType: rootState.checkout.serviceType
            };

            if (checkoutState.isLoggedIn) {
                commit(UPDATE_AUTOFILL, JSON.parse(JSON.stringify(payload)));
            }

            commit(UPDATE_ANALYTICS_STATE, checkoutState);
        },

        /**
         * Pushes initial state of checkout to the dataLayer.
         */
        updateFieldChanges ({ commit }, field) {
            commit(UPDATE_CHANGED_FIELDS, field);
        },

        /**
         * Pushes initial state of checkout to the dataLayer.
         */
        trackInitialLoad ({ state, dispatch }) {
            window.dataLayer = window.dataLayer || [];

            const pageName = state.isLoggedIn ? 'Overview' : 'Guest';

            Trak.event({
                custom: {
                    checkout: {
                        step: 1
                    },
                    basket: {
                        id: state.basket.id,
                        total: state.basket.total
                    },
                    restaurant: {
                        id: state.restaurantId
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
        trackFormInteraction ({ state }, { action, error }) {
            const formName = state.isLoggedIn ? 'checkout' : 'checkout_guest';

            Trak.event({
                event: 'Form',
                custom: {
                    form: {
                        name: formName,
                        action,
                        error: error || null,
                        autofill: JSON.parse(JSON.stringify(state.autofill)),
                        changes: JSON.parse(JSON.stringify(state.changedFields))
                    }
                }
            });
        }
    },

    mutations: {
        [UPDATE_ANALYTICS_STATE]: (state, checkoutState) => {
            state.isLoggedIn = checkoutState.isLoggedIn || null;
            state.basket = checkoutState.basket || null;
            state.restaurantId = checkoutState.restaurantId || null;
            state.serviceType = checkoutState.serviceType || null;
        },

        [UPDATE_CHANGED_FIELDS]: (state, field) => {
            const analyticsNames = mapAnalyticsFieldNames(field);

            if (!state.changedFields.includes(analyticsNames)) {
                state.changedFields.push(analyticsNames);
            }
        },

        [UPDATE_AUTOFILL]: (state, payload) => {
            const { customer, address, serviceType } = payload;

            if (customer.mobileNumber) {
                state.autofill.push('phone');
            }

            if (serviceType === 'delivery') {
                Object.entries(address).forEach(([key, value]) => {
                    if (value) {
                        state.autofill.push(mapAnalyticsFieldNames(key));
                    }
                });
            }
        }
    }
};
