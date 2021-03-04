const mapUpdateCheckoutRequest = ({
    address,
    customer = {},
    isCheckoutMethodDelivery,
    time,
    userNote,
    geolocation
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
                geolocation
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

const updateCheckoutErrors = {
    basketNotOrderable: ['RESTAURANT_NOT_TAKING_ORDERS', 'SERVICE_TYPE_UNAVAILABLE', 'ITEMS_UNORDERABLE', 'ADDITIONAL_ITEMS_REQUIRED', 'MINIMUM_ORDER_VALUE_NOT_MET', 'LOCATION_UNDELIVERABLE', 'AGE_VERIFICATION_FAILED'],
    invalidModelState: ['FIRST_NAME_REQUIRED', 'LAST_NAME_REQUIRED', 'PHONE_NUMBER_REQUIRED', 'DATE_OF_BIRTH_REQUIRED', 'ADDRESS_LINES_REQUIRED', 'POSTAL_CODE_REQUIRED', 'GEO_LOCATION_REQUIRED'],
    invalidOrderTime: ['FULFILMENT_TIME_UNAVAILABLE'],
    setOrderTime: ['FULFILMENT_TIME_REQUIRED']
}

/**
 * Updates passed field name to match the expected analytics name requirements.
 */
const mapAnalyticsName = field => (analyticFieldNameMapper[field] || field);
const mapAnalyticsError = issue => {
    let errors;

    Object.entries(updateCheckoutErrors).forEach(entry => {
        const [errorName, errorList] = entry;
        if (errorList.includes(issue)) {
            errors = errorName;
        }
    });

    return errors
};

/**
 * Updates passed field names to match the expected analytics name requirements.
 * When fields have been mapped, sorts the array alphabetically.
 */
const mapAnalyticsNames = fields => fields.map(mapAnalyticsName).sort();

const mapAnalyticsErrors = issues => {
    console.log('issues'); // eslint-disable-line no-console
    const issueList = issues.map(mapAnalyticsError)
    console.log(issueList); // eslint-disable-line no-console
    return issueList
};

export { mapUpdateCheckoutRequest, mapAnalyticsName, mapAnalyticsNames, mapAnalyticsErrors };
