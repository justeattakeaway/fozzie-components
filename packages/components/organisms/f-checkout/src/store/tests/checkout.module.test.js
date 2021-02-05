import axios from 'axios';
import CheckoutModule from '../checkout.module';
import checkoutDelivery from '../../demo/checkout-delivery.json';
import basketDelivery from '../../demo/get-basket-delivery.json';
import checkoutAvailableFulfilment from '../../demo/checkout-available-fulfilment.json';

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
    getAvailableFulfilment,
    getBasket,
    getCheckout,
    patchCheckout,
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

        describe(`${UPDATE_FULFILMENT_ADDRESS} ::`, () => {
            it('should update state with received value', () => {
                // Arrange & Act
                mutations[UPDATE_FULFILMENT_ADDRESS](state, address);

                // Assert
                expect(state.address).toEqual(address);
            });
        });

        describe(`${UPDATE_CUSTOMER_DETAILS} ::`, () => {
            it('should update state with received value', () => {
                // Arrange & Act
                mutations[UPDATE_CUSTOMER_DETAILS](state, mobileNumber);

                // Assert
                expect(state.customer.mobileNumber).toEqual(mobileNumber);
            });
        });

        describe(`${UPDATE_FULFILMENT_TIME} ::`, () => {
            it('should update state with received value', () => {
                // Arrange & Act
                mutations[UPDATE_FULFILMENT_TIME](state, time);

                // Assert
                expect(state.time).toEqual(time);
            });
        });

        describe(`${UPDATE_IS_FULFILLABLE} ::`, () => {
            it('should update state with received value', () => {
                // Arrange & Act
                mutations[UPDATE_IS_FULFILLABLE](state, isFulfillable);

                // Assert
                expect(state.isFulfillable).toEqual(isFulfillable);
            });
        });

        describe(`${UPDATE_ISSUES} ::`, () => {
            it('should update state with received value', () => {
                // Arrange & Act
                mutations[UPDATE_ISSUES](state, issues);

                // Assert
                expect(state.issues).toEqual(issues);
            });
        });

        describe(`${UPDATE_USER_NOTE} ::`, () => {
            it('should update state with received value', () => {
                // Arrange & Act
                mutations[UPDATE_USER_NOTE](state, userNote);

                // Assert
                expect(state.userNote).toEqual(userNote);
            });
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
                    serviceType: basketDelivery.ServiceType.toLowerCase()
                });
            });
        });

        describe('patchCheckout ::', () => {
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
                await patchCheckout({ commit, state }, payload);

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

        describe('setAuthToken ::', () => {
            it(`should call ${UPDATE_AUTH} mutation.`, async () => {
                // Act
                setAuthToken({ commit }, authToken);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_AUTH, authToken);
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

        describe('updateAddressDetails ::', () => {
            it(`should call ${UPDATE_FULFILMENT_ADDRESS} mutation with passed value.`, async () => {
                // Act
                updateAddressDetails({ commit }, address);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_FULFILMENT_ADDRESS, address);
            });
        });

        describe('updateCustomerDetails ::', () => {
            it(`should call ${UPDATE_CUSTOMER_DETAILS} mutation with passed value.`, async () => {
                // Act
                updateCustomerDetails({ commit }, customerDetails);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_CUSTOMER_DETAILS, customerDetails);
            });
        });

        describe('updateFulfilmentTime ::', () => {
            it(`should call ${UPDATE_FULFILMENT_TIME} mutation with passed value.`, async () => {
                // Act
                updateFulfilmentTime({ commit }, time);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_FULFILMENT_TIME, time);
            });
        });

        describe('updateUserNote ::', () => {
            it(`should call ${UPDATE_USER_NOTE}`, () => {
                // Act
                updateUserNote({ commit }, userNote);

                // Assert
                expect(commit).toHaveBeenCalledWith(UPDATE_USER_NOTE, userNote);
            });
        });
    });
});
