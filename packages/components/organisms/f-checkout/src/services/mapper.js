const mapUpdateCheckoutRequest = ({
    address,
    customer = {},
    isCheckoutMethodDelivery,
    time,
    userNote
}) => ([
    {
        op: 'add',
        path: '/customer',
        value: {
            firstName: customer.firstName || null,
            lastName: customer.lastName || null,
            phoneNumber: customer.mobileNumber || null,
            dateOfBirth: null
        }
    },
    {
        op: 'add',
        path: '/fulfilment',
        value: {
            time,
            location: {
                ...(isCheckoutMethodDelivery ? {
                    address: {
                        lines: [
                            address.line1 || '',
                            address.line2 || '',
                            '',
                            address.city || '',
                            ''
                        ],
                        postalCode: address.postcode || null
                    }
                } : {}),
                geolocation: null
            }
        }
    },
    {
        op: 'add',
        path: '/notes',
        value: [
            {
                type: 'delivery',
                note: userNote
            }
        ]
    }
]);

/**
 * Maps checkout names to required GA names.
 *
 * Keys -`checkout` names.
 * Values - required analytics names.
 */
const analyticFieldNameMapper = {
    'address.line1': 'addressLine1',
    line1: 'addressLine1',
    'address.line2': 'addressLine2',
    line2: 'addressLine2',
    'address.city': 'addressCity',
    city: 'addressCity',
    'address.postcode': 'addressPostcode',
    postcode: 'addressPostcode',
    'customer.firstName': 'firstName',
    'customer.lastName': 'lastName',
    'customer.mobileNumber': 'phone',
    mobileNumber: 'phone',
    'customer.email': 'email'
};

/**
 * Updates passed field name to match the expected analytics name requirements.
 */
const mapAnalyticsField = field => (analyticFieldNameMapper[field] || field);

/**
 * Updates passed field names to match the expected analytics name requirements.
 * When fields have been mapped, sorts the array alphabetically.
 */
const mapAnalyticsFieldArray = fields => fields.map(mapAnalyticsField).sort();

export { mapUpdateCheckoutRequest, mapAnalyticsField, mapAnalyticsFieldArray };
