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

const { UPDATE_STATE, UPDATE_AUTH } = CheckoutModule.mutations;
const { getCheckout, postCheckout, setAuthToken } = CheckoutModule.actions;
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

        describe('UPDATE_STATE ::', () => {
            it('should update state with delivery response.', () => {
                // Act
                UPDATE_STATE(state, checkoutDelivery);

                // Assert
                expect(state).toMatchSnapshot();
            });

            it('should leave customer state empty if no customer data is returned from the API.', () => {
                // Arrange
                checkoutDelivery.customer = null;

                // Act
                UPDATE_STATE(state, checkoutDelivery);

                // Assert
                expect(state.customer).toEqual(defaultState.customer);
            });

            it('should leave address state empty if no address data is returned from the API.', () => {
                // Arrange
                checkoutDelivery.fulfilment.address = null;

                // Act
                UPDATE_STATE(state, checkoutDelivery);

                // Assert
                expect(state.fulfilment.address).toEqual(defaultState.fulfilment.address);
            });
        });

        describe('UPDATE_AUTH ::', () => {
            it('should update state with authToken and set `isLoggedIn` to true', () => {
                // Act
                UPDATE_AUTH(state, authToken);

                // Assert
                expect(state.authToken).toEqual(authToken);
                expect(state.isLoggedIn).toBeTruthy();
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

        describe('getCheckout ::', () => {
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

            it('should get the checkout details from the backend and call `UPDATE_STATE` mutation.', async () => {
                // Act
                await getCheckout({ commit }, payload);

                // Assert
                expect(axios.get).toHaveBeenCalledWith(payload.url, config);
                expect(commit).toHaveBeenCalledWith('UPDATE_STATE', checkoutDelivery);
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
                        Authorization: `Bearer ${authToken}`,
                        'Accept-Tenant': payload.tenant
                    },
                    timeout: payload.timeout
                };
                axios.post = jest.fn(() => Promise.resolve({ status: 200 }));
            });

            it('should post the checkout details to the backend.', async () => {
                // Act
                await postCheckout({ commit, state }, payload);

                // Assert
                expect(axios.post).toHaveBeenCalledWith(payload.url, payload.data, config);
            });
        });

        describe('setAuthToken ::', () => {
            it('should call `UPDATE_AUTH` mutation.', async () => {
                // Act
                setAuthToken({ commit }, authToken);

                // Assert
                expect(commit).toHaveBeenCalledWith('UPDATE_AUTH', authToken);
            });
        });
    });
});

