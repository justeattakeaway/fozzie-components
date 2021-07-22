import axios from 'axios';
import CheckoutModule from '../checkout.module';
import checkoutDelivery from '../../demo/checkout-delivery.json';
import basketDelivery from '../../demo/get-basket-delivery.json';
import checkoutAvailableFulfilment from '../../demo/checkout-available-fulfilment.json';
import customerAddresses from '../../demo/get-address.json';
import geoLocationDetails from '../../demo/get-geo-location.json';
import customer from '../../demo/get-customer.json';
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
// import { version as applicationVerion } from '../../../package.json';
import { VUEX_CHECKOUT_ANALYTICS_MODULE, DEFAULT_CHECKOUT_ISSUE } from '../../constants';

import {
    UPDATE_AUTH,
    UPDATE_AUTH_GUEST,
    UPDATE_AVAILABLE_FULFILMENT_TIMES,
    UPDATE_BASKET_DETAILS,
    UPDATE_CUSTOMER_DETAILS,
    UPDATE_ERRORS,
    UPDATE_FULFILMENT_ADDRESS,
    UPDATE_FULFILMENT_TIME,
    UPDATE_HAS_ASAP_SELECTED,
    UPDATE_IS_FULFILLABLE,
    UPDATE_STATE,
    UPDATE_USER_NOTES,
    UPDATE_GEO_LOCATION,
    UPDATE_MESSAGE,
    UPDATE_ADDRESS,
    UPDATE_PHONE_NUMBER
} from '../mutation-types';

const { actions, mutations } = CheckoutModule;

const {
    createGuestUser,
    getAddress,
    getAvailableFulfilment,
    getBasket,
    getCheckout,
    getCustomer,
    getGeoLocation,
    placeOrder,
    setAuthToken,
    updateCheckout,
    updateAddressDetails,
    updateCustomerDetails,
    updateFulfilmentTime,
    updateMessage,
    getUserNote,
    saveUserNote
} = actions;

const mobileNumber = '+447111111111';

const customerDetails = {
    mobileNumber
};

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

const userNote = 'Beware of the dachshund';
const message = {
    code: 'DuplicateOrder',
    shouldRedirectToMenu: false,
    shouldShowInDialog: true
};

