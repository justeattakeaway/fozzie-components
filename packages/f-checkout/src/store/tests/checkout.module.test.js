import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CheckoutModule from '../checkout.module';
import { DELIVERY_RESPONSE } from './constants/delivery'

const mobileNumber = '+447111111111';

const expectedState = {
    id: '1234',
    serviceType: 'delivery',
    customer: {
        firstName: 'Joe',
        mobileNumber
    },
    fulfillment: {
        times: [{
            label: {
                text: "As soon as possible"
            },
            "from": "2020-01-01T00:00+00:00",
            "to": "2020-01-01T00:00+00:00",
            "selected": true
        }],
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
    notices: [{
        "type": "allergy",
        "notice": {
            "text": "If you have a food allergy or intolerance (or someone you're ordering for has), <a href=\"https://greggs.co.uk/nutrition\" data-test-id=\"allergen-url-link\" target=\"_blank\" rel=\"noopener\">read what this restaurant has to say about allergies</a> before placing your order. Do not order if you cannot get the allergy information you need."
        }
    }],
    messages: [{
        type: "warning",
        message:
            {
                text: "Please hurry, the restaurant is closing soon"
            }
        }
    ]
};

const state = CheckoutModule.state();
const { updateState } = CheckoutModule.mutations;
const { getCheckout, postCheckout } = CheckoutModule.actions;

describe('CheckoutModule', () => {
    describe('mutations ::', () => {
        describe('updateState ::', () => {
            it('should update state with delivery response.', () => {
                // Arrange && Act
                updateState(state, DELIVERY_RESPONSE);

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
                data: DELIVERY_RESPONSE
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
                await postCheckout({ commit }, payload);

                // Assert
                expect(axiosMock.history.post.length).toBe(1);
                expect(axiosMock.history.post[0].data).toBe(JSON.stringify(payload.data));
            });
        });
    });
});

