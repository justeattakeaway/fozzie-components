import axios from 'axios';
import CheckoutModule from '../checkout.module';
import checkoutDelivery from '../../demo/checkout-delivery.json';
import basketDelivery from '../../demo/get-basket-delivery.json';
import checkoutAvailableFulfilment from '../../demo/checkout-available-fulfilment.json';
import customerAddresses from '../../demo/get-address.json';
import geoLocationDetails from '../../demo/get-geo-location.json';
import { mockAuthToken } from '../../components/_tests/helpers/setup';
import { version as applicationVerion } from '../../../package.json';
import { VUEX_CHECKOUT_ANALYTICS_MODULE, DEFAULT_CHECKOUT_ISSUE } from '../../constants';

import {
    UPDATE_AUTH,
    UPDATE_AVAILABLE_FULFILMENT_TIMES,
    UPDATE_BASKET_DETAILS,
    UPDATE_CUSTOMER_DETAILS,
    UPDATE_ERRORS,
    UPDATE_FULFILMENT_ADDRESS,
    UPDATE_FULFILMENT_TIME,
    UPDATE_IS_FULFILLABLE,
    UPDATE_STATE,
    UPDATE_USER_NOTE,
    UPDATE_GEO_LOCATION
} from '../mutation-types';

const { actions, mutations } = CheckoutModule;

