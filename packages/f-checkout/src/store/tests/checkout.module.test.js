import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CheckoutModule from '../checkout.module';

const apiResponse = {
    restaurant: {
        id: '1234'
    },
    serviceType: 'delivery',
    customer: {
        firstName: 'Joe',
        lastName: 'Bloggs',
        phoneNumber: '+447111111111'
    },
    fulfilment: {
        time: {
            from: '2020-01-01T00:30:00.000Z',
            to: '2020-01-01T00:30:00.000Z'
        },
        address: {
            lines: [
                '1 Bristol Road',
                '',
                '',
                'Bristol',
                'Somerset'
            ],
            postalCode: 'BS1 1AA'
        }
    },
    notes: [
        {
            type: 'delivery',
            note: 'Test note for delivery'
        }
    ],
    isFulfillable: true,
    issues: [
        {
            code: 'RESTAURANT_UNAVAILABLE'
        },
        {
            code: 'MINIMUM_ORDER_VALUE_NOT_MET',
            currency: 'GBP',
            minimumOrderValue: 1000,
            additionalSpendRequired: 100
        }
    ]
};

const mobileNumber = '+447111111111';

const expectedState = {
    id: '1234',
    serviceType: 'delivery',
    customer: {
        firstName: 'Joe',
        mobileNumber
    },
    fulfillment: {
        time: {
            from: '2020-01-01T00:30:00.000Z',
            to: '2020-01-01T00:30:00.000Z'
        },
        address: {
            line1: '1 Bristol Road',
            line2: '',
            city: 'Bristol',
            postcode: 'BS1 1AA'
        }
    },
    notes: [{
        type: 'delivery',
        note: 'Test note for delivery'
    }],
    isFulfillable: true,
    notices: undefined,
    messages: undefined
};

const state = CheckoutModule.state();

const { updateState } = CheckoutModule.mutations;
const { getCheckout, postCheckout } = CheckoutModule.actions;

describe('CheckoutModule', () => {
    describe('mutations ::', () => {
        describe('updateState ::', () => {
            it('should update state with `apiResponse`.', () => {
                // Arrange && Act
                updateState(state, apiResponse);

                // Assert
                expect(state).toEqual(expectedState);
            });
        });
    });

    describe('actions ::', () => {
        const commit = jest.fn();

        const url = 'http://localhost/account/checkout';
        const tenant = 'en-GB';
        const timeout = '1000';

        const axiosMock = new MockAdapter(axios);

        const payload = {
            url: 'http://localhost/account/checkout',
            tenant,
            timeout
        };

        describe('getCheckout ::', () => {
            const config = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Tenant': tenant
                },
                timeout
            };

            axiosMock.onGet(url, config).reply(200, {
                data: apiResponse
            });

            it('should get the checkout details from the backend and update the state.', async () => {
                // Arrange && Act
                await getCheckout({ commit }, payload);

                // Assert
                expect(state).toEqual(expectedState);
            });
        });

        describe('postCheckout ::', () => {
            payload.data = {
                mobileNumber
            };

            axiosMock.onPost(url).reply(200);

            it('should post the checkout details to the backend.', async () => {
                // Arrange && Act
                await postCheckout(payload);

                // Assert
                expect(axiosMock.history.post.length).toBe(1);
                expect(axiosMock.history.post[0].data).toBe(JSON.stringify(payload.data));
            });
        });
    });
});

