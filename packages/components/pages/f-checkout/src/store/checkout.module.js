import axios from 'axios';
import jwtDecode from 'jwt-decode';
import addressService from '../services/addressService';
import {
    VUEX_CHECKOUT_ANALYTICS_MODULE, DEFAULT_CHECKOUT_ISSUE, DOB_REQUIRED_ISSUE, AGE_VERIFICATION_ISSUE, ERROR_TYPES,
    CHECKOUT_NOTE_TYPE_COURIER, CHECKOUT_NOTE_TYPE_ORDER
} from '../constants';
import basketApi from '../services/basketApi';
import checkoutApi from '../services/checkoutApi';
import addressGeocodingApi from '../services/addressGeocodingApi';
import orderPlacementApi from '../services/orderPlacementApi';
import accountApi from '../services/accountApi';

import {
    CLEAR_DOB_ERROR,
    UPDATE_AUTH,
    UPDATE_AUTH_GUEST,
    UPDATE_AVAILABLE_FULFILMENT_TIMES,
    UPDATE_BASKET_DETAILS,
    UPDATE_CUSTOMER_DETAILS,
    UPDATE_DATE_OF_BIRTH,
    UPDATE_ERRORS,
    UPDATE_ADDRESS_DETAILS,
    UPDATE_FULFILMENT_TIME,
    UPDATE_GEO_LOCATION,
    UPDATE_HAS_ASAP_SELECTED,
    UPDATE_IS_FULFILLABLE,
    UPDATE_NOTES_CONFIGURATION,
    UPDATE_CHECKOUT_ERROR_MESSAGE,
    UPDATE_ORDER_PLACED,
    UPDATE_PHONE_NUMBER,
    UPDATE_STATE,
    UPDATE_DINEIN_DETAILS,
    UPDATE_CHECKOUT_FEATURES,
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
        return {
            ...issue,
            messageKey: code
        };
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

        if (!data.customer.dateOfBirth) {
            tokenData = tokenData || jwtDecode(state.authToken);

            data.customer.dateOfBirth = tokenData.birthdate;
        }
    }
};