const {
    createGuestUser,
    getAddress,
    getAvailableFulfilment,
    getBasket,
    getCheckout,
    getCustomerName,
    getGeoLocation,
    placeOrder,
    setAuthToken,
    updateCheckout,
    updateAddressDetails,
    updateCustomerDetails,
    updateFulfilmentTime,
    updateUserNote
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

const defaultState = {
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
    userNote: '',
    geolocation: null,
    hasAsapSelected: false
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
                checkoutDelivery.location = null;

                // Act
                mutations[UPDATE_STATE](state, checkoutDelivery);

                // Assert
                expect(state.address).toEqual(defaultState.address);
            });

            it('should leave address state empty if location data is returned with no address from the API.', () => {
                // Arrange
                checkoutDelivery.location = {
                    address: null
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

        it.each([
            [UPDATE_FULFILMENT_ADDRESS, 'address', address],
            [UPDATE_FULFILMENT_TIME, 'time', time],
            [UPDATE_IS_FULFILLABLE, 'isFulfillable', isFulfillable],
            [UPDATE_ERRORS, 'errors', issues],
            [UPDATE_USER_NOTE, 'userNote', userNote]
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

        beforeEach(() => {
            commit = jest.fn();
            dispatch = jest.fn();
            state = defaultState;
            payload = {
                url: 'http://localhost/account/checkout',
                tenant: 'uk',
                language: 'en-GB',
                timeout: 1000,
                postData: null
            };
        });

        describe('getCheckout ::', () => {
            let config;

            beforeEach(() => {
                config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${state.authToken}`
                    },
                    timeout: payload.timeout
                };

                axios.get = jest.fn(() => Promise.resolve({ data: checkoutDelivery }));
            });

            it(`should get the checkout details from the backend and call ${UPDATE_STATE} mutation.`, async () => {
                // Act
                await getCheckout({ commit, state, dispatch }, payload);

                // Assert
                expect(axios.get).toHaveBeenCalledWith(payload.url, config);
                expect(commit).toHaveBeenCalledWith(UPDATE_STATE, checkoutDelivery);
            });

            it(`should call '${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateAutofill' mutation with an array of updated field names.`, async () => {
                // Act
                await getCheckout({ commit, state, dispatch }, payload);

                // Assert
                expect(dispatch).toHaveBeenCalledWith(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateAutofill`, state, { root: true });
            });
        });

        describe('getBasket ::', () => {
            it(`should get the basket details from the backend and call ${UPDATE_BASKET_DETAILS} mutation.`, async () => {
                // Arrange
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept-Tenant': payload.tenant,
                        'Accept-Language': payload.language
                    },
                    timeout: payload.timeout
                };

                axios.get = jest.fn(() => Promise.resolve({ data: basketDelivery }));

                // Act
                await getBasket({ commit, state, dispatch }, payload);

                // Assert
                expect(axios.get).toHaveBeenCalledWith(payload.url, config);
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

                axios.get = jest.fn(() => Promise.resolve({ data: customerAddresses }));
                const [expectedAddress] = customerAddresses.Addresses;

                // Act
                await getAddress({ commit, state, dispatch }, payload);

                // Assert
                expect(axios.get).toHaveBeenCalledWith(payload.url, config);
                expect(commit).toHaveBeenCalledWith(UPDATE_FULFILMENT_ADDRESS, {
                    line1: expectedAddress.Line1,
                    line2: expectedAddress.Line2,
                    locality: expectedAddress.City,
                    postcode: expectedAddress.ZipCode
                });
            });

            it(`should call '${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateAutofill' mutation with an array of updated field names.`, async () => {
                // Act
                await getAddress({ commit, state, dispatch }, payload);

                // Assert
                expect(dispatch).toHaveBeenCalledWith(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateAutofill`, state, { root: true });
            });
        });

        describe('getCustomerName ::', () => {
            it('should get the customer first name and last name from token', async () => {
                // Arrange
                const expectedCustomerDetails = {
                    firstName: 'Joe',
                    lastName: 'Bloggs'
                };

                // Act
                await getCustomerName({ commit, state });

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_CUSTOMER_DETAILS, expectedCustomerDetails);
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

                const config = {
                    headers: {
                        'Content-Type': 'application/json;v=2',
                        'x-je-application-id': 7,
                        'x-je-application-version': applicationVerion,
                        Authorization: `Bearer ${authToken}`
                    },
                    timeout: payload.timeout
                };

                axios.post = jest.fn(() => Promise.resolve({
                    status: 200,
                    data: {
                        issues
                    }
                }));

                // Act
                await placeOrder({ commit, state }, payload);

                // Assert
                expect(axios.post).toHaveBeenCalledWith(payload.url, payload.data, config);
            });
        });

        describe('updateCheckout ::', () => {
            let config;

            beforeEach(() => {
                payload.data = {
                    mobileNumber
                };

                config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`
                    },
                    timeout: payload.timeout
                };
                axios.patch = jest.fn(() => Promise.resolve({
                    status: 200,
                    data: {
                        isFulfillable: false,
                        issues
                    }
                }));
            });

            it('should post the checkout details to the backend.', async () => {
                // Act
                await updateCheckout({ commit, state }, payload);

                // Assert
                expect(axios.patch).toHaveBeenCalledWith(payload.url, payload.data, config);
            });

            it('should convert an unsupported error into a default error.', async () => {
                // Act
                await updateCheckout({ commit, state }, payload);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_ERRORS, [{ code: DEFAULT_CHECKOUT_ISSUE, shouldShowInDialog: true }]);
            });
        });

        describe('createGuestUser ::', () => {
            let config;

            beforeEach(() => {
                payload.url = 'http://localhost/account/createguest';
                payload.data = {
                    firstName: 'Joe',
                    lastName: 'Bloggs',
                    email: 'joe@test.com'
                };

                config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept-Tenant': payload.tenant
                    },
                    timeout: payload.timeout
                };

                axios.post = jest.fn(() => Promise.resolve({
                    status: 200,
                    data: {
                        token: 'otacToken',
                        type: 'otac'
                    }
                }));
            });

            it('should post the create guest user request to the backend.', async () => {
                // Act
                await createGuestUser({ commit, state }, payload);

                // Assert
                expect(axios.post).toHaveBeenCalledWith(payload.url, payload.data, config);
            });
        });

        describe('getAvailableFulfilment ::', () => {
            let config;

            beforeEach(() => {
                config = {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: payload.timeout
                };

                axios.get = jest.fn(() => Promise.resolve({ data: checkoutAvailableFulfilment }));
            });

            it(`should get the checkout available fulfilment details from the backend and call ${UPDATE_AVAILABLE_FULFILMENT_TIMES} mutation.`, async () => {
                // Act
                await getAvailableFulfilment({ commit }, payload);

                // Assert
                expect(axios.get).toHaveBeenCalledWith(payload.url, config);
                expect(commit).toHaveBeenCalledWith(UPDATE_AVAILABLE_FULFILMENT_TIMES, checkoutAvailableFulfilment);
            });
        });

        describe('updateFulfilmentTime ::', () => {
            it(`should call ${UPDATE_FULFILMENT_TIME} mutation.`, () => {
                // Act
                updateFulfilmentTime({ commit, state }, time);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_FULFILMENT_TIME, time);
            });
        });

        describe('getGeoLocation ::', () => {
            // Arrange
            let config;

            beforeEach(() => {
                payload.postData = locationData;

                config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`
                    },
                    timeout: payload.timeout
                };

                axios.post = jest.fn(() => Promise.resolve({
                    status: 200,
                    data: geoLocationDetails
                }));
            });

            describe('if the user is logged in', () => {
                beforeEach(() => {
                    state.isLoggedIn = true;
                });

                it(`should get the geo location details from the backend and call ${UPDATE_GEO_LOCATION} mutation.`, async () => {
                    // Act
                    await getGeoLocation({ commit, state }, payload);

                    // Assert
                    expect(axios.post).toHaveBeenCalledWith(payload.url, locationData, config);
                    expect(commit).toHaveBeenCalledWith(UPDATE_GEO_LOCATION, geoLocationDetails.geometry.coordinates);
                });
            });

            describe('if the user is not logged in', () => {
                beforeEach(() => {
                    state.isLoggedIn = false;
                });

                it('should not make api call and should not call mutation.', async () => {
                    // Act
                    await getGeoLocation({ commit, state }, payload);

                    // Assert
                    expect(axios.post).not.toHaveBeenCalled();
                    expect(commit).not.toHaveBeenCalled();
                });
            });
        });

        it.each([
            [setAuthToken, UPDATE_AUTH, authToken],
            [updateAddressDetails, UPDATE_FULFILMENT_ADDRESS, address],
            [updateCustomerDetails, UPDATE_CUSTOMER_DETAILS, customerDetails],
            [updateUserNote, UPDATE_USER_NOTE, userNote]
        ])('%s should call %s mutation with passed value', (action, mutation, value) => {
            // Act
            action({ commit, dispatch }, value);

            // Assert
            expect(commit).toHaveBeenCalledWith(mutation, value);
        });

        it.each([
            [updateAddressDetails, address],
            [updateCustomerDetails, customerDetails]
        ])(`%s should dispatch '${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateChangedFields' action with first key of passed value`, (action, value) => {
            // Act
            action({ commit, dispatch }, value);

            const [field] = Object.keys(value);

            // Assert
            expect(dispatch).toHaveBeenCalledWith(`${VUEX_CHECKOUT_ANALYTICS_MODULE}/updateChangedField`, field, { root: true });
        });
    });
});
