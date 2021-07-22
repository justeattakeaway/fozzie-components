import axios from 'axios';
import jwtDecode from 'jwt-decode';
import addressService from '../services/addressService';
import { VUEX_CHECKOUT_ANALYTICS_MODULE, DEFAULT_CHECKOUT_ISSUE } from '../constants';
import basketApi from '../services/basketApi';
import checkoutApi from '../services/checkoutApi';
import addressGeocodingApi from '../services/addressGeocodingApi';
import orderPlacementApi from '../services/orderPlacementApi';
import accountApi from '../services/accountApi';

import {
    UPDATE_ADDRESS,
    UPDATE_AUTH,
    UPDATE_AUTH_GUEST,
    UPDATE_AVAILABLE_FULFILMENT_TIMES,
    UPDATE_BASKET_DETAILS,
    UPDATE_CUSTOMER_DETAILS,
    UPDATE_ERRORS,
    UPDATE_FULFILMENT_ADDRESS,
    UPDATE_FULFILMENT_TIME,
    UPDATE_GEO_LOCATION,
    UPDATE_HAS_ASAP_SELECTED,
    UPDATE_IS_FULFILLABLE,
    UPDATE_MESSAGE,
    UPDATE_ORDER_PLACED,
    UPDATE_PHONE_NUMBER,
    UPDATE_STATE,
    UPDATE_TABLE_IDENTIFIER,
    UPDATE_USER_NOTES
} from './mutation-types';

import checkoutIssues from '../checkout-issues';
/**
 * @param {String} code - The code returned by an API.
 * @returns {object} - An object with the issue's desired behaviours and the code.
 */
const getIssueByCode = code => {
    const issue = checkoutIssues[code];

    if (issue) {
        return { ...issue, code };
    }

    return null;
};

/**
* @function resolveCustomerDetails
* If certain customer details are missing from api `data.customer` object then fallback
* to the decoded `state.AuthToken` details and re-assign back to `data.customer`.
* @param  {object} data  - Api response object.
* @param  {object} state - The current `checkout` state.
*/
const resolveCustomerDetails = (data, state) => {
    if (data && data.customer) {
        let tokenData;

        if (!data.customer.phoneNumber) {
            tokenData = jwtDecode(state.authToken);

            data.customer.phoneNumber = tokenData.mobile_number || tokenData.phone_number;
        }

        if (!data.customer.firstName || !data.customer.lastName) {
            tokenData = tokenData || jwtDecode(state.authToken);

            data.customer.firstName = tokenData.given_name;
            data.customer.lastName = tokenData.family_name;
        }
    }
};

/**
 * @param {object} state - The current `checkout` state.
 * @returns {String} - session storage key where we save user note.
 */
const getUserNoteSessionStorageKey = state => `userNote-${state.basket.id}`;

