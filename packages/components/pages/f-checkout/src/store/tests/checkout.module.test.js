import axios from 'axios';
import CheckoutModule from '../checkout.module';
import getCheckoutResponse from '../../../stories/demo/payloads/getCheckout/getCheckout';
import getBasketResponse from '../../../stories/demo/payloads/getBasket/getBasket';
import { getAvailableTimes } from '../../../stories/demo/payloads/getAvailableTimes';
import geoLocationDetailsResponse from '../../../stories/demo/payloads/getGeoLocation';
import { getNotesConfig } from '../../../stories/demo/payloads/getNotes';
import storageMock from '../../../test-utils/local-storage/local-storage-mock';
import addressService from '../../services/addressService';
import basketApi from '../../services/basketApi';
import checkoutApi from '../../services/checkoutApi';
import addressGeocodingApi from '../../services/addressGeocodingApi';
import orderPlacementApi from '../../services/orderPlacementApi';
import accountApi from '../../services/accountApi';
import {
    mockAuthToken, mockAuthTokenNoNumbers, mockAuthTokenNoMobileNumber
} from '../../components/_tests/helpers/setup';
import {
    VUEX_CHECKOUT_ANALYTICS_MODULE,
    DEFAULT_CHECKOUT_ISSUE,
    ERROR_TYPES,
    DUPLICATE_ORDER,
    CHECKOUT_NOTE_TYPE_COURIER,
    CHECKOUT_NOTE_TYPE_ORDER,
    CHECKOUT_METHOD_DELIVERY
} from '../../constants';

import addressData from '../../../stories/demo/payloads/getCheckout/addresses/uk';
import customer from '../../../stories/demo/payloads/getCheckout/customer/uk';

import {
    UPDATE_AUTH,
    UPDATE_AUTH_GUEST,
    UPDATE_AVAILABLE_FULFILMENT_TIMES,
    UPDATE_BASKET_DETAILS,
    UPDATE_CUSTOMER_DETAILS,
    UPDATE_ERRORS,
    UPDATE_ADDRESS_DETAILS,
    UPDATE_FULFILMENT_TIME,
    UPDATE_HAS_ASAP_SELECTED,
    UPDATE_IS_FULFILLABLE,
    UPDATE_STATE,
    UPDATE_USER_NOTES,
    UPDATE_GEO_LOCATION,
    UPDATE_CHECKOUT_ERROR_MESSAGE,
    UPDATE_ADDRESS,
    UPDATE_PHONE_NUMBER,
    UPDATE_DATE_OF_BIRTH,
    CLEAR_DOB_ERROR,
    UPDATE_DINEIN_DETAILS
} from '../mutation-types';

// const customerAddresses = customerAddressResponse['get-address'].payload;
const geoLocationDetails = geoLocationDetailsResponse[0].payload;
// const customer = customerResponse['get-customer'].payload;

const checkoutDelivery = getCheckoutResponse();

const basketDelivery = getBasketResponse();
const basketInvalidProducts = getBasketResponse(CHECKOUT_METHOD_DELIVERY, 'invalidProduct');
const basketOfflineProducts = getBasketResponse(CHECKOUT_METHOD_DELIVERY, 'offlineProduct');
const basketDeliveryAgeRestricted = getBasketResponse(CHECKOUT_METHOD_DELIVERY, 'ageRestriction');

const checkoutAvailableFulfilment = getAvailableTimes();
const splitNotesConfig = getNotesConfig(true);

const { actions, getters, mutations } = CheckoutModule;

const {
    createGuestUser,
    getAddress,
    getAvailableFulfilment,
    getBasket,
    getCheckout,
    updateCheckoutErrorMessage,
    getCustomer,
    getGeoLocation,
    placeOrder,
    setAuthToken,
    updateCheckout,
    updateUserDetails,
    updateDateOfBirth,
    updateFulfilmentTime
} = actions;

const mobileNumber = '+447111111111';

const authToken = mockAuthToken;

const address = {
    line1: 'line 1',
    line2: 'line 2',
    locality: 'locality',
    postcode: 'postcode'
};

const locationData = {
    addressLines: [
        '1 Jazz Avenue',
        'Strange Town',
        'JZ1 1AA'
    ]
};

const basketId = 'newbasketid0001-v1';
const dateOfBirth = new Date(1987, 7, 4);

const time = {
    from: 'fromTime',
    to: 'toTime'
};

const isFulfillable = false;

const issues = [
    {
        code: 'RESTAURANT_UNAVAILABLE'
    }
];

const notes = { courier: { note: 'Please do not knock' }, kitchen: { note: 'No ketchup please' } };
const checkoutErrorMessage = {
    messageKey: DUPLICATE_ORDER,
    shouldRedirectToMenu: false,
    errorType: ERROR_TYPES.dialog
};

const defaultState = {
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
        locality: '',
        postcode: ''
    },
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
    isGuestCreated: false,
    notes: {},
    notesConfiguration: {},
    geolocation: null,
    hasAsapSelected: false,
    features: {}
};

const analyticsService = {
    trackLowValueOrderExperiment: jest.fn()
};

let state = CheckoutModule.state();

