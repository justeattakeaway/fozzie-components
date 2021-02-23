import Trak from '@justeat/f-trak';

const fieldMapper = {
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
 * Pushes `form` event to the data layer with correct data
 */
const trackFormInteraction = (action, data, error) => {
    const changes = JSON.parse(JSON.stringify(data.changes));
    const autofill = JSON.parse(JSON.stringify(data.autofill));
    const formName = data.isLoggedIn ? 'checkout' : 'checkout_guest';

    Trak.event({
        event: 'Form',
        custom: {
            form: {
                name: formName,
                action,
                error: error || null,
                autofill,
                changes
            }
        }
    });
};


/**
 * Pushes initial state of checkout to the dataLayer.
 */
const trackInitialLoad = data => {
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

/**
 * Updates passed fields to match analytics requirements.
 */
const mapFieldNames = fields => {
    if (Array.isArray(fields)) {
        return fields.map(field => (fieldMapper[field] ? fieldMapper[field] : field)).sort();
    }
    return fieldMapper[fields] ? fieldMapper[fields] : fields;
};

export { trackInitialLoad, trackFormInteraction, mapFieldNames };