export default {
    namespaced: true,

    state: () => ({
        id: '',
        serviceType: '',
        dineIn: {
            tableIdentifier: ''
        },
        restaurant: {
            id: '',
            seoName: ''
        },
        basket: {
            id: '',
            total: 0
        },
        checkoutErrorMessage: null,
        customer: {
            firstName: '',
            lastName: '',
            email: '',
            mobileNumber: '',
            dateOfBirth: null
        },
        orderId: '',
        time: {
            from: '',
            to: ''
        },
        address: {
            line1: '',
            line2: '',
            line3: '',
            line4: '',
            administrativeArea: '',
            locality: '',
            postcode: ''
        },
        notes: {},
        isFulfillable: true,
        errors: [],
        notices: [],
        messages: [],
        notesConfiguration: {},
        availableFulfilment: {
            times: [],
            isAsapAvailable: false
        },
        authToken: '',
        isLoggedIn: false,
        isGuestCreated: false,
        geolocation: null,
        hasAsapSelected: false,
        features: {}
    }),

    actions: {
        /**
         * Get the checkout details from the backend and update the state.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions.
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getCheckout: async ({ commit, state, dispatch }, { url, timeout }) => {
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
                    || { messageKey: DEFAULT_CHECKOUT_ISSUE, errorType: ERROR_TYPES.dialog });

            commit(UPDATE_IS_FULFILLABLE, isFulfillable);
            commit(UPDATE_ERRORS, detailedIssues);

            dispatch('updateCheckoutErrorMessage', detailedIssues[0]);

            return headers;
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
            const { issues } = data;

            if (issues) {
                const detailedIssues = issues.map(issue => getIssueByCode(issue.code)
                    || { messageKey: DEFAULT_CHECKOUT_ISSUE, errorType: ERROR_TYPES.dialog });

                if (detailedIssues.length) {
                    commit(UPDATE_CHECKOUT_ERROR_MESSAGE, detailedIssues[0]);
                }
            }

            commit(UPDATE_AVAILABLE_FULFILMENT_TIMES, data);
        },

        /**
         * Set features passed in from CoreWeb configuration
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Features provided by Coreweb configuration file.
         */
        setCheckoutFeatures: ({ commit }, features) => {
            commit(UPDATE_CHECKOUT_FEATURES, features);
        },

        /**
         * Get the note configuration details from the backend and update the state.
         *
         * @param {Object} context - Vuex context object, this is the standard first parameter for actions
         * @param {Object} payload - Parameter with the different configurations for the request.
         */
        getNotesConfiguration: async ({ commit, state }, { url, timeout }) => {
            const { data } = await checkoutApi.getNoteConfiguration(url, timeout);
            const isSplitNotesEnabled = !data?.customerNotes?.serviceTypes[state.serviceType].orderNoteAccepted;
            commit(UPDATE_NOTES_CONFIGURATION, { ...data?.customerNotes?.serviceTypes, isSplitNotesEnabled });
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
            const { data } = await basketApi.getBasket(url, tenant, language, timeout);
            const prompts = data.BasketSummary.Prompts;
            const hasBasketChanged = prompts && (!!prompts.InvalidProducts?.length || !!prompts.OfflineProducts?.length);

            const basketDetails = {
                serviceType: data.ServiceType.toLowerCase(),
                restaurant: {
                    id: data.RestaurantId,
                    seoName: data.RestaurantSeoName
                },
                basket: {
                    id: data.BasketId,
                    total: data.BasketSummary.BasketTotals.Total
                },
                ageRestricted: data.BasketSummary.Prompts.Restrictions.some(restriction => restriction.Type === 'Alcohol')
            };

            // This logic is temporary while a new endpoint is built for fulfilment status.
            // We can't call GET checkout as a guest so we're now having to use the basket response for age restrictions until then
            if (basketDetails.ageRestricted && (tenant === 'au' || tenant === 'nz')) {
                commit(UPDATE_IS_FULFILLABLE, false);
                commit(UPDATE_ERRORS, [{ messageKey: DOB_REQUIRED_ISSUE }]);
            }

            if (hasBasketChanged) {
                commit(UPDATE_CHECKOUT_ERROR_MESSAGE, getIssueByCode('BasketChanged'));
            }

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
                    'Accept-Tenant': tenant,
                    'Accept-Language': language,
                    ...(state.authToken && {
                        Authorization: authHeader
                    })
                },
                timeout
            };

            const { data } = await axios.get(url, config);

            const addressDetails = addressService.getClosestAddress(data, tenant, currentPostcode);

            commit(UPDATE_ADDRESS_DETAILS, addressDetails);
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
            tenant,
            timeout
        }) => {
            if (state.customer.mobileNumber) {
                return;
            }

            const tokenData = jwtDecode(state.authToken);
            let mobileNumber = tokenData.mobile_number || tokenData.phone_number || '';

            if (!mobileNumber && tenant === 'uk') {
                const authHeader = state.authToken && `Bearer ${state.authToken}`;
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept-Tenant': tenant,
                        ...(state.authToken && {
                            Authorization: authHeader
                        })
                    },
                    timeout
                };

                const { data } = await axios.get(url, config);
                mobileNumber = data.PhoneNumber;
            }


            commit(UPDATE_PHONE_NUMBER, mobileNumber);
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
                    dispatch('updateCheckoutErrorMessage', checkoutIssue);
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
        getGeoLocation: async ({ commit, state }, {
            url, postData, timeout
        }) => {
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
                        Line3: addressDetails.line3,
                        Line4: addressDetails.line4,
                        administrativeArea: addressDetails.administrativeArea,
                        City: addressDetails.locality
                    }));
                }
            }

            if (!addressCoords && state.authToken) {
                const { data } = await addressGeocodingApi.getGeoLocation(url, postData, timeout, state);

                commit(UPDATE_GEO_LOCATION, data?.geometry.coordinates);
            }
        },

        setAuthToken: ({ commit }, authToken) => {
            commit(UPDATE_AUTH, authToken);
        },

        updateUserDetails ({ commit, dispatch }, payload) {
            const { fieldType, fieldName, value } = payload;
            const data = { [fieldName]: value };

            dispatch(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateChangedField`, fieldName, { root: true });
            commit(`UPDATE_${fieldType.toUpperCase()}_DETAILS`, data);
        },

        updateFulfilmentTime ({ commit }, payload) {
            commit(UPDATE_FULFILMENT_TIME, payload);
        },

        updateUserNotes ({ commit, dispatch }, payload) {
            commit(UPDATE_USER_NOTES, payload);
            dispatch(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateChangedField`, 'note', { root: true });
        },

        updateHasAsapSelected ({ commit }, payload) {
            commit(UPDATE_HAS_ASAP_SELECTED, payload);
        },

        updateCheckoutErrorMessage:  ({ commit }, message = null) => {
            commit(UPDATE_CHECKOUT_ERROR_MESSAGE, message);
        },

        updateAddress: ({ commit }, address) => {
            commit(UPDATE_ADDRESS_DETAILS, address);
        },

        updateDateOfBirth: ({ commit }, dateOfBirth) => {
            commit(UPDATE_DATE_OF_BIRTH, dateOfBirth);
            commit(CLEAR_DOB_ERROR, {});
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
            } else if (fulfilment?.location?.address?.lines) {
                /* eslint-disable prefer-destructuring */
                address = fulfilment.location.address;
            }

            if (address) {
                [state.address.line1, state.address.line2, state.address.line3, state.address.line4] = address.lines;

                state.address.locality = address.locality;
                state.address.postcode = address.postalCode;
                state.address.administrativeArea = address.administrativeArea;
            }

            state.geolocation = fulfilment?.location?.geolocation || null;

            if (fulfilment.table) {
                state.dineIn.tableIdentifier = fulfilment.table.identifier;
            }

            state.isFulfillable = isFulfillable;
            state.notices = notices;
            state.messages = messages;
            state.notes = notes || {};
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

        [UPDATE_DINEIN_DETAILS]: (state, payload) => {
            state.dineIn = payload;
        },

        [UPDATE_ADDRESS_DETAILS]: (state, address) => {
            const fulfilmentAddress = {};

            Object.entries(address).forEach(([key, value]) => {
                const addressKey = key === 'postalCode' ? 'postcode' : key;

                fulfilmentAddress[addressKey] = value;
            });

            state.address = {
                ...state.address,
                ...fulfilmentAddress
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

        [CLEAR_DOB_ERROR]: state => {
            state.errors = state.errors.filter(error => error.messageKey !== DOB_REQUIRED_ISSUE && error.messageKey !== AGE_VERIFICATION_ISSUE);
        },

        [UPDATE_USER_NOTES]: (state, userNote) => {
            state.notes = {
                ...state.notes,
                [userNote.type]: { note: userNote.note }
            };
        },

        [UPDATE_ORDER_PLACED]: (state, orderId) => {
            state.orderId = orderId;
        },

        [UPDATE_GEO_LOCATION]: (state, coords) => {
            if (Array.isArray(coords)) {
                const [lng, lat] = coords;
                state.geolocation = {
                    latitude: lat,
                    longitude: lng
                };
            }
        },

        [UPDATE_CHECKOUT_ERROR_MESSAGE]: (state, message) => {
            state.checkoutErrorMessage = message;
        },

        [UPDATE_PHONE_NUMBER]: (state, phoneNumber) => {
            state.customer.mobileNumber = phoneNumber;
        },

        [UPDATE_DATE_OF_BIRTH]: (state, dateOfBirth) => {
            state.customer.dateOfBirth = dateOfBirth;
        },

        [UPDATE_CHECKOUT_FEATURES]: (state, features) => {
            state.features = features;
        },

        [UPDATE_NOTES_CONFIGURATION]: (state, notesConfig) => {
            state.notesConfiguration = notesConfig;
        }
    },

    getters: {
        courierNoteAccepted: state => state.notesConfiguration[state.serviceType]?.courierNoteAccepted,
        orderNoteAccepted: state => state.notesConfiguration[state.serviceType]?.orderNoteAccepted,
        kitchenNoteAccepted: state => state.notesConfiguration[state.serviceType]?.kitchenNoteAccepted,
        noteTypeCourierOrOrder: state => (state.notesConfiguration[state.serviceType]?.courierNoteAccepted ? CHECKOUT_NOTE_TYPE_COURIER : CHECKOUT_NOTE_TYPE_ORDER),
        noteValue: state => (state.notesConfiguration[state.serviceType]?.courierNoteAccepted ? state.notes.courier?.note : state.notes.order?.note),
        kitchenNoteValue: state => state.notes.kitchen?.note || '',
        formattedNotes: (state, getters) => (state.features.isSplitNotesEnabled ?
            {
                ...(getters.courierNoteAccepted && {
                    courier: {
                        note: state.notes.courier?.note
                    }
                }),
                ...(getters.kitchenNoteAccepted && {
                    kitchen: {
                        note: state.notes.kitchen?.note
                    }
                }),
                ...(state.notesConfiguration[state.serviceType]?.orderNoteAccepted && {
                    order: {
                        note: state.notes.order?.note
                    }
                })
            } : [{ type: 'delivery', note: state.notes.order?.note }])
    }
};
