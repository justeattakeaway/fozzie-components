const DELIVERY_RESPONSE = {
    id: '1234',
    serviceType: 'delivery',
    customer: {
        firstName: 'Joe',
        lastName: 'Bloggs',
        phoneNumber: '+447111111111'
    },
    fulfillment: {
        times: [{
            label:
                {
                    text: 'As soon as possible'
                },
            from: '2020-01-01T00:00+00:00',
            to: '2020-01-01T00:00+00:00',
            selected: true
        }
        ],
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
    notices: [{
        type: 'allergy',
        notice: {
            text: "If you have a food allergy or intolerance (or someone you're ordering for has), <a href=\"https://greggs.co.uk/nutrition\" data-test-id=\"allergen-url-link\" target=\"_blank\" rel=\"noopener\">read what this restaurant has to say about allergies</a> before placing your order. Do not order if you cannot get the allergy information you need."
        }
    }],
    messages: [{
        type: 'warning',
        message:
            {
                text: 'Please hurry, the restaurant is closing soon'
            }
    }
    ]
};

/* eslint-disable import/prefer-default-export */
export { DELIVERY_RESPONSE };
