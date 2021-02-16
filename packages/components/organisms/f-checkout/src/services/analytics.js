import Trak from '@justeat/f-trak';

/**
 * Pushes initial state of checkout to the dataLayer.
 *
 * @param {object} eventData An object containing data to be pushed to the dataLayer
 */
const trackInitialLoad = eventData => {
    const { basket, restaurantId, isLoggedIn, checkoutData } = eventData;

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
        // console.log('here'); // eslint-disable-line no-console
        // console.log(trackFormInteraction); // eslint-disable-line no-console
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
    fields = fields.map(item => item.replace('customer.', ''));
    fields = fields.map(item => item.replace('address.', 'address_'));
    fields = fields.map(item => (item === 'mobileNumber' ? 'phone' : item));

    // TODO: input events don't contain 'address_'
    return fields.sort();
};

/**
 * Pushes `form` event to the data layer with correct data
 *
 * @param {object} eventData An object containing data to be pushed to the dataLayer
 */
const trackFormInteraction = eventData => {
    const { action, isLoggedIn } = eventData;

    const error = eventData.error && cleanFields(eventData.error);
    const changes = eventData.changes && cleanFields(eventData.changes);
    const autofill = eventData.autofill && cleanFields(eventData.autofill);

    const formName = isLoggedIn ? 'checkout' : 'checkout_guest';

    // console.log('error'); // eslint-disable-line no-console

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

export default { trackInitialLoad, trackFormInteraction };
