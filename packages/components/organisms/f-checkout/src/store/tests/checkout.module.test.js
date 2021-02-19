import axios from 'axios';
import CheckoutModule from '../checkout.module';
import checkoutDelivery from '../../demo/checkout-delivery.json';
import basketDelivery from '../../demo/get-basket-delivery.json';
import checkoutAvailableFulfilment from '../../demo/checkout-available-fulfilment.json';
import customerAddresses from '../../demo/get-address.json';

import {
    UPDATE_AUTH,
    UPDATE_AVAILABLE_FULFILMENT_TIMES,
    UPDATE_BASKET_DETAILS,
    UPDATE_CUSTOMER_DETAILS,
    UPDATE_FULFILMENT_ADDRESS,
    UPDATE_FULFILMENT_TIME,
    UPDATE_IS_FULFILLABLE,
    UPDATE_ISSUES,
    UPDATE_STATE,
    UPDATE_USER_NOTE
} from '../mutation-types';

const { actions, mutations } = CheckoutModule;

const {
    createGuestUser,
    getAddress,
    getAvailableFulfilment,
    getBasket,
    getCheckout,
    updateCheckout,
    setAuthToken,
    updateAddressDetails,
    updateCustomerDetails,
    updateFulfilmentTime,
    updateUserNote
} = actions;

const mobileNumber = '+447111111111';

const customerDetails = {
    mobileNumber
};

const authToken = 'sampleToken';

const address = {
    line1: 'line 1',
    line2: 'line 2',
    city: 'city',
    postcode: 'postcode'
};

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
    restaurantId: '',
    basketTotal: 0,
    customer: {
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: ''
    },
    time: {
        from: '',
        to: ''
    },
    address: {
        line1: '',
        line2: '',
        city: '',
        postcode: ''
    },
    isFulfillable: true,
    issues: [],
    notices: [],
    messages: [],
    availableFulfilment: {
        times: [],
        isAsapAvailable: false
    },
    authToken: '',
    isLoggedIn: false,
    userNote: ''
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

            it('should leave address state empty if no address data is returned from the API.', () => {
                // Arrange
                checkoutDelivery.address = null;

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

        it.each([
            [UPDATE_FULFILMENT_ADDRESS, 'address', address],
            [UPDATE_FULFILMENT_TIME, 'time', time],
            [UPDATE_IS_FULFILLABLE, 'isFulfillable', isFulfillable],
            [UPDATE_ISSUES, 'issues', issues],
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

        const payload = {
            url: 'http://localhost/account/checkout',
            tenant: 'uk',
            language: 'en-GB',
            timeout: '1000'
        };

        beforeEach(() => {
            commit = jest.fn();
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
                await getCheckout({ commit, state }, payload);

                // Assert
                expect(axios.get).toHaveBeenCalledWith(payload.url, config);
                expect(commit).toHaveBeenCalledWith(UPDATE_STATE, checkoutDelivery);
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
                await getBasket({ commit, state }, payload);

                // Assert
                expect(axios.get).toHaveBeenCalledWith(payload.url, config);
                expect(commit).toHaveBeenCalledWith(UPDATE_BASKET_DETAILS, {
                    serviceType: basketDelivery.ServiceType.toLowerCase(),
                    restaurantId: basketDelivery.RestaurantId,
                    basketTotal: basketDelivery.BasketSummary.BasketTotals.Total
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
                await getAddress({ commit, state }, payload);

                // Assert
                expect(axios.get).toHaveBeenCalledWith(payload.url, config);
                expect(commit).toHaveBeenCalledWith(UPDATE_FULFILMENT_ADDRESS, {
                    line1: expectedAddress.Line1,
                    line2: expectedAddress.Line2,
                    city: expectedAddress.City,
                    postcode: expectedAddress.ZipCode
                });
            });
        });

        describe('updateCheckout ::', () => {
            payload.data = {
                mobileNumber
            };

            let config;

            beforeEach(() => {
                config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`
                    },
                    timeout: payload.timeout
                };
                axios.patch = jest.fn(() => Promise.resolve({
                    status: 200,
                    data: {}
                }));
            });

            it('should post the checkout details to the backend.', async () => {
                // Act
                await updateCheckout({ commit, state }, payload);

                // Assert
                expect(axios.patch).toHaveBeenCalledWith(payload.url, payload.data, config);
            });
        });

        describe('createGuestUser ::', () => {
            let config;
            payload.url = 'http://localhost/account/createguest';
            payload.data = {
                firstName: 'Joe',
                lastName: 'Bloggs',
                email: 'joe@test.com'
            };

            beforeEach(() => {
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


        it.each([
            [setAuthToken, UPDATE_AUTH, authToken],
            [updateAddressDetails, UPDATE_FULFILMENT_ADDRESS, address],
            [updateCustomerDetails, UPDATE_CUSTOMER_DETAILS, customerDetails],
            [updateFulfilmentTime, UPDATE_FULFILMENT_TIME, time],
            [updateUserNote, UPDATE_USER_NOTE, userNote]
        ])('%s should call %s mutation with passed value', (action, mutation, value) => {
            // Act
            action({ commit }, value);

            // Assert
            expect(commit).toHaveBeenCalledWith(mutation, value);
        });
    });
});