const defaultState = {
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
    isFulfillable: true,
    errors: [],
    notices: [],
    message: null,
    messages: [],
    availableFulfilment: {
        times: [],
        isAsapAvailable: false
    },
    authToken: '',
    isLoggedIn: false,
    isGuestCreated: false,
    userNotes: {},
    geolocation: null,
    hasAsapSelected: false,
    noteTypes: []
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

        describe(`${UPDATE_USER_NOTES} ::`, () => {
            it('should update the state with the new note values', () => {
                const noteData = { type: 'restaurant', note: 'This is the new note value' };

                // Act
                mutations[UPDATE_USER_NOTES](state, noteData);

                // Assert
                expect(state.userNotes).toEqual({
                    [noteData.type]: noteData.note
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

        it.each([
            [UPDATE_FULFILMENT_ADDRESS, 'address', address],
            [UPDATE_FULFILMENT_TIME, 'time', time],
            [UPDATE_IS_FULFILLABLE, 'isFulfillable', isFulfillable],
            [UPDATE_ERRORS, 'errors', issues],
            [UPDATE_MESSAGE, 'message', message]
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
                    }
                });
            });
        });

        describe('getAddress ::', () => {
            it(`should get the address details from the backend and call ${UPDATE_FULFILMENT_ADDRESS} mutation.`, async () => {
                // Arrange
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept-Language': payload.language,
                        Authorization: `Bearer ${state.authToken}`
                    },
                    timeout: payload.timeout
                };
                const [expectedAddress] = customerAddresses.Addresses;
                const expectedFormattedAddress = {
                    line1: expectedAddress.Line1,
                    line2: expectedAddress.Line2,
                    locality: expectedAddress.City,
                    postcode: expectedAddress.ZipCode
                };
                const addressServiceSpy = jest.spyOn(addressService, 'getClosestAddress').mockReturnValue(expectedFormattedAddress);
                axios.get = jest.fn(() => Promise.resolve({ data: customerAddresses }));

                // Act
                await getAddress(context, payload);

                // Assert
                expect(addressServiceSpy).toHaveBeenCalledWith(customerAddresses.Addresses, payload.tenant, payload.currentPostcode);
                expect(axios.get).toHaveBeenCalledWith(payload.url, config);
                expect(commit).toHaveBeenCalledWith(UPDATE_FULFILMENT_ADDRESS, expectedFormattedAddress);
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
                        noteForRestaurant: userNote
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
                                    errorCode: 'DuplicateOrder'
                                }
                            }
                        }));

                        try {
                            // Act
                            await placeOrder(context, payload);
                        } catch {
                            // Assert
                            expect(commit).toHaveBeenCalledWith(UPDATE_ERRORS, [message]);
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

                    it('should dispatch `updateMessage` with checkoutIssue', async () => {
                        // Arrange
                        // eslint-disable-next-line prefer-promise-reject-errors
                        orderPlacementApi.placeOrder = jest.fn(() => Promise.reject({
                            status: 400,
                            response: {
                                data: {
                                    errorCode: 'DuplicateOrder'
                                }
                            }
                        }));

                        try {
                            // Act
                            await placeOrder(context, payload);
                        } catch {
                            // Assert
                            expect(dispatch).toHaveBeenCalledWith('updateMessage', message);
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
                code: 'RESTAURANT_NOT_TAKING_ORDERS',
                shouldShowInDialog: true,
                shouldRedirectToMenu: false
            };

            beforeEach(() => {
                payload.data = {
                    mobileNumber
                };

                checkoutApi.updateCheckout = jest.fn(() => Promise.resolve({
                    status: 200,
                    data: {
                        isFulfillable: false,
                        issues
                    }
                }));
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
                expect(commit).toHaveBeenCalledWith(UPDATE_ERRORS, [{ code: DEFAULT_CHECKOUT_ISSUE, shouldShowInDialog: true }]);
            });

            describe('when a known issue occurs', () => {
                beforeEach(() => {
                    checkoutApi.updateCheckout = jest.fn(() => Promise.resolve({
                        status: 200,
                        data: {
                            isFulfillable: false,
                            issues: [{ code: issue.code }]
                        }
                    }));
                });

                it('should call `updateErrors` with issue.', async () => {
                    // Act
                    await updateCheckout(context, payload);

                    // Assert
                    expect(commit).toHaveBeenCalledWith(UPDATE_ERRORS, [issue]);
                });

                it('should call `updateMessage` with first issue.', async () => {
                    // Act
                    await updateCheckout(context, payload);

                    // Assert
                    expect(dispatch).toHaveBeenCalledWith('updateMessage', issue);
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

        it.each([
            [setAuthToken, UPDATE_AUTH, authToken],
            [updateAddressDetails, UPDATE_FULFILMENT_ADDRESS, address],
            [updateMessage, UPDATE_MESSAGE, message]
        ])('%s should call %s mutation with passed value', (action, mutation, value) => {
            // Act
            action(context, value);

            // Assert
            expect(commit).toHaveBeenCalledWith(mutation, value);
        });

        it.each([
            [updateAddressDetails, address],
            [updateCustomerDetails, customerDetails]
        ])(`%s should dispatch '${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateChangedFields' action with first key of passed value`, (action, value) => {
            // Act
            action(context, value);

            const [field] = Object.keys(value);

            // Assert
            expect(dispatch).toHaveBeenCalledWith(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateChangedField`, field, { root: true });
        });

        describe('getUserNote ::', () => {
            describe('if sessionStorage exists', () => {
                beforeEach(() => {
                    Object.defineProperty(window, 'sessionStorage', { value: storageMock });
                });

                afterEach(() => {
                    window.sessionStorage.clear();
                    jest.resetAllMocks();
                });

                describe('when the user note exists in session storage', () => {
                    it('should call dispatch with updateUserNote action and the user note', () => {
                        // Arrange
                        jest.spyOn(window.sessionStorage, 'getItem').mockReturnValue(userNote);

                        // Act
                        getUserNote(context);

                        // Assert
                        expect(dispatch).toHaveBeenCalledWith('updateUserNote', { type: 'delivery', note: userNote });
                    });
                });

                describe('when the user note does NOT exist in session storage', () => {
                    it('should not call dispatch', () => {
                        // Arrange
                        jest.spyOn(window.sessionStorage, 'getItem').mockReturnValue(undefined);

                        // Act
                        getUserNote(context);

                        // Assert
                        expect(dispatch).not.toHaveBeenCalled();
                    });
                });
            });

            describe('if sessionStorage does NOT exist', () => {
                beforeAll(() => {
                    Object.defineProperty(window, 'sessionStorage', { value: null });
                });

                afterAll(() => {
                    window.sessionStorage.clear();
                    jest.resetAllMocks();
                });

                it('should not call dispatch', () => {
                    // Act
                    getUserNote(context);

                    // Assert
                    expect(dispatch).not.toHaveBeenCalled();
                });
            });
        });

        describe('saveUserNote ::', () => {
            beforeEach(() => {
                Object.defineProperty(window, 'sessionStorage', { value: storageMock });
            });

            afterEach(() => {
                window.sessionStorage.clear();
                jest.resetAllMocks();
            });


            it('should save userNote to sessionStorage', () => {
                // Arrange
                const spy = jest.spyOn(window.sessionStorage, 'setItem');
                const testBasketId = '11111';
                const key = `userNote-${testBasketId}`;

                // Act
                saveUserNote(context);

                // Assert
                expect(spy).toHaveBeenCalledWith(key, state.userNote);
            });
        });
    });
});
