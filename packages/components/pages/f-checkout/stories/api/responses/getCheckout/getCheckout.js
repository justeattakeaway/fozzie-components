import { Address } from '../../../helpers/addresses';
import customers from '../../../helpers/customer';
import {
    CHECKOUT_METHOD_DELIVERY,
    CHECKOUT_METHOD_DINEIN,
    CHECKOUT_NOTE_TYPE_KITCHEN,
    CHECKOUT_NOTE_TYPE_COURIER
} from '../../../../src/constants';
import { DELIVERY_TIMES } from '../../../helpers';

function buildCustomer (tenant) {
    return customers[tenant];
}

function buildLocation (tenant) {
    return Address[tenant];
}

function getNoteTypes (notes) {
    const noteTypes = {
        courier: [CHECKOUT_NOTE_TYPE_COURIER],
        split: [CHECKOUT_NOTE_TYPE_COURIER, CHECKOUT_NOTE_TYPE_KITCHEN]
    };

    return noteTypes[notes] || null;
}

function getTime (isPreOrder, scheduledTime) {
    const times = {
        [DELIVERY_TIMES.later]: {
            from: '2020-01-01T02:15:00.000Z',
            to: '2020-01-01T02:15:00.000Z'
        },
        [DELIVERY_TIMES.asap]: {
            from: '2020-01-01T01:30:00.000Z',
            to: '2020-01-01T01:30:00.000Z'
        },
        [DELIVERY_TIMES.unavailable]: {
            from: '2019-01-01T02:30:00.000Z',
            to: '2019-01-01T02:30:00.000Z'
        }
    };

    const scheduled = times[scheduledTime] || null;

    return {
        asap: !isPreOrder,
        scheduled
    };
}

export default function (serviceType = CHECKOUT_METHOD_DELIVERY, tenant = 'uk', additionalToggles) {
    const isPreOrder = !!additionalToggles?.isPreOrder;
    const scheduledTime = additionalToggles?.scheduledTime;
    const notes = additionalToggles?.notes;

    const customer = buildCustomer(tenant);
    const time = getTime(isPreOrder, scheduledTime);
    const noteTypes = getNoteTypes(notes);

    let location;

    if (serviceType === CHECKOUT_METHOD_DELIVERY) {
        location = buildLocation(tenant);
    }

    return {
        id: '12345',
        serviceType,
        customer,
        fulfilment: {
            location,
            time,
            ...(serviceType === CHECKOUT_METHOD_DINEIN ? {
                table: {
                    identifier: '10'
                }
            } : {})
        },
        isFulfillable: true,
        notices: [
            {
                type: 'allergy',
                notice: {
                    text: 'If you have a food allergy or intolerance (or someone you’re ordering for has), <a href="https://greggs.co.uk/nutrition" data-test-id="allergen-url-link" target="_blank" rel="noopener">read what this restaurant has to say about allergies</a> before placing your order. Do not order if you cannot get the allergy information you need.'
                }
            }
        ],
        messages: [
            {
                type: 'warning',
                message: {
                    text: 'Please hurry, the restaurant is closing soon'
                }
            },
            {
                type: 'information',
                message: {
                    text: 'We’re sorry, some items in your basket are no longer available'
                }
            }
        ],
        ...(notes ? noteTypes : {})
    };
}
