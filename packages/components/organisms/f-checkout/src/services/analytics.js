import Trak from '@justeat/f-trak';

/**
 * Pushes initial state of checkout to the dataLayer.
 *
 * @param {object} eventData An object containing data to be pushed to the dataLayer
 */
const trackInitialLoad = (basket, restaurantId, isLoggedIn, checkoutData) => {
    window.dataLayer = window.dataLayer || [];

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

    if (checkoutData) {
        console.log('here'); // eslint-disable-line no-console
        console.log(trackFormInteraction); // eslint-disable-line no-console
        trackFormInteraction(checkoutData);
    };
};

/**
 * Updates passed fields to match analytics requirements.
 *
 * @param {array} fields An array of fields
 * @return {array} An array of sorted fields with the correct field name for analytics.
 */
const cleanFields = fields => {
    const address = ['line1', 'line2', 'city', 'postcode']

    const names = {
        "address.line1": "address_line1",
        "address_line1": "address_line1",
        "line1": "address_line1",
        "address.line2": "address_line2",
        "address_line2": "address_line2",
        "line2": "address_line2",
        "address.city": "address_city",
        "address_city": "address_city",
        "city": "address_city",
        "address.postcode": "address_postcode",
        "address_postcode": "address_postcode",
        "postcode": "address_postcode",
        "customer.firstName": "firstName",
        "customer.lastName": "lastName",
        "mobilePhone": "phone",
        "customer.email": "email"
    }

    // fields = fields.map(item => {
    //     console.log(item); // eslint-disable-line no-console
    //     console.log(names[item]); // eslint-disable-line no-console
    // });
    // fields = fields.map(item => item.replace('customer.', ''));
    // fields = fields.map(item => item.replace('address.', 'address_'));
    // fields = fields.map(item => (item === 'mobileNumber' ? 'phone' : item));
    // fields = fields.map(item => (address.includes(item) ? `address_${item}` : item));

    return fields.map(item => name[item]).sort();
};

/**
 * Pushes `form` event to the data layer with correct data
 *
 * @param {object} eventData An object containing data to be pushed to the dataLayer
 */
const trackFormInteraction = eventData => {
    const { action, isLoggedIn, error, changes, autofill } = eventData;

    console.log('called'); // eslint-disable-line no-console

    // const error = eventData.error && cleanFields(eventData.error);
    // const changes = eventData.changes && cleanFields(eventData.changes);
    // const autofill = eventData.autofill && cleanFields(eventData.autofill);

    const formName = isLoggedIn ? 'checkout' : 'checkout_guest';


    Trak.event({
        event: 'Form',
        custom: {
            form: {
                name: formName,
                action,
                error,
                autofill,
                changes
            }
        }
    });
};

export { trackInitialLoad, trackFormInteraction };
