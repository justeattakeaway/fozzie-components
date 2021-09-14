import {
    ANALYTICS_ERROR_CODE_BASKET_NOT_ORDERABLE,
    ANALYTICS_ERROR_CODE_INVALID_MODEL_STATE,
    ANALYTICS_ERROR_CODE_SET_ORDER_TIME
} from '../constants';

const mapUpdateCheckoutRequest = ({
    address,
    customer = {},
    isCheckoutMethodDelivery,
    isCheckoutMethodDineIn, // Should probably just pass the service type here instead
    time,
    userNote,
    geolocation,
    asap,
    tableIdentifier
}) => ([
    {
        op: 'add',
        path: '/customer',
        value: {
            firstName: customer.firstName || null,
            lastName: customer.lastName || null,
            phoneNumber: customer.mobileNumber || null,
            dateOfBirth: customer.dateOfBirth || null
        }
    },
    {
        op: 'add',
        path: '/fulfilment',
        value: {
            time: {
                asap,
                scheduled: {
                    ...time
                }
            },
            location: {
                ...(isCheckoutMethodDelivery ? {
                    address: {
                        lines: [
                            address.line1,
                            ...(address.line2 ? [address.line2] : [])
                        ],
                        administrativeArea: address.administrativeArea,
                        locality: address.locality || null,
                        postalCode: address.postcode?.trim() || null
                    }
                } : {}),
                geolocation
            },
            table: {
                ...(isCheckoutMethodDineIn ? {
                    identifier: tableIdentifier
                } : {})
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
    'address.locality': 'addressLocality',
    locality: 'addressLocality',
    'address.postcode': 'addressPostcode',
    postcode: 'addressPostcode',
    'customer.firstName': 'firstName',
    'customer.lastName': 'lastName',
    'customer.mobileNumber': 'phone',
    mobileNumber: 'phone',
    'customer.email': 'email'
};

const updateCheckoutErrors = {
    [ANALYTICS_ERROR_CODE_BASKET_NOT_ORDERABLE]: ['RESTAURANT_NOT_TAKING_ORDERS', 'SERVICE_TYPE_UNAVAILABLE', 'ITEMS_UNORDERABLE', 'ADDITIONAL_ITEMS_REQUIRED', 'MINIMUM_ORDER_VALUE_NOT_MET', 'LOCATION_UNDELIVERABLE', 'AGE_VERIFICATION_FAILED'],
    [ANALYTICS_ERROR_CODE_INVALID_MODEL_STATE]: ['FIRST_NAME_REQUIRED', 'LAST_NAME_REQUIRED', 'PHONE_NUMBER_REQUIRED', 'DATE_OF_BIRTH_REQUIRED', 'ADDRESS_LINES_REQUIRED', 'LOCALITY_REQUIRED', 'POSTAL_CODE_REQUIRED', 'GEO_LOCATION_REQUIRED'],
    [ANALYTICS_ERROR_CODE_SET_ORDER_TIME]: ['FULFILMENT_TIME_REQUIRED', 'FULFILMENT_TIME_UNAVAILABLE']
};

/**
 * Updates passed field name to match the expected analytics name requirements.
 */
const mapAnalyticsName = field => (analyticFieldNameMapper[field] || field);

/**
 * Updates passed field names to match the expected analytics name requirements.
 * When fields have been mapped, sorts the array alphabetically.
 */
const mapAnalyticsNames = fields => fields.map(mapAnalyticsName).sort().toString();

/**
 * Updates passed api error code to match the expected analytics error requirements.
 */
const getAnalyticsErrorCodeByApiErrorCode = error => {
    let analyticsErrorCode;

    Object.keys(updateCheckoutErrors).forEach(key => {
        if (updateCheckoutErrors[key].includes(error.code)) {
            analyticsErrorCode = key;
        }
    });

    return analyticsErrorCode;
};

export {
    getAnalyticsErrorCodeByApiErrorCode,
    mapAnalyticsName,
    mapAnalyticsNames,
    mapUpdateCheckoutRequest
};