describe('CheckoutModule', () => {
    it('should create default state when initialised.', () => {
        // Assert
        expect(state).toEqual(defaultState);
    });

    describe('mutations ::', () => {
        beforeEach(() => {
            state = defaultState;
        });

        describe(`${UPDATE_STATE} ::`, () => {
            it('should update state with delivery response.', () => {
                // Act
                mutations[UPDATE_STATE](state, checkoutDelivery);

                // Assert
                expect(state).toMatchSnapshot();
            });

            it('should leave customer state empty if no customer data is returned from the API.', () => {
                // Arrange
                checkoutDelivery.customer = null;

                // Act
                mutations[UPDATE_STATE](state, checkoutDelivery);

                // Assert
                expect(state.customer).toEqual(defaultState.customer);
            });

            it('should leave address state empty if no location data is returned from the API.', () => {
                // Arrange
                checkoutDelivery.fulfilment.location = null;

                // Act
                mutations[UPDATE_STATE](state, checkoutDelivery);

                // Assert
                expect(state.address).toEqual(defaultState.address);
            });

            it('should leave address state empty if location data is returned with no address from the API.', () => {
                // Arrange
                checkoutDelivery.fulfilment.location = {
                    address: null
                };

                // Act
                mutations[UPDATE_STATE](state, checkoutDelivery);

                // Assert
                expect(state.address).toEqual(defaultState.address);
            });

            it('should leave address state empty if location data is returned with empty address fields from the API.', () => {
                // Arrange
                checkoutDelivery.fulfilment.location = {
                    address: {
                        lines: null,
                        locality: null,
                        administrativeArea: null,
                        postalCode: null
                    },
                    geolocation: null
                };

                // Act
                mutations[UPDATE_STATE](state, checkoutDelivery);

                // Assert
                expect(state.address).toEqual(defaultState.address);
            });
        });

        describe(`${UPDATE_AUTH} ::`, () => {
            it('should update state with authToken and set `isLoggedIn` to true', () => {
                // Act
                mutations[UPDATE_AUTH](state, authToken);

                // Assert
                expect(state.authToken).toEqual(authToken);
                expect(state.isLoggedIn).toBeTruthy();
            });
        });

        describe(`${UPDATE_AUTH_GUEST} ::`, () => {
            it('should update state with authToken and set `isLoggedIn` to true', () => {
                // Act
                mutations[UPDATE_AUTH_GUEST](state, authToken);

                // Assert
                expect(state.authToken).toEqual(authToken);
                expect(state.isLoggedIn).toBeTruthy();
            });

            it('should update state with `isGuestCreated` set to true', () => {
                // Act
                mutations[UPDATE_AUTH_GUEST](state, authToken);

                // Assert
                expect(state.isGuestCreated).toBeTruthy();
            });
        });

        describe(`${UPDATE_AVAILABLE_FULFILMENT_TIMES} ::`, () => {
            it('should update state with the availableFulfilment response', () => {
                // Arrange
                const expectedAvailableFulfilmentTimes = checkoutAvailableFulfilment.times;

                // Act
                mutations[UPDATE_AVAILABLE_FULFILMENT_TIMES](state, checkoutAvailableFulfilment);

                // Assert
                expect(state.availableFulfilment.times).toEqual(expectedAvailableFulfilmentTimes);
                expect(state.availableFulfilment.isAsapAvailable).toBe(true);
            });
        });

        describe(`${UPDATE_CUSTOMER_DETAILS} ::`, () => {
            it('should update state with received value', () => {
                // Arrange & Act
                mutations[UPDATE_CUSTOMER_DETAILS](state, { mobileNumber });

                // Assert
                expect(state.customer.mobileNumber).toEqual(mobileNumber);
            });
        });

        describe(`${UPDATE_BASKET_DETAILS} ::`, () => {
            it('should update state with received value', () => {
                // Arrange & Act
                const eventData = {
                    serviceType: 'delivery',
                    basket: {
                        id: '11111',
                        total: 12.50
                    },
                    restaurantId: '22222',
                    restaurantSeoName: 'masala-zone-camden'
                };
                mutations[UPDATE_BASKET_DETAILS](state, eventData);

                // Assert
                expect(state.serviceType).toEqual(eventData.serviceType);
                expect(state.basket).toEqual(eventData.basket);
                expect(state.restaurant).toEqual(eventData.restaurant);
            });
        });

        describe(`${UPDATE_GEO_LOCATION} ::`, () => {
            it('should NOT update state if value from endpoint is not an array', () => {
                // Arrange - coordinates array not returned from API
                const coordinates = undefined;
                state.geolocation = null;

                // Act
                mutations[UPDATE_GEO_LOCATION](state, coordinates);

                // Assert
                expect(state.geolocation).toBe(null);
            });


            it('should update state with received values', () => {
                // Arrange (Long / Lat)
                const geometryData = [-0.10358, 51.51469];

                // Act
                mutations[UPDATE_GEO_LOCATION](state, geometryData);

                // Assert
                expect(state.geolocation).toEqual({
                    latitude: geometryData[1],
                    longitude: geometryData[0]
                });
            });
        });

        describe(`${UPDATE_ADDRESS} ::`, () => {
            it('should update state with received values', () => {
                // Arrange
                const addressFromLocalStorage = {
                    lines: ['line 1', 'line 2'],
                    locality: 'locality',
                    postalCode: 'postcode'
                };

                // Act
                mutations[UPDATE_ADDRESS](state, addressFromLocalStorage);

                // Assert
                expect(state.address).toEqual(address);
            });
        });

        describe(`${UPDATE_PHONE_NUMBER} ::`, () => {
            it('should update state with received values', () => {
                // Arrange
                const phoneNumber = '+447111111112';

                // Act
                mutations[UPDATE_PHONE_NUMBER](state, phoneNumber);

                // Assert
                expect(state.customer.mobileNumber).toEqual(phoneNumber);
            });
        });

        describe(`${UPDATE_DATE_OF_BIRTH} ::`, () => {
            it('should update state with received values', () => {
                // Act
                mutations[UPDATE_DATE_OF_BIRTH](state, dateOfBirth);

                // Assert
                expect(state.customer.dateOfBirth).toEqual(dateOfBirth);
            });
        });

        describe(`${UPDATE_USER_NOTES} ::`, () => {
            it('should update the state with the new note values', () => {
                // Arrange
                const noteData = { type: 'kitchen', note: 'This is the new note value' };

                // Act
                mutations[UPDATE_USER_NOTES](state, noteData);

                // Assert
                expect(state.notes).toEqual({
                    [noteData.type]: { note: noteData.note }
                });
            });
        });

        describe(`${CLEAR_DOB_ERROR} :: `, () => {
            it('should remove the `DOB_REQUIRED_ISSUE` and the `AGE_VERIFICATION_ISSUE` errors', () => {
                // Arrange
                state.errors.push({ messageKey: 'DOB_REQUIRED_ISSUE' });
                state.errors.push({ messageKey: 'AGE_VERIFICATION_ISSUE' });

                // Act
                mutations[CLEAR_DOB_ERROR](state, {});

                // Assert
                expect(state.errors).toEqual(defaultState.errors);
            });
        });

        it.each([
            [UPDATE_ADDRESS_DETAILS, 'address', address],
            [UPDATE_FULFILMENT_TIME, 'time', time],
            [UPDATE_IS_FULFILLABLE, 'isFulfillable', isFulfillable],
            [UPDATE_ERRORS, 'errors', issues],
            [UPDATE_CHECKOUT_ERROR_MESSAGE, 'checkoutErrorMessage', checkoutErrorMessage]
        ])('%s :: should update state with received value', (mutationName, propertyName, propertyValue) => {
            // Arrange & Act
            mutations[mutationName](state, propertyValue);

            // Assert
            expect(state[propertyName]).toEqual(propertyValue);
        });
    });

    describe('actions ::', () => {
        let commit;
        let dispatch;
        let payload;
        let rootGetters;
        let context;

        beforeEach(() => {
            commit = jest.fn();
            dispatch = jest.fn();
            state = defaultState;
            rootGetters = {};
            context = {
                commit, state, dispatch, rootGetters
            };
            payload = {
                url: 'http://localhost/account/checkout',
                getCustomerUrl: 'http://localhost/customer',
                tenant: 'uk',
                language: 'en-GB',
                timeout: 10000,
                currentPostcode: null,
                postData: null
            };
        });

        describe('getCheckout ::', () => {
            let config;
            let checkoutDeliveryCopy;

            beforeEach(() => {
                config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${state.authToken}`
                    },
                    timeout: payload.timeout
                };

                // Use a new copy per test so any mutations do not affect subsequent tests
                checkoutDeliveryCopy = Object.assign(checkoutDelivery);

                checkoutApi.getCheckout = jest.fn(() => Promise.resolve({ data: checkoutDeliveryCopy }));
            });

            it(`should get the checkout details from the backend and call ${UPDATE_STATE} mutation.`, async () => {
                // Act
                await getCheckout(context, payload);

                // Assert
                expect(checkoutApi.getCheckout).toHaveBeenCalledWith(payload.url, state, payload.timeout);
                expect(commit).toHaveBeenCalledWith(UPDATE_STATE, checkoutDeliveryCopy);
            });

            it(`should update 'hasUpdatedAsap' value with ${UPDATE_HAS_ASAP_SELECTED} mutation.`, async () => {
                // Arrange
                const expectedAsapValue = checkoutDeliveryCopy.fulfilment.time.asap;

                // Act
                await getCheckout(context, payload);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_HAS_ASAP_SELECTED, expectedAsapValue);
            });

            it(`should call '${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateAutofill' mutation with an array of updated field names.`, async () => {
                // Act
                await getCheckout(context, payload);

                // Assert
                expect(dispatch).toHaveBeenCalledWith(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateAutofill`, state, { root: true });
            });

            describe('when the `customer` model is not returned from the api', () => {
                it('should not error when checking phone number', async () => {
                    // Arrange
                    checkoutDeliveryCopy.customer = null;

                    // Act
                    await getCheckout(context, payload);

                    // Assert
                    expect(checkoutDeliveryCopy.customer).toBe(null);
                    expect(checkoutApi.getCheckout).toHaveBeenCalledWith(payload.url, state, payload.timeout);
                    expect(commit).toHaveBeenCalledWith(UPDATE_STATE, checkoutDeliveryCopy);
                });
            });

            describe('when the customer details are returned from the api', () => {
                it('should not use neither of AuthToken phone numbers', async () => {
                    // Arrange
                    const expectedPhoneNumber = '5678901234';
                    checkoutDeliveryCopy.customer = {
                        phoneNumber: expectedPhoneNumber
                    };

                    // Act
                    await getCheckout(context, payload);

                    // Assert
                    expect(checkoutDeliveryCopy.customer.phoneNumber).toBe(expectedPhoneNumber);
                });

                it('should not use neither of AuthToken customer names', async () => {
                    // Arrange
                    const expectedFirstName = 'Jazz';
                    const expectedLastName = 'Man';
                    checkoutDeliveryCopy.customer = {
                        firstName: expectedFirstName,
                        lastName: expectedLastName
                    };

                    // Act
                    await getCheckout(context, payload);

                    // Assert
                    expect(checkoutDeliveryCopy.customer.firstName).toBe(expectedFirstName);
                    expect(checkoutDeliveryCopy.customer.lastName).toBe(expectedLastName);
                });
            });

            describe('when the customers phone number is not returned from the api', () => {
                beforeEach(() => {
                    checkoutDeliveryCopy.customer = {
                        phoneNumber: null
                    };
                });

                afterEach(() => {
                    // Reset the AuthToken for subsequent tests
                    state.authToken = authToken;
                });

                it('should assign the AuthToken mobile number to the `customer.phoneNumber`', async () => {
                    // Arrange
                    state.authToken = mockAuthToken;
                    const expectedPhoneNumber = '9876543210'; // AuthToken Mobile No.

                    // Act
                    await getCheckout(context, payload);

                    // Assert
                    expect(checkoutDeliveryCopy.customer.phoneNumber).toBe(expectedPhoneNumber);
                });

                it('should assign the AuthToken phone number to the `customer.phoneNumber` if the AuthToken mobile number is missing', async () => {
                    // Arrange
                    state.authToken = mockAuthTokenNoMobileNumber;
                    config.headers.Authorization = `Bearer ${state.authToken}`;
                    const expectedPhoneNumber = '0123456789'; // AuthToken Phone No.

                    // Act
                    await getCheckout(context, payload);

                    // Assert
                    expect(checkoutDeliveryCopy.customer.phoneNumber).toBe(expectedPhoneNumber);
                });

                it('should assign nothing to the `customer.phoneNumber` if both the AuthToken phone numbers are missing', async () => {
                    // Arrange
                    state.authToken = mockAuthTokenNoNumbers;
                    config.headers.Authorization = `Bearer ${state.authToken}`;

                    // Act
                    await getCheckout({ commit, state, dispatch }, payload);

                    // Assert
                    expect(checkoutDeliveryCopy.customer.phoneNumber).toBeUndefined();
                });
            });

            describe('when the customers first name is not returned from the api but the last name is', () => {
                it('should assign the AuthToken first & last name to the `customer`', async () => {
                    // Arrange
                    const expectedCustomerDetails = {
                        firstName: 'Joe',
                        lastName: 'Bloggs'
                    };
                    checkoutDeliveryCopy.customer = {
                        firstName: null,
                        lastName: 'Man'
                    };

                    // Act
                    await getCheckout(context, payload);

                    // Assert
                    expect(checkoutDeliveryCopy.customer.firstName).toBe(expectedCustomerDetails.firstName);
                    expect(checkoutDeliveryCopy.customer.lastName).toBe(expectedCustomerDetails.lastName);
                });
            });

            describe('when the customers last name is not returned from the api but the first name is', () => {
                it('should assign the AuthToken first & last name to the `customer`', async () => {
                    // Arrange
                    const expectedCustomerDetails = {
                        firstName: 'Joe',
                        lastName: 'Bloggs'
                    };
                    checkoutDeliveryCopy.customer = {
                        firstName: 'Jazz',
                        lastName: null
                    };

                    // Act
                    await getCheckout(context, payload);

                    // Assert
                    expect(checkoutDeliveryCopy.customer.firstName).toBe(expectedCustomerDetails.firstName);
                    expect(checkoutDeliveryCopy.customer.lastName).toBe(expectedCustomerDetails.lastName);
                });
            });
        });

        describe('getBasket ::', () => {
            it(`should get the basket details from the backend and call ${UPDATE_BASKET_DETAILS} mutation.`, async () => {
                // Arrange
                basketApi.getBasket = jest.fn(() => Promise.resolve({ data: basketDelivery }));

                // Act
                await getBasket(context, payload);

                // Assert
                expect(basketApi.getBasket).toHaveBeenCalledWith(payload.url, payload.tenant, payload.language, payload.timeout);
                expect(commit).toHaveBeenCalledWith(UPDATE_BASKET_DETAILS, {
                    serviceType: basketDelivery.ServiceType.toLowerCase(),
                    restaurant: {
                        id: basketDelivery.RestaurantId,
                        seoName: basketDelivery.RestaurantSeoName
                    },
                    basket: {
                        id: basketDelivery.BasketId,
                        total: basketDelivery.BasketSummary.BasketTotals.Total
                    },
                    ageRestricted: false
                });
            });

            describe('When there are age restricted items', () => {
                it(`should get the basket details from the backend, set ageRestricted to 'true' and call ${UPDATE_BASKET_DETAILS} mutation.`, async () => {
                    // Arrange
                    basketApi.getBasket = jest.fn(() => Promise.resolve({ data: basketDeliveryAgeRestricted }));

                    // Act
                    await getBasket(context, payload);

                    // Assert
                    expect(basketApi.getBasket).toHaveBeenCalledWith(payload.url, payload.tenant, payload.language, payload.timeout);
                    expect(commit).toHaveBeenCalledWith(UPDATE_BASKET_DETAILS, {
                        serviceType: basketDeliveryAgeRestricted.ServiceType.toLowerCase(),
                        restaurant: {
                            id: basketDeliveryAgeRestricted.RestaurantId,
                            seoName: basketDeliveryAgeRestricted.RestaurantSeoName
                        },
                        basket: {
                            id: basketDeliveryAgeRestricted.BasketId,
                            total: basketDeliveryAgeRestricted.BasketSummary.BasketTotals.Total
                        },
                        ageRestricted: true
                    });
                });
            });

            describe('When basket returns `Prompts`', () => {
                it(`should call ${UPDATE_CHECKOUT_ERROR_MESSAGE} mutation with 'BasketChanged' 'CheckoutIssue' when products are Invalid`, async () => {
                    // Arrange
                    basketApi.getBasket = jest.fn(() => Promise.resolve({ data: basketInvalidProducts }));

                    // Act
                    await getBasket(context, payload);

                    // Assert
                    expect(commit).toHaveBeenCalledWith(
                        UPDATE_CHECKOUT_ERROR_MESSAGE,
                        {
                            messageKey: 'BasketChanged',
                            shouldRedirectToMenu: true,
                            errorType: ERROR_TYPES.dialog
                        }
                    );
                });

                it(`should call ${UPDATE_CHECKOUT_ERROR_MESSAGE} mutation with 'BasketChanged' 'CheckoutIssue' when products are Offline`, async () => {
                    // Arrange
                    basketApi.getBasket = jest.fn(() => Promise.resolve({ data: basketOfflineProducts }));

                    // Act
                    await getBasket(context, payload);

                    // Assert
                    expect(commit).toHaveBeenCalledWith(
                        UPDATE_CHECKOUT_ERROR_MESSAGE,
                        {
                            messageKey: 'BasketChanged',
                            shouldRedirectToMenu: true,
                            errorType: ERROR_TYPES.dialog
                        }
                    );
                });
            });
        });

        describe('getAddress ::', () => {
            it(`should get the address details from the backend and call ${UPDATE_ADDRESS_DETAILS} mutation.`, async () => {
                // Arrange
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept-Language': payload.language,
                        'Accept-Tenant': payload.tenant,
                        Authorization: `Bearer ${state.authToken}`
                    },
                    timeout: payload.timeout
                };
                const customerAddresses = {
                    Addresses: [addressData]
                };

                const expectedFormattedAddress = {
                    line1: addressData.Line1,
                    line2: addressData.Line2,
                    locality: addressData.City,
                    postcode: addressData.ZipCode
                };
                const addressServiceSpy = jest.spyOn(addressService, 'getClosestAddress').mockReturnValue(expectedFormattedAddress);
                axios.get = jest.fn(() => Promise.resolve({ data: customerAddresses }));

                // Act
                await getAddress(context, payload);

                // Assert
                expect(addressServiceSpy).toHaveBeenCalledWith(customerAddresses, payload.tenant, payload.currentPostcode);
                expect(axios.get).toHaveBeenCalledWith(payload.url, config);
                expect(commit).toHaveBeenCalledWith(UPDATE_ADDRESS_DETAILS, expectedFormattedAddress);
            });

            it(`should call '${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateAutofill' mutation with an array of updated field names.`, async () => {
                // Act
                await getAddress(context, payload);

                // Assert
                expect(dispatch).toHaveBeenCalledWith(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateAutofill`, state, { root: true });
            });
        });

        describe('getCustomer ::', () => {
            describe('when phone number is not set', () => {
                beforeEach(() => {
                    state.customer.mobileNumber = '';
                });

                it(`should get the customer details from the backend and call ${UPDATE_PHONE_NUMBER} mutation`, async () => {
                    // Arrange
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept-Tenant': payload.tenant,
                            Authorization: `Bearer ${state.authToken}`
                        },
                        timeout: payload.timeout
                    };

                    axios.get = jest.fn(() => Promise.resolve({ data: customer }));
                    const expectedPhoneNumber = customer.PhoneNumber;

                    // Act
                    await getCustomer({ commit, state, dispatch }, payload);

                    // Assert
                    expect(axios.get).toHaveBeenCalledWith(payload.url, config);
                    expect(commit).toHaveBeenCalledWith(UPDATE_PHONE_NUMBER, expectedPhoneNumber);
                });

                it(`should call '${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateAutofill' mutation with an array of updated field names.`, async () => {
                    // Arrange
                    state.customer.mobileNumber = '';

                    // Act
                    await getCustomer({ commit, state, dispatch }, payload);

                    // Assert
                    expect(dispatch).toHaveBeenCalledWith(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateAutofill`, state, { root: true });
                });
            });

            describe('when phone number is set', () => {
                beforeEach(() => {
                    state.customer.mobileNumber = '07111111111';
                });

                afterEach(() => {
                    state.customer.mobileNumber = '';
                });

                it(`should not get the customer details from the backend and call ${UPDATE_PHONE_NUMBER} mutation`, async () => {
                    // Arrange
                    axios.get = jest.fn(() => Promise.resolve({ data: customer }));

                    // Act
                    await getCustomer({ commit, state, dispatch }, payload);

                    // Assert
                    expect(axios.get).not.toBeCalled();
                    expect(commit).not.toBeCalled();
                });

                it(`should not call '${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateAutofill' mutation with an array of updated field names.`, async () => {
                    // Act
                    await getCustomer({ commit, state, dispatch }, payload);

                    // Assert
                    expect(dispatch).not.toBeCalled();
                });
            });
        });

        describe('placeOrder ::', () => {
            it('should post the order details to the backend.', async () => {
                // Arrange
                payload.url = 'http://localhost/opapi/placeorder';
                payload.data = {
                    basketId,
                    customerNotes: {
                        ...notes
                    },
                    referralState: 'ReferredByWeb'
                };

                orderPlacementApi.placeOrder = jest.fn(() => Promise.resolve({
                    status: 200,
                    data: {
                        issues
                    }
                }));

                // Act
                await placeOrder(context, payload);

                // Assert
                expect(orderPlacementApi.placeOrder).toHaveBeenCalledWith(payload.url, payload.data, payload.timeout, state);
            });

            describe('when the api call is unsuccessful', () => {
                describe('when the there is a response', () => {
                    it('should commit `UPDATE_ERRORS` with a known error when a place order issue is found', async () => {
                        // Arrange
                        // eslint-disable-next-line prefer-promise-reject-errors
                        orderPlacementApi.placeOrder = jest.fn(() => Promise.reject({
                            status: 400,
                            response: {
                                data: {
                                    errorCode: DUPLICATE_ORDER
                                }
                            }
                        }));

                        try {
                            // Act
                            await placeOrder(context, payload);
                        } catch {
                            // Assert
                            expect(commit).toHaveBeenCalledWith(UPDATE_ERRORS, [checkoutErrorMessage]);
                        }
                    });

                    it('should commit `UPDATE_ERRORS` with an empty array when a place order issue is not found', async () => {
                        // Arrange
                        // eslint-disable-next-line prefer-promise-reject-errors
                        orderPlacementApi.placeOrder = jest.fn(() => Promise.reject({
                            status: 400,
                            response: {
                                data: {
                                    errorCode: 'UnknownError'
                                }
                            }
                        }));

                        try {
                            // Act
                            await placeOrder(context, payload);
                        } catch {
                            // Assert
                            expect(commit).toHaveBeenCalledWith(UPDATE_ERRORS, []);
                        }
                    });

                    it('should dispatch `updateCheckoutErrorMessage` with checkoutIssue', async () => {
                        // Arrange
                        // eslint-disable-next-line prefer-promise-reject-errors
                        orderPlacementApi.placeOrder = jest.fn(() => Promise.reject({
                            status: 400,
                            response: {
                                data: {
                                    errorCode: DUPLICATE_ORDER
                                }
                            }
                        }));

                        try {
                            // Act
                            await placeOrder(context, payload);
                        } catch {
                            // Assert
                            expect(dispatch).toHaveBeenCalledWith('updateCheckoutErrorMessage', checkoutErrorMessage);
                        }
                        expect.hasAssertions();
                    });
                });

                it('should throw the error', async () => {
                    // Arrange
                    const errorMessage = 'An error';

                    orderPlacementApi.placeOrder = jest.fn(() => Promise.reject(new Error(errorMessage)));

                    // Act
                    const result = await expect(placeOrder(context, payload));

                    // Assert
                    result.rejects.toThrow(errorMessage);
                });
            });
        });

        describe('updateCheckout ::', () => {
            const issue = {
                messageKey: 'RESTAURANT_NOT_TAKING_ORDERS',
                shouldRedirectToMenu: true,
                errorType: ERROR_TYPES.dialog
            };

            beforeEach(() => {
                payload.data = {
                    mobileNumber
                };

                payload.analyticsService = analyticsService;

                checkoutApi.updateCheckout = jest.fn(() => Promise.resolve({
                    status: 200,
                    data: {
                        isFulfillable: false,
                        issues
                    }
                }));
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should post the checkout details to the backend.', async () => {
                // Arrange
                const request = {
                    url: payload.url,
                    state,
                    rootGetters,
                    data: payload.data,
                    timeout: payload.timeout
                };

                // Act
                await updateCheckout(context, payload);

                // Assert
                expect(checkoutApi.updateCheckout).toHaveBeenCalledWith(request);
            });

            it('should convert an unsupported error into a default error.', async () => {
                // Act
                await updateCheckout(context, payload);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_ERRORS, [{ messageKey: DEFAULT_CHECKOUT_ISSUE, errorType: ERROR_TYPES.dialog }]);
            });

            describe('when a known issue occurs', () => {
                beforeEach(() => {
                    checkoutApi.updateCheckout = jest.fn(() => Promise.resolve({
                        status: 200,
                        data: {
                            isFulfillable: false,
                            issues: [
                                { code: 'RESTAURANT_NOT_TAKING_ORDERS' }
                            ]
                        }
                    }));
                });

                it('should call `updateErrors` with issue.', async () => {
                    // Act
                    await updateCheckout(context, payload);

                    // Assert
                    expect(commit).toHaveBeenCalledWith(UPDATE_ERRORS, [issue]);
                });

                it('should call `updateCheckoutErrorMessage` with first issue.', async () => {
                    // Act
                    await updateCheckout(context, payload);

                    // Assert
                    expect(dispatch).toHaveBeenCalledWith('updateCheckoutErrorMessage', issue);
                });
            });
        });

        describe('createGuestUser ::', () => {
            beforeEach(() => {
                payload.url = 'http://localhost/account/createguest';
                payload.data = {
                    firstName: 'Joe',
                    lastName: 'Bloggs',
                    email: 'joe@test.com'
                };

                payload.otacToAuthExchanger = () => authToken;

                accountApi.createGuestUser = jest.fn(() => Promise.resolve({
                    status: 200,
                    data: {
                        token: 'otacToken',
                        type: 'otac'
                    }
                }));
            });

            it('should post the create guest user request to the backend.', async () => {
                // Act
                await createGuestUser(context, payload);

                // Assert
                expect(accountApi.createGuestUser).toHaveBeenCalledWith(payload.url, payload.data, payload.timeout, payload.tenant);
            });

            it(`should call ${UPDATE_AUTH_GUEST} mutation.`, async () => {
                // Act
                await createGuestUser(context, payload);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_AUTH_GUEST, authToken);
            });
        });

        describe('getAvailableFulfilment ::', () => {
            beforeEach(() => {
                checkoutApi.getAvailableFulfilment = jest.fn(() => Promise.resolve({ data: checkoutAvailableFulfilment }));
            });

            it(`should get the checkout available fulfilment details from the backend and call ${UPDATE_AVAILABLE_FULFILMENT_TIMES} mutation.`, async () => {
                // Act
                await getAvailableFulfilment(context, payload);

                // Assert
                expect(checkoutApi.getAvailableFulfilment).toHaveBeenCalledWith(payload.url, payload.timeout);
                expect(commit).toHaveBeenCalledWith(UPDATE_AVAILABLE_FULFILMENT_TIMES, checkoutAvailableFulfilment);
            });
        });

        describe('updateFulfilmentTime ::', () => {
            it(`should call ${UPDATE_FULFILMENT_TIME} mutation.`, () => {
                // Act
                updateFulfilmentTime(context, time);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_FULFILMENT_TIME, time);
            });
        });

        describe('getGeoLocation ::', () => {
            beforeEach(() => {
                payload.postData = locationData;

                addressGeocodingApi.getGeoLocation = jest.fn(() => Promise.resolve({
                    status: 200,
                    data: geoLocationDetails
                }));
            });

            describe('if the auth token is set', () => {
                beforeEach(() => {
                    state.authToken = authToken;
                });

                it(`should get the geo location details from the backend and call ${UPDATE_GEO_LOCATION} mutation.`, async () => {
                    // Act
                    await getGeoLocation(context, payload);

                    // Assert
                    expect(addressGeocodingApi.getGeoLocation).toHaveBeenCalledWith(payload.url, locationData, payload.timeout, state);
                    expect(commit).toHaveBeenCalledWith(UPDATE_GEO_LOCATION, geoLocationDetails.geometry.coordinates);
                });
            });

            describe('if the auth token is not set', () => {
                beforeEach(() => {
                    state.authToken = null;
                });

                it('should not make api call and should not call mutation.', async () => {
                    // Act
                    await getGeoLocation(context, payload);

                    // Assert
                    expect(addressGeocodingApi.getGeoLocation).not.toHaveBeenCalled();
                    expect(commit).not.toHaveBeenCalled();
                });
            });

            describe('if the address is in local storage', () => {
                const storedAddress = {
                    Line1: 'Flat 101',
                    Line2: 'Made Up House',
                    Line3: 'Camden Town',
                    Line4: '',
                    Line5: '',
                    City: 'London',
                    Field1: '51.529747',
                    Field2: '-0.142396',
                    PostalCode: 'NW1 4DE',
                    searchBoxAddress: 'NW1 4DE'
                };

                beforeEach(() => {
                    state.authToken = authToken;

                    Object.defineProperty(window, 'localStorage', { value: storageMock });
                    window.localStorage.setItem('je-full-address-details', JSON.stringify(storedAddress));
                });

                afterEach(() => {
                    window.localStorage.clear();
                    jest.resetAllMocks();
                });

                it('should not make api call and should call the mutation with the stored coordinates if the form values match local storage', async () => {
                    // Arrange
                    const newState = {
                        ...state,
                        address: {
                            line1: 'Flat 101',
                            line2: 'Made Up House',
                            locality: 'London',
                            postcode: 'NW1 4DE'
                        }
                    };

                    // Act
                    await getGeoLocation({ ...context, state: newState }, payload);

                    // Assert
                    expect(addressGeocodingApi.getGeoLocation).not.toHaveBeenCalled();
                    expect(commit).toHaveBeenCalledWith(UPDATE_GEO_LOCATION, [storedAddress.Field2, storedAddress.Field1]);
                });

                it(`should get the geo location details from the backend and call ${UPDATE_GEO_LOCATION} mutation if the form address does not match local storage`, async () => {
                    // Arrange
                    const newState = {
                        ...state,
                        address: {
                            line1: 'Flat 101',
                            line2: 'Made Up House',
                            locality: 'London',
                            postcode: 'NW2 3PE'
                        }
                    };

                    // Act
                    await getGeoLocation({ ...context, state: newState }, payload);

                    // Assert
                    expect(commit).toHaveBeenCalledWith(UPDATE_GEO_LOCATION, geoLocationDetails.geometry.coordinates);
                });

                it(`should get the geo location details from the backend and call ${UPDATE_GEO_LOCATION} mutation if local storage has no stored coordinates`, async () => {
                    // Arrange
                    const newState = {
                        ...state,
                        address: {
                            line1: 'Flat 101',
                            line2: 'Made Up House',
                            locality: 'London',
                            postcode: 'NW2 3PE'
                        }
                    };

                    window.localStorage.setItem('je-full-address-details', JSON.stringify({ ...storedAddress, Field1: null, Field2: null }));

                    // Act
                    await getGeoLocation({ ...context, state: newState }, payload);

                    // Assert
                    expect(commit).toHaveBeenCalledWith(UPDATE_GEO_LOCATION, geoLocationDetails.geometry.coordinates);
                });

                describe('When the address in localStorage does not match the address `state`', () => {
                    it('should update localStorage to the changed address', async () => {
                        // Arrange
                        const setItemSpy = jest.spyOn(window.localStorage, 'setItem');
                        jest.spyOn(addressService, 'doesAddressInStorageAndFormMatch').mockImplementation(() => false);

                        // Act
                        await getGeoLocation(context, payload);

                        // Assert
                        expect(setItemSpy).toHaveBeenCalledWith(
                            'je-full-address-details',
                            '{"PostalCode":"postcode","Line1":"line 1","Line2":"line 2","City":"locality"}'
                        );
                    });
                });
            });
        });

        describe('updateDateOfBirth :: ', () => {
            it('should call `UPDATE_DATE_OF_BIRTH` and `CLEAR_DOB_ERROR`.', () => {
                // Act
                updateDateOfBirth(context, dateOfBirth);

                // Assert
                expect(commit).toHaveBeenCalledWith('UPDATE_DATE_OF_BIRTH', dateOfBirth);
                expect(commit).toHaveBeenCalledWith('CLEAR_DOB_ERROR', {});
            });
        });

        describe('updateUserDetails :: ', () => {
            const userDetails = {
                fieldType: 'customer',
                fieldName: 'firstName',
                value: 'John'
            };

            it.each([
                [UPDATE_CUSTOMER_DETAILS, 'customer'],
                [UPDATE_ADDRESS_DETAILS, 'address'],
                [UPDATE_DINEIN_DETAILS, 'dineIn']
            ])('should commit %s with expected payload when `fieldType` is %s', (mutation, fieldType) => {
                // Arrange
                userDetails.fieldType = fieldType;
                const expectedData = { [userDetails.fieldName]: userDetails.value };

                // Act
                updateUserDetails(context, userDetails);

                // Assert
                expect(commit).toHaveBeenCalledWith(mutation, expectedData);
            });

            it(`should dispatch '${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateChangedFields' payload 'fieldName'`, () => {
                // Act
                updateUserDetails(context, userDetails);

                // Assert
                expect(dispatch).toHaveBeenCalledWith(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateChangedField`, userDetails.fieldName, { root: true });
            });
        });


        it.each([
            [setAuthToken, UPDATE_AUTH, authToken],
            [updateCheckoutErrorMessage, UPDATE_CHECKOUT_ERROR_MESSAGE, checkoutErrorMessage]
        ])('%s should call %s mutation with passed value', (action, mutation, value) => {
            // Act
            action(context, value);

            // Assert
            expect(commit).toHaveBeenCalledWith(mutation, value);
        });
    });

    describe('getters ::', () => {
        describe('formattedNotes ::', () => {
            describe('when split notes is enabled', () => {
                // Arrange
                const splitNotesEnabledState = {
                    ...state,
                    features: {
                        isSplitNotesEnabled: true
                    },
                    notesConfiguration: {
                        ...splitNotesConfig,
                        isSplitNotesEnabled: true
                    },
                    notes: { courier: { note: 'Please do not knock' }, kitchen: { note: 'No ketchup please' } }
                };

                it('should return the formattedNotes as they are stored in state', () => {
                    // Act
                    const result = getters.formattedNotes(splitNotesEnabledState, getters);

                    // Assert
                    expect(result).toEqual(splitNotesEnabledState.notes);
                });
            });

            describe('when split notes is disabled', () => {
                // Arrange
                const splitNotesDisabledState = {
                    ...state,
                    features: {
                        isSplitNotesEnabled: false
                    },
                    notesConfiguration: {
                        isSplitNotesEnabled: false
                    },
                    notes: { order: { note: 'Please do not knock' } }
                };

                it('should return the formattedNotes as they are stored in state', () => {
                    const expectedResult = [{ type: 'delivery', note: splitNotesDisabledState.notes.order.note }];

                    // Act
                    const result = getters.formattedNotes(splitNotesDisabledState, getters);

                    // Assert
                    expect(result).toEqual(expectedResult);
                });
            });
        });

        describe('kitchenNoteAccepted ::', () => {
            describe('when kitchen note accepted is returned `true` from the API', () => {
                // Arrange
                const kitchenNotesState = {
                    ...state,
                    serviceType: 'delivery',
                    notesConfiguration: {
                        delivery: {
                            kitchenNoteAccepted: true
                        }
                    }
                };

                it('should return true', () => {
                    // Act
                    const result = getters.kitchenNoteAccepted(kitchenNotesState);

                    // Assert
                    expect(result).toEqual(true);
                });
            });

            describe('when kitchen note accepted is returned `false` from the API', () => {
                // Arrange
                const kitchenNotesState = {
                    ...state,
                    serviceType: 'delivery',
                    notesConfiguration: {
                        delivery: {
                            kitchenNoteAccepted: false
                        }
                    }
                };

                it('should return false', () => {
                    // Act
                    const result = getters.kitchenNoteAccepted(kitchenNotesState);

                    // Assert
                    expect(result).toEqual(false);
                });
            });
        });

        describe('noteTypeCourierOrOrder ::', () => {
            describe('when courier note accepted is returned `true` from the API', () => {
                // Arrange
                const courierNotesState = {
                    ...state,
                    serviceType: 'delivery',
                    notesConfiguration: {
                        delivery: {
                            courierNoteAccepted: true
                        }
                    }
                };

                it(`should return ${CHECKOUT_NOTE_TYPE_COURIER}`, () => {
                    // Act
                    const result = getters.noteTypeCourierOrOrder(courierNotesState);

                    // Assert
                    expect(result).toEqual(CHECKOUT_NOTE_TYPE_COURIER);
                });
            });

            describe('when courier note accepted is returned `false` from the API', () => {
                // Arrange
                const courierNotesState = {
                    ...state,
                    serviceType: 'delivery',
                    notesConfiguration: {
                        delivery: {
                            courierNoteAccepted: false
                        }
                    }
                };

                it(`should return ${CHECKOUT_NOTE_TYPE_ORDER}`, () => {
                    // Act
                    const result = getters.noteTypeCourierOrOrder(courierNotesState);

                    // Assert
                    expect(result).toEqual(CHECKOUT_NOTE_TYPE_ORDER);
                });
            });
        });

        describe('noteValue ::', () => {
            describe('when courierNote is accepted', () => {
                // Arrange
                const notesState = {
                    ...state,
                    serviceType: 'delivery',
                    notesConfiguration: {
                        delivery: {
                            courierNoteAccepted: true
                        }
                    },
                    notes: { courier: { note: 'This is a courier note' }, order: { note: 'This is an order note' } }
                };

                it(`should return ${notesState.notes.courier.note}`, () => {
                    // Act
                    const result = getters.noteValue(notesState);

                    // Assert
                    expect(result).toEqual(notesState.notes.courier.note);
                });
            });

            describe('when courierNote is not accepted', () => {
                // Arrange
                const notesState = {
                    ...state,
                    serviceType: 'delivery',
                    notesConfiguration: {
                        delivery: {
                            courierNoteAccepted: false
                        }
                    },
                    notes: { courier: { note: 'This is a courier note' }, order: { note: 'This is an order note' } }
                };

                it(`should return ${notesState.notes.order.note}`, () => {
                    // Act
                    const result = getters.noteValue(notesState);

                    // Assert
                    expect(result).toEqual(notesState.notes.order.note);
                });
            });
        });

        describe('kitchenNoteValue ::', () => {
            it('should return the value of the kitchen note', () => {
                // Arrange
                const notesState = {
                    ...state,
                    notes: { kitchen: { note: 'This is a kitchen note' } }
                };
                    // Act
                const result = getters.kitchenNoteValue(notesState);

                // Assert
                expect(result).toEqual(notesState.notes.kitchen.note);
            });
        });
    });
});
