import axios from 'axios';
import jwtDecode from 'jwt-decode';
import addressService from '../services/addressService';
import { VUEX_CHECKOUT_ANALYTICS_MODULE, DEFAULT_CHECKOUT_ISSUE } from '../constants';
import { version as applicationVerion } from '../../package.json';

import {
    UPDATE_HAS_ASAP_SELECTED,
    UPDATE_AUTH,
    UPDATE_AVAILABLE_FULFILMENT_TIMES,
    UPDATE_BASKET_DETAILS,
    UPDATE_CUSTOMER_DETAILS,
    UPDATE_FULFILMENT_ADDRESS,
    UPDATE_FULFILMENT_TIME,
    UPDATE_GEO_LOCATION,
    UPDATE_IS_FULFILLABLE,
    UPDATE_ERRORS,
    UPDATE_ORDER_PLACED,
    UPDATE_STATE,
    UPDATE_USER_NOTE
} from './mutation-types';
import checkoutIssues from '../checkout-issues';

export default {
    namespaced: true,

    state: () => ({
        id: '',
        serviceType: '',
        restaurant: {
            id: '',
            seoName: ''
        },
        basket: {
            id: '',
            total: 0
        },
        customer: {
            firstName: '',
            lastName: '',
            email: '',
            mobileNumber: ''
        },
        orderId: '',
        time: {
            from: '',
            to: ''
        },
        address: {
            line1: '',
            line2: '',
            locality: '',
            postcode: ''
        },
        userNote: '',
        isFulfillable: true,
        errors: [],
        notices: [],
        messages: [],
        availableFulfilment: {
            times: [],
            isAsapAvailable: false
        },
        authToken: '',
        isLoggedIn: false,
        geolocation: null,
        hasAsapSelected: false
    }),

    actions: {
        /**
         * Get the checkout details from the backend and update the state.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions.
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getCheckout: async ({ commit, state, dispatch }, { url, timeout }) => {
            const authHeader = state.authToken && `Bearer ${state.authToken}`;

            // TODO: deal with exceptions.
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    ...(state.isLoggedIn && {
                        Authorization: authHeader
                    })
                },
                timeout
            };

            const { data } = await axios.get(url, config);

            commit(UPDATE_STATE, data);

            dispatch(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateAutofill`, state, { root: true });
        },

        /**
         * Post the checkout details to the backend.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions.
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        // eslint-disable-next-line no-unused-vars
        updateCheckout: async ({ commit, state }, {
            url, data, timeout
        }) => {
            // TODO: deal with exceptions and handle this action properly (when the functionality is ready)
            const authHeader = state.authToken && `Bearer ${state.authToken}`;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    ...(state.isLoggedIn && {
                        Authorization: authHeader
                    })
                },
                timeout
            };

            // TODO - Handle and log any errors
            const { data: responseData } = await axios.patch(url, data, config);
            const { issues, isFulfillable } = responseData;

            // Can now log these errors inside the map if necessary
            const detailedIssues = issues.map(issue => {
                const checkoutIssue = checkoutIssues[issue.code];

                if (checkoutIssue) {
                    return { ...checkoutIssue, ...issue };
                }

                return { code: DEFAULT_CHECKOUT_ISSUE, shouldShowInDialog: true };
            });

            commit(UPDATE_IS_FULFILLABLE, isFulfillable);
            commit(UPDATE_ERRORS, detailedIssues);
        },

        /**
         * Post the guest user details to the backend.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        createGuestUser: async (context, {
            url, tenant, data, timeout
        }) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Tenant': tenant
                },
                timeout
            };

            const response = await axios.post(url, data, config);
            // eslint-disable-next-line no-unused-vars
            const otac = response.data.token;
            // TODO: Use otac to log the user in
        },

        /**
         * Get the fulfilment details from the backend and update the state.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getAvailableFulfilment: async ({ commit }, { url, timeout }) => {
            // TODO: deal with exceptions.
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout
            };

            const { data } = await axios.get(url, config);

            commit(UPDATE_AVAILABLE_FULFILMENT_TIMES, data);
        },

        /**
         * Get the basket details from the backend and update the state.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getBasket: async ({ commit, dispatch, state }, {
            url,
            tenant,
            language,
            timeout
        }) => {
            // TODO: deal with exceptions.
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Tenant': tenant,
                    'Accept-Language': language
                },
                timeout
            };

            const { data } = await axios.get(url, config);
            const basketDetails = {
                serviceType: data.ServiceType.toLowerCase(),
                restaurant: {
                    id: data.RestaurantId,
                    seoName: data.RestaurantSeoName
                },
                basket: {
                    id: data.BasketId,
                    total: data.BasketSummary.BasketTotals.Total
                }
            };

            commit(UPDATE_BASKET_DETAILS, basketDetails);
            dispatch(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateAutofill`, state, { root: true });
        },

        /**
         * Get the address details from the backend and update the state.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getAddress: async ({ commit, state, dispatch }, {
            url,
            tenant,
            language,
            timeout
        }) => {
            const authHeader = state.authToken && `Bearer ${state.authToken}`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': language,
                    ...(state.isLoggedIn && {
                        Authorization: authHeader
                    })
                },
                timeout
            };

            const { data } = await axios.get(url, config);

            const addressDetails = addressService.getClosestAddress(data.Addresses, tenant);

            commit(UPDATE_FULFILMENT_ADDRESS, addressDetails);
            dispatch(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateAutofill`, state, { root: true });
        },

        /**
         * Get the customer name from JWT claims and update state with the result
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getCustomerName: async ({ commit, state }) => {
            const tokenData = jwtDecode(state.authToken);

            const customer = {
                firstName: tokenData.given_name,
                lastName: tokenData.family_name
            };

            commit(UPDATE_CUSTOMER_DETAILS, customer);
        },

        /**
         * Post the order details to the Order Placement API and get the `orderId` from the response.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        placeOrder: async ({ commit, state }, {
            url, data, timeout
        }) => {
            const authHeader = state.authToken && `Bearer ${state.authToken}`;

            const config = {
                headers: {
                    'Content-Type': 'application/json;v=2',
                    'x-je-application-id': 7, // Responsive Web
                    'x-je-application-version': applicationVerion,
                    Authorization: authHeader
                },
                timeout
            };

            const response = await axios.post(url, data, config);

            const { orderId } = response.data;

            commit(UPDATE_ORDER_PLACED, orderId);
        },

        /**
         * Get the geo details from the address and update the state (If not logged in then skip).
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getGeoLocation: async ({ commit, state }, { url, postData, timeout }) => {
            if (state.isLoggedIn) {
                const authHeader = state.authToken && `Bearer ${state.authToken}`;

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authHeader
                    },
                    timeout
                };

                const { data } = await axios.post(url, postData, config);

                commit(UPDATE_GEO_LOCATION, data.geometry.coordinates);
            }
        },

        setAuthToken: ({ commit }, authToken) => {
            commit(UPDATE_AUTH, authToken);
        },

        updateAddressDetails ({ commit, dispatch }, payload) {
            const [field] = Object.keys(payload);

            dispatch(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateChangedField`, field, { root: true });
            commit(UPDATE_FULFILMENT_ADDRESS, payload);
        },

        updateCustomerDetails ({ commit, dispatch }, payload) {
            const [field] = Object.keys(payload);

            dispatch(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateChangedField`, field, { root: true });
            commit(UPDATE_CUSTOMER_DETAILS, payload);
        },

        updateFulfilmentTime ({ commit }, payload) {
            commit(UPDATE_FULFILMENT_TIME, payload);
        },

        updateUserNote ({ commit, dispatch }, payload) {
            commit(UPDATE_USER_NOTE, payload);
            dispatch(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateChangedField`, 'note', { root: true });
        },

        updateHasAsapSelected ({ commit }, payload) {
            commit(UPDATE_HAS_ASAP_SELECTED, payload);
        }
    },

    mutations: {
        [UPDATE_STATE]: (state, {
            id,
            serviceType,
            customer,
            location,
            time,
            isFulfillable,
            notices,
            messages
        }) => {
            state.id = id;
            state.serviceType = serviceType;

            if (customer) {
                state.customer.firstName = customer.firstName;
                state.customer.mobileNumber = customer.phoneNumber;
            }

            state.time = time;

            if (location && location.address) {
                const { address } = location;
                /* eslint-disable prefer-destructuring */
                state.address.line1 = address.lines[0];
                state.address.line2 = address.lines[1];
                /* eslint-enable prefer-destructuring */

                state.address.locality = address.locality;
                state.address.postcode = address.postalCode;
            }

            state.isFulfillable = isFulfillable;
            state.notices = notices;
            state.messages = messages;
        },

        [UPDATE_AUTH]: (state, authToken) => {
            state.authToken = authToken;
            state.isLoggedIn = !!authToken;
        },

        [UPDATE_AVAILABLE_FULFILMENT_TIMES]: (state, {
            times,
            asapAvailable
        }) => {
            state.availableFulfilment.times = times;
            state.availableFulfilment.isAsapAvailable = asapAvailable;
        },

        [UPDATE_HAS_ASAP_SELECTED]: (state, hasAsapSelected) => {
            state.hasAsapSelected = hasAsapSelected;
        },

        [UPDATE_BASKET_DETAILS]: (state, { serviceType, basket, restaurant }) => {
            state.serviceType = serviceType;
            state.basket = basket;
            state.restaurant = restaurant;
        },

        [UPDATE_CUSTOMER_DETAILS]: (state, customer) => {
            state.customer = {
                ...state.customer,
                ...customer
            };
        },

        [UPDATE_FULFILMENT_ADDRESS]: (state, address) => {
            state.address = {
                ...state.address,
                ...address
            };
        },

        [UPDATE_FULFILMENT_TIME]: (state, time) => {
            state.time = {
                ...state.time,
                ...time
            };
        },

        [UPDATE_IS_FULFILLABLE]: (state, isFulfillable) => {
            state.isFulfillable = isFulfillable;
        },

        [UPDATE_ERRORS]: (state, issues) => {
            state.errors = issues;
        },

        [UPDATE_USER_NOTE]: (state, userNote) => {
            state.userNote = userNote;
        },

        [UPDATE_ORDER_PLACED]: (state, orderId) => {
            state.orderId = orderId;
        },

        [UPDATE_GEO_LOCATION]: (state, [lng, lat]) => {
            state.geolocation = {
                latitude: lat,
                longitude: lng
            };
        }
    }
};
