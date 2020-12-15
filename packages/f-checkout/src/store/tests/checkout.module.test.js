import axios from 'axios';
import CheckoutModule from '../checkout.module';
import checkoutDelivery from '../../demo/checkout-delivery.json';

const mobileNumber = '+447111111111';

const authToken = 'sampleToken';

const defaultState = {
    id: '',
    serviceType: '',
    customer: {
        firstName: '',
        mobileNumber: ''
    },
    fulfilment: {
        times: [],
        address: {
            line1: '',
            line2: '',
            city: '',
            postcode: ''
        }
    },
    notes: [],
    isFulfillable: true,
    notices: [],
    messages: [],
    authToken: '',
    isLoggedIn: false
};

const expectedState = {
    id: '12345',
    serviceType: 'delivery',
    customer: {
        firstName: 'Joe',
        mobileNumber
    },
    fulfilment: {
        times: [{
            label: {
                text: 'As soon as possible'
            },
            from: '2020-01-01T00:00+00:00',
            to: '2020-01-01T00:00+00:00',
            selected: true
        },
        {
            label: {
                text: 'Monday 00:15'
            },
            from: '2020-01-01T00:15+00:00',
            to: '2020-01-01T00:15+00:00',
            selected: false
        },
        {
            label: {
                text: 'Monday 00:30'
            },
            from: '2020-01-01T00:30+00:00',
            to: '2020-01-01T00:30+00:00',
            selected: false
        }],
        address: {
            line1: '1 Bristol Road',
            line2: 'Flat 1',
            city: 'Bristol',
            postcode: 'BS1 1AA'
        }
    },
    notes: [{
        type: 'delivery',
        note: 'Test note for delivery'
    }],
    isFulfillable: true,
    notices: [{
        type: 'allergy',
        notice: {
            text: 'If you have a food allergy or intolerance (or someone you\'re ordering for has), <a href="https://greggs.co.uk/nutrition" data-test-id="allergen-url-link" target="_blank" rel="noopener">read what this restaurant has to say about allergies</a> before placing your order. Do not order if you cannot get the allergy information you need.'
        }
    }],
    messages: [{
        type: 'warning',
        message: {
            text: 'Please hurry, the restaurant is closing soon'
        }
    },
    {
        type: 'information',
        message: {
            text: 'We\'re sorry, some items in your basket are no longer available'
        }
    }],
    authToken: '',
    isLoggedIn: false
};

const { updateState } = CheckoutModule.mutations;
const { getCheckout, postCheckout } = CheckoutModule.actions;
let state = CheckoutModule.state();

describe('CheckoutModule', () => {
    xit('should create default state when initialised.', () => {
        // Assert
        expect(state).toEqual(defaultState);
    });

    xdescribe('mutations ::', () => {
        describe('updateState ::', () => {
            beforeEach(() => {
                state = defaultState;
            });

            it('should update state with delivery response.', () => {
                // Act
                updateState(state, checkoutDelivery);

                // Assert
                expect(state).toEqual(expectedState);
            });

            it('should leave customer state empty if no customer data is returned from the API.', () => {
                // Arrange
                checkoutDelivery.customer = null;

                // Act
                updateState(state, checkoutDelivery);

                // Assert
                expect(state.customer).toEqual(defaultState.customer);
            });

            it('should leave address state empty if no address data is returned from the API.', () => {
                // Arrange
                checkoutDelivery.fulfilment.address = null;

                // Act
                updateState(state, checkoutDelivery);

                // Assert
                expect(state.fulfilment.address).toEqual(defaultState.fulfilment.address);
            });
        });
    });

    describe('actions ::', () => {
        let commit;

        const payload = {
            url: 'http://localhost/account/checkout',
            tenant: 'en-GB',
            timeout: '1000'
        };

        beforeEach(() => {
            commit = jest.fn();
        });

        xdescribe('getCheckout ::', () => {
            let config;

            beforeEach(() => {
                config = {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept-Tenant': payload.tenant
                    },
                    timeout: payload.timeout
                };

                axios.get = jest.fn(() => Promise.resolve({ data: checkoutDelivery }));
            });

            it('should get the checkout details from the backend and call `updateState` mutation.', async () => {
                // Act
                await getCheckout({ commit }, payload);

                // Assert
                expect(axios.get).toHaveBeenCalledWith(payload.url, config);
                expect(commit).toHaveBeenCalledWith('updateState', checkoutDelivery);
            });
        });

        describe('postCheckout ::', () => {
            payload.data = {
                mobileNumber
            };

            let config;

            beforeEach(() => {
                config = {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept-Tenant': payload.tenant
                    },
                    timeout: payload.timeout
                };
                axios.post = jest.fn(() => Promise.resolve({ status: 200 }));
            });

            it('should post the checkout details to the backend.', async () => {
                // Arrange && Act
                await postCheckout({ commit, state }, payload);

                // Assert
                expect(axios.post).toHaveBeenCalledWith(payload.url, payload.data, config);
            });
        });
    });
});