export default {
    namespaced: true,

    state: () => ({
        id: '',
        serviceType: '',
        tableIdentifier: '',
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
        userNotes: {},
        isFulfillable: true,
        errors: [],
        notices: [],
        message: null,
        messages: [],
        noteTypes: [],
        availableFulfilment: {
            times: [],
            isAsapAvailable: false
        },
        authToken: '',
        isLoggedIn: false,
        isGuestCreated: false,
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
            // TODO: deal with exceptions.
            const { data } = await checkoutApi.getCheckout(url, state, timeout);

            resolveCustomerDetails(data, state);

            commit(UPDATE_STATE, data);
            commit(UPDATE_HAS_ASAP_SELECTED, data.fulfilment.time.asap);

            dispatch(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateAutofill`, state, { root: true });
        },

        /**
         * Post the checkout details to the backend.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions.
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        updateCheckout: async ({
            commit, state, dispatch, rootGetters
        }, { url, data, timeout }) => {
            const request = {
                url,
                state,
                rootGetters,
                data,
                timeout
            };

            const { data: responseData, headers } = await checkoutApi.updateCheckout(request);

            const { issues, isFulfillable } = responseData;

            const detailedIssues = issues.map(issue => getIssueByCode(issue.code)
                    || { code: DEFAULT_CHECKOUT_ISSUE, shouldShowInDialog: true });

            commit(UPDATE_IS_FULFILLABLE, isFulfillable);
            commit(UPDATE_ERRORS, detailedIssues);

            dispatch(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/trackLowValueOrderExperiment`, headers, { root: true });
            dispatch('updateMessage', detailedIssues[0]);
        },

        /**
         * Post the guest user details to the backend.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        createGuestUser: async ({ commit }, {
            url, tenant, data, timeout, otacToAuthExchanger
        }) => {
            const response = await accountApi.createGuestUser(url, data, timeout, tenant);
            const otac = response?.data?.token;
            const authToken = await otacToAuthExchanger(otac);
            commit(UPDATE_AUTH_GUEST, authToken);
        },

        /**
         * Get the fulfilment details from the backend and update the state.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getAvailableFulfilment: async ({ commit }, { url, timeout }) => {
            const { data } = await checkoutApi.getAvailableFulfilment(url, timeout);

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
            const { data } = await basketApi.getBasket(url, tenant, language, timeout);
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
            timeout,
            currentPostcode
        }) => {
            const authHeader = state.authToken && `Bearer ${state.authToken}`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': language,
                    ...(state.authToken && {
                        Authorization: authHeader
                    })
                },
                timeout
            };

            const { data } = await axios.get(url, config);

            const addressDetails = addressService.getClosestAddress(data.Addresses, tenant, currentPostcode);

            commit(UPDATE_FULFILMENT_ADDRESS, addressDetails);
            dispatch(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateAutofill`, state, { root: true });
        },

        /**
         * Gets phone number from customer record from backend and updates state
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getCustomer: async ({ commit, state, dispatch }, {
            url,
            timeout
        }) => {
            if (!state.customer || state.customer.mobileNumber) {
                return;
            }

            const authHeader = state.authToken && `Bearer ${state.authToken}`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    ...(state.authToken && {
                        Authorization: authHeader
                    })
                },
                timeout
            };

            const { data } = await axios.get(url, config);

            commit(UPDATE_PHONE_NUMBER, data.PhoneNumber);
            dispatch(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateAutofill`, state, { root: true });
        },

        /**
         * Post the order details to the Order Placement API and get the `orderId` from the response.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        placeOrder: async ({ commit, state, dispatch }, {
            url, data, timeout
        }) => {
            try {
                const response = await orderPlacementApi.placeOrder(url, data, timeout, state);

                const { orderId } = response.data;

                commit(UPDATE_ORDER_PLACED, orderId);
                commit(UPDATE_ERRORS, []);
            } catch (error) {
                if (error.response && error.response.data) {
                    const { errorCode } = error.response.data;

                    const checkoutIssue = getIssueByCode(errorCode);

                    commit(UPDATE_ERRORS, (checkoutIssue ? [checkoutIssue] : []));
                    dispatch('updateMessage', checkoutIssue);
                }

                throw error; // Handled by the calling function.
            }
        },

        /**
         * Get the geo details from the address and update the state (If not logged in then skip).
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getGeoLocation: async ({ commit, state }, { url, postData, timeout }) => {
            let addressCoords;

            const isAddressInLocalStorage = addressService.isAddressInLocalStorage();

            if (isAddressInLocalStorage) {
                const storedAddress = addressService.getAddressFromLocalStorage(false);

                if (addressService.doesAddressInStorageAndFormMatch(storedAddress, state.address)) {
                    addressCoords = storedAddress.Field1 && storedAddress.Field2 ? [storedAddress.Field2, storedAddress.Field1] : null;
                    commit(UPDATE_GEO_LOCATION, addressCoords);
                } else {
                    const addressDetails = state.address;

                    window.localStorage.setItem('je-full-address-details', JSON.stringify({
                        PostalCode: addressDetails.postcode,
                        Line1: addressDetails.line1,
                        Line2: addressDetails.line2,
                        City: addressDetails.locality
                    }));
                }
            }

            if (!addressCoords && state.authToken) {
                const { data } = await addressGeocodingApi.getGeoLocation(url, postData, timeout, state);

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

        updateTableIdentifier ({ commit }, payload) {
            commit(UPDATE_TABLE_IDENTIFIER, payload);
        },

        updateFulfilmentTime ({ commit }, payload) {
            commit(UPDATE_FULFILMENT_TIME, payload);
        },

        updateUserNote ({ commit, dispatch }, payload) {
            commit(UPDATE_USER_NOTES, payload);
            dispatch(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateChangedField`, 'note', { root: true });
        },

        getUserNote: ({ dispatch, state }) => {
            if (window.sessionStorage) {
                const key = getUserNoteSessionStorageKey(state);
                const note = window.sessionStorage.getItem(key);
                if (note) {
                    dispatch('updateUserNote', { type: 'delivery', note });
                }
            }
        },

        saveUserNote ({ state }) {
            if (window.sessionStorage) {
                const key = getUserNoteSessionStorageKey(state);
                window.sessionStorage.setItem(key, state.userNote);
            }
        },

        updateHasAsapSelected ({ commit }, payload) {
            commit(UPDATE_HAS_ASAP_SELECTED, payload);
        },

        updateMessage:  ({ commit }, message = null) => {
            commit(UPDATE_MESSAGE, message);
        },

        updateAddress: ({ commit }, address) => {
            commit(UPDATE_ADDRESS, address);
        }
    },

    mutations: {
        [UPDATE_STATE]: (state, {
            id,
            serviceType,
            customer,
            fulfilment,
            isFulfillable,
            notices,
            messages,
            noteTypes,
            notes
        }) => {
            state.id = id;
            state.serviceType = serviceType;

            if (customer) {
                state.customer.firstName = customer.firstName;
                state.customer.lastName = customer.lastName;
                state.customer.mobileNumber = customer.phoneNumber;
            }

            state.time = fulfilment.time.scheduled || state.time;

            let address = null;
            if (addressService.isAddressInLocalStorage()) {
                address = addressService.getAddressFromLocalStorage();
            } else if (fulfilment.location && fulfilment.location.address && fulfilment.location.address.lines) {
                /* eslint-disable prefer-destructuring */
                address = fulfilment.location.address;
            }

            if (address) {
                /* eslint-disable prefer-destructuring */
                state.address.line1 = address.lines[0];
                state.address.line2 = address.lines[1];
                /* eslint-enable prefer-destructuring */

                state.address.locality = address.locality;
                state.address.postcode = address.postalCode;
            }

            if (fulfilment.table) {
                state.tableIdentifier = fulfilment.table.identifier;
            }

            state.isFulfillable = isFulfillable;
            state.notices = notices;
            state.messages = messages;
            // TODO: Maybe there's a way to make this nicer
            state.userNotes = notes?.length > 0 ? { ...notes.map(({ type, note }) => ({ [type]: note })) } : {};
            // TODO: Remove this ternary when backend is complete. Currently we send the notes value as delivery but the default will be restaurant
            state.noteTypes = noteTypes.length > 0 ? noteTypes : ['delivery'];
        },

        [UPDATE_AUTH]: (state, authToken) => {
            state.authToken = authToken;
            state.isLoggedIn = !!authToken;
        },

        [UPDATE_AUTH_GUEST]: (state, authToken) => {
            state.authToken = authToken;
            state.isLoggedIn = true;
            state.isGuestCreated = true;
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

        [UPDATE_TABLE_IDENTIFIER]: (state, tableIdentifier) => {
            state.tableIdentifier = tableIdentifier;
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

        [UPDATE_USER_NOTES]: (state, userNote) => {
            state.userNotes = {
                ...state.userNotes,
                [userNote.type]: userNote.note
            };
        },

        [UPDATE_ORDER_PLACED]: (state, orderId) => {
            state.orderId = orderId;
        },

        [UPDATE_GEO_LOCATION]: (state, [lng, lat]) => {
            state.geolocation = {
                latitude: lat,
                longitude: lng
            };
        },

        [UPDATE_MESSAGE]: (state, message) => {
            state.message = message;
        },

        [UPDATE_ADDRESS]: (state, address) => {
            /* eslint-disable prefer-destructuring */
            state.address.line1 = address.lines[0];
            state.address.line2 = address.lines[1];
            /* eslint-enable prefer-destructuring */

            state.address.locality = address.locality;
            state.address.postcode = address.postalCode;
        },

        [UPDATE_PHONE_NUMBER]: (state, phoneNumber) => {
            state.customer.mobileNumber = phoneNumber;
        }
    }
};
