import Trak from '@justeat/f-trak';

/**
 * Pushes `form` event to the data layer with correct data
 *
 * @param {object} eventData An object containing data to be pushed to the dataLayer
 */
const trackFormInteraction = (action, data, errorData) => {
    const changes = JSON.parse(JSON.stringify(data.changes));
    const autofill = JSON.parse(JSON.stringify(data.autofill));
    const error = errorData && cleanFields(errorData);
    const formName = data.isLoggedIn ? 'checkout' : 'checkout_guest';

    Trak.event({
        event: 'Form',
        custom: {
            form: {
                name: formName,
                action,
                error: error ? error : null,
                autofill,
                changes
            }
        }
    });
};


/**
 * Pushes initial state of checkout to the dataLayer.
 *
 * @param {object} eventData An object containing data to be pushed to the dataLayer
 */
const trackInitialLoad = (data, error) => {
    window.dataLayer = window.dataLayer || [];
    const {
            isLoggedIn, basket, restaurantId
    } = data;


    const pageName = isLoggedIn ? 'Overview' : 'Guest';

    Trak.event({
        custom: {
            checkout: {
                step: 1
            },
            basket: {
                id: basket.id,
                total: basket.total
            },
            restaurant: {
                id: restaurantId
            },
            pageData: {
                name: `Checkout 1 ${pageName}`,
                group: 'Checkout'
            }
        }
    });
};

const names = {
    "address.line1": "addressLine1",
    "line1": "addressLine1",
    "address.line2": "addressLine2",
    "line2": "addressLine2",
    "address.city": "addressCity",
    "city": "addressCity",
    "address.postcode": "addressPostcode",
    "postcode": "addressPostcode",
    "customer.firstName": "firstName",
    "customer.lastName": "lastName",
    "customer.mobileNumber": "phone",
    "customer.email": "email"
};

/**
 * Updates passed fields to match analytics requirements.
 *
 * @param {array} fields An array of fields
 * @return {array} An array of sorted fields with the correct field name for analytics.
 */
const cleanFields = fields => {
    return Array.isArray(fields) ? fields.map(item => names[item]).sort() : cleanField(fields);
};

const cleanField = field => {
    return names[field] ? names[field] : field;
};

export { trackInitialLoad, trackFormInteraction, cleanFields };





    // const error = eventData.error && cleanFields(eventData.error);
    // const changes = eventData.changes && cleanFields(eventData.changes);
    // const autofill = eventData.autofill && cleanFields(eventData.autofill);
